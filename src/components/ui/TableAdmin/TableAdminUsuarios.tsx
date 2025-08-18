import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TableAdminUsuarios.module.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

interface Usuario {
  id_usuario: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  num_celular: string;
  tipo_usuario: string;
  activo: boolean;
  fecha_registro: string;
}

export const TableAdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setErr(null);

    axios
      .get<Usuario[]>(`${backendUrl}/usuarios/`, { signal: ctrl.signal }) // 👈 con barra final
      .then((res) => setUsuarios(res.data))
      .catch((e) => {
        if (e.name !== "CanceledError") {
          console.error("Error al obtener usuarios:", e);
          setErr(e?.message || "Error de red");
        }
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, []);

  const handleDelete = async (email: string) => {
    const ok = window.confirm(`¿Eliminar al usuario con email: ${email}?`);
    if (!ok) return;

    setDeleting((prev) => new Set(prev).add(email));

    // intenta sin y con barra final (según cómo esté definida la ruta en FastAPI)
    const urls = [
      `${backendUrl}/usuarios/${encodeURIComponent(email)}`,
      `${backendUrl}/usuarios/${encodeURIComponent(email)}/`,
    ];

    try {
      let done = false;
      let lastErr: any = null;

      for (const url of urls) {
        try {
          await axios.delete(url, { timeout: 15000 });
          done = true;
          break;
        } catch (e) {
          lastErr = e;
        }
      }

      if (!done) {
        const status = lastErr?.response?.status ?? "n/a";
        const detail =
          lastErr?.response?.data?.detail ??
          (typeof lastErr?.response?.data === "string"
            ? lastErr.response.data
            : lastErr?.message || "Error");
        alert(`No se pudo eliminar. status=${status} | detalle=${detail}`);
        return;
      }

      // éxito
      setUsuarios((prev) => prev.filter((u) => u.email !== email));
    } finally {
      setDeleting((prev) => {
        const next = new Set(prev);
        next.delete(email);
        return next;
      });
    }
  };

  return (
    <>
      <h3>Tabla de usuarios</h3>
      {loading && <div style={{ padding: 8 }}>Cargando…</div>}
      {err && <div style={{ padding: 8, color: "#e57373" }}>{err}</div>}

      <div className={styles.viewport} role="region" aria-label="Tabla de usuarios">
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>🧑‍💼 Nombre completo</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Tipo de usuario</th>
              <th>Estado</th>
              <th>Fecha registro</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id_usuario}>
                <td>🧑‍💼 {`${u.nombres} ${u.apellido_paterno} ${u.apellido_materno}`}</td>
                <td>{u.email}</td>
                <td>{u.num_celular}</td>
                <td>{u.tipo_usuario}</td>
                <td className={u.activo ? styles.activo : styles.suspendido}>
                  {u.activo ? "Activo" : "Suspendido"}
                </td>
                <td>{new Date(u.fecha_registro).toLocaleDateString()}</td>
                <td>
                  <button
                    className={`${styles.pill} ${styles.pillDanger}`}
                    onClick={() => handleDelete(u.email)}
                    disabled={deleting.has(u.email)}
                    title="Eliminar usuario"
                  >
                    <span className={styles.pillIcon} aria-hidden>🗑️</span>
                    {deleting.has(u.email) ? "Eliminando..." : "Eliminar"}
                  </button>
                </td>
              </tr>
            ))}
            {!loading && usuarios.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 16 }}>Sin usuarios.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableAdminUsuarios;
