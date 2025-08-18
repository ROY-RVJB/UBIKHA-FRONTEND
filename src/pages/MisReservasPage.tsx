import React, { useEffect, useState } from 'react';
import { NavbarArrendatario, Footer } from '../components/layout';
import { getReservasUsuario, type ReservasResponse } from '../services/reservas';
import { authService } from '../services/authService';
import './MisReservasPage.css';


const MisReservasPage: React.FC = () => {
    const [reservasData, setReservasData] = useState<ReservasResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservas = async () => {
            const token = authService.getToken();
            if (!token) {
                setError('No se ha iniciado sesión.');
                setLoading(false);
                return;
            }

            try {
                const data = await getReservasUsuario(token);
                setReservasData(data);
            } catch (err: any) {
                setError(err.message || 'Error al cargar las reservas.');
            } finally {
                setLoading(false);
            }
        };

        fetchReservas();
    }, []);

    if (loading) {
        return <div>Cargando reservas...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavbarArrendatario />
            <div className="mis-reservas-container">
                <h1>Mis Reservas</h1>
                {reservasData && reservasData.total_reservas > 0 ? (
                    <ul className="reservas-list">
                        {reservasData.reservas.map((reserva) => (
                            <li key={reserva.id_reserva} className="reserva-item">
                                {/* Aquí puedes mostrar los detalles de cada reserva */}
                                <h3>Reserva #{reserva.id_reserva}</h3>
                                <p><strong>Inmueble ID:</strong> {reserva.id_inmueble}</p>
                                <p><strong>Monto Total:</strong> S/ {reserva.monto_total}</p>
                                <p><strong>Estado:</strong> {reserva.estado}</p>
                                <p><strong>Fecha de Reserva:</strong> {new Date(reserva.fecha_reserva).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tienes reservas activas.</p>
                )}
            </div>
            <Footer 
                companyName="UBIKHA"
                year={2025}
            />
        </div>
    );
};

export default MisReservasPage;