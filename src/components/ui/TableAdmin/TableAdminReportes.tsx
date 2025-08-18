import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import styles from "./TableAdminReportes.module.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

/** Estructura aproximada que devuelve tu API (según Swagger) */
interface ReporteDTO {
  id_reporte: number;
  id_usuario: number;
  id_inmueble: number;
  tipo_reporte: string;
  descripcion: string;
  fecha_reporte: string;      // ISO
  estado_reporte: string;     // "pendiente" | "en revisión" | "resuelto" | ...
  titulo_inmueble?: string;
  propietario_inmueble?: string;
}

function formatFecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

const tokenFromStorage = () =>
  localStorage.getItem("access_token") ||
  localStorage.getItem("token") ||
  sessionStorage.getItem("access_token") ||
  sessionStorage.getItem("token");

const api = axios.create({
  baseURL: backendUrl,
});

export function TableAdminReportes() {
  const [items, setItems] = useState<ReporteDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [resolviendo, setResolviendo] = useState<Set<number>>(new Set());

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setErr(null);

    const token = tokenFromStorage();
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    // Traemos TODOS los reportes y filtramos en el front
    api
      .get<ReporteDTO[]>("/reportes/", { headers, signal: ctrl.signal })
      .then((res) => setItems(res.data || []))
      .catch((e) => {
        console.error("Error al listar reportes:", e);
        if (e?.response?.status === 401) {
          setErr("No autorizado. Inicia sesión como admin para ver los reportes.");
        } else {
          setErr(e?.message || "Error de red");
        }
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  const esPendiente = (s: string) =>
    ["pendiente", "en revisión", "en revision", "abierto"].includes(s?.toLowerCase());

  const pendientes = useMemo(
    () => items.filter((r) => esPendiente(r.estado_reporte)),
    [items]
  );
  const realizados = useMemo(
    () => items.filter((r) => r.estado_reporte?.toLowerCase() === "resuelto"),
    [items]
  );

  async function marcarRealizado(id_reporte: number) {
    const ok = window.confirm("¿Marcar este reporte como REALIZADO?");
    if (!ok) return;

    setResolviendo((s) => new Set(s).add(id_reporte));

    try {
      const token = tokenFromStorage();
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

      // Tu endpoint admin
      await api.put(
        `/reportes/admin/${id_reporte}/resolver`,
        { estado_reporte: "resuelto" },
        { headers, timeout: 15000 }
      );

      // Actualizamos localmente
      setItems((prev) =>
        prev.map((r) =>
          r.id_reporte === id_reporte ? { ...r, estado_reporte: "resuelto" } : r
        )
      );
    } catch (e: any) {
      console.error(e);
      const status = e?.response?.status ?? "n/a";
      const detail =
        e?.response?.data?.detail ||
        (typeof e?.response?.data === "string" ? e.response.data : e?.message);
      alert(`No se pudo actualizar. status=${status} | detalle=${detail}`);
    } finally {
      setResolviendo((s) => {
        const n = new Set(s);
        n.delete(id_reporte);
        return n;
      });
    }
  }

  return (
    <div className={styles.container}>
      <h3>Reportes</h3>
      {loading && <div className={styles.msg}>Cargando…</div>}
      {err && <div className={styles.err}>{err}</div>}

      {/* PENDIENTES */}
      <section className={styles.section}>
        <div className={styles.head}>
          <h4>Reportes en espera</h4>
          <span className={styles.badge}>{pendientes.length}</span>
        </div>

        <div className={styles.viewport}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Reportes</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {pendientes.map((r) => (
                <tr key={r.id_reporte}>
                  <td>{r.tipo_reporte}</td>
                  <td>{formatFecha(r.fecha_reporte)}</td>
                  <td>{r.descripcion}</td>
                  <td>
                    <button
                      className={`${styles.pill} ${styles.pillOk}`}
                      onClick={() => marcarRealizado(r.id_reporte)}
                      disabled={resolviendo.has(r.id_reporte)}
                    >
                      {resolviendo.has(r.id_reporte) ? "Actualizando..." : "Realizado"}
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && pendientes.length === 0 && (
                <tr>
                  <td colSpan={4} className={styles.empty}>
                    No hay reportes en espera.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* REALIZADOS */}
      <section className={styles.section}>
        <div className={styles.head}>
          <h4>Reportes realizados</h4>
          <span className={styles.badge}>{realizados.length}</span>
        </div>

        <div className={styles.viewport}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Reportes</th>
                <th>Fecha</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {realizados.map((r) => (
                <tr key={r.id_reporte}>
                  <td>{r.tipo_reporte}</td>
                  <td>{formatFecha(r.fecha_reporte)}</td>
                  <td>{r.descripcion}</td>
                </tr>
              ))}
              {!loading && realizados.length === 0 && (
                <tr>
                  <td colSpan={3} className={styles.empty}>
                    Aún no hay reportes realizados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default TableAdminReportes;
