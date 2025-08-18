import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./TableAdminPropiedades.module.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

interface Inmueble {
  id_inmueble: number;
  id_propietario: number;
  titulo: string;
  tipo_inmueble: string;
  estado: string;
  precio_mensual?: number;
  precio_final?: number;
  direccion?: string;
}

const norm = (s?: string) =>
  (s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();

// Estados que devuelve tu API (normalizados)
const EST_PEND = new Set(["pendiente", "en_revision", "revision", "en revision", "solicitado"]);
const EST_APROB = new Set(["aprobado", "disponible", "activo", "publicado"]);

// Aprobación -> estado destino
const ESTADO_APROBAR = "disponible";

function TableAdminPropiedades() {
  const [items, setItems] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState<Set<number>>(new Set()); // deshabilitar botones por fila

  // ===== Carga inicial =====
  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setErr(null);

    axios
      .get<Inmueble[]>(`${backendUrl}/inmuebles/`, { signal: ctrl.signal })
      .then((res) => setItems(res.data ?? []))
      .catch((e) => {
        if (e.name !== "CanceledError") {
          console.error("Error al obtener inmuebles:", e);
          setErr(e?.message || "Error de red");
        }
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  // ===== Particiones =====
  const { pendientes, aprobadas } = useMemo(() => {
    const pends: Inmueble[] = [];
    const aprobs: Inmueble[] = [];
    for (const it of items) {
      const n = norm(it.estado);
      if (EST_PEND.has(n)) pends.push(it);
      else if (EST_APROB.has(n)) aprobs.push(it);
      else pends.push(it); // por defecto a pendientes
    }
    return { pendientes: pends, aprobadas: aprobs };
  }, [items]);

  // ===== Helpers =====
  const money = (v?: number) => (v == null ? "—" : `S/ ${Number(v).toLocaleString("es-PE")}`);

  const authHeaders = () => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("Authorization");
    if (token) headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    return headers;
  };

  // ===== Acciones =====
  const aprobarInmueble = async (id: number) => {
    if (!confirm("¿Aprobar la publicación y ponerla disponible?")) return;

    setBusy((prev) => new Set(prev).add(id));
    try {
      await axios.patch(
        `${backendUrl}/inmuebles/${id}/estado`,
        { estado: ESTADO_APROBAR },
        { headers: authHeaders(), timeout: 20000 }
      );
      setItems((prev) => prev.map((x) => (x.id_inmueble === id ? { ...x, estado: ESTADO_APROBAR } : x)));
    } catch (e: any) {
      console.error("No se pudo aprobar:", e);
      const detail = e?.response?.data?.detail ?? e?.response?.data ?? e?.message ?? "Error";
      alert(`No se pudo aprobar: ${typeof detail === "string" ? detail : JSON.stringify(detail)}`);
    } finally {
      setBusy((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const eliminarInmueble = async (id: number) => {
    if (!confirm(`¿Eliminar definitivamente el inmueble #${id}? Esta acción no se puede deshacer.`)) return;

    setBusy((prev) => new Set(prev).add(id));
    try {
      await axios.delete(`${backendUrl}/inmuebles/${id}`, { headers: authHeaders(), timeout: 20000 });
      setItems((prev) => prev.filter((x) => x.id_inmueble !== id));
    } catch (e: any) {
      console.error("No se pudo eliminar:", e);
      const detail = e?.response?.data?.detail ?? e?.response?.data ?? e?.message ?? "Error";
      alert(`No se pudo eliminar: ${typeof detail === "string" ? detail : JSON.stringify(detail)}`);
    } finally {
      setBusy((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  return (
    <div className={styles.container}>
      <h3>Tabla de propiedades</h3>
      {loading && <div className={styles.msg}>Cargando…</div>}
      {err && <div className={styles.msgError}>{err}</div>}

      {/* ===== Pendientes ===== */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h4>Solicitudes de publicación (pendientes)</h4>
          <span className={styles.badge}>{pendientes.length}</span>
        </div>
        <div className={styles.viewport}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Propietario</th>
                <th>Precio mensual</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pendientes.map((p) => (
                <tr key={p.id_inmueble}>
                  <td>#{p.id_inmueble}</td>
                  <td>{p.titulo}</td>
                  <td>{p.tipo_inmueble}</td>
                  <td>#{p.id_propietario}</td>
                  <td>{money(p.precio_mensual)}</td>
                  <td><span className={styles.chipWarn}>{p.estado}</span></td>
                  <td className={styles.actions}>
                    <button
                      className={`${styles.btn} ${styles.btnOk}`}
                      onClick={() => aprobarInmueble(p.id_inmueble)}
                      disabled={busy.has(p.id_inmueble)}
                    >
                      Aprobar
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnDanger}`}
                      onClick={() => eliminarInmueble(p.id_inmueble)}
                      disabled={busy.has(p.id_inmueble)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && pendientes.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.empty}>No hay solicitudes pendientes.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== Aprobadas ===== */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h4>Publicaciones aprobadas</h4>
          <span className={styles.badge}>{aprobadas.length}</span>
        </div>
        <div className={styles.viewport}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Propietario</th>
                <th>Precio mensual</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {aprobadas.map((p) => (
                <tr key={p.id_inmueble}>
                  <td>#{p.id_inmueble}</td>
                  <td>{p.titulo}</td>
                  <td>{p.tipo_inmueble}</td>
                  <td>#{p.id_propietario}</td>
                  <td>{money(p.precio_mensual)}</td>
                  <td><span className={styles.chipOk}>{p.estado}</span></td>
                  <td className={styles.actions}>
                    <button
                      className={`${styles.btn} ${styles.btnDanger}`}
                      onClick={() => eliminarInmueble(p.id_inmueble)}
                      disabled={busy.has(p.id_inmueble)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && aprobadas.length === 0 && (
                <tr>
                  <td colSpan={7} className={styles.empty}>No hay publicaciones aprobadas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default TableAdminPropiedades;
export { TableAdminPropiedades };
