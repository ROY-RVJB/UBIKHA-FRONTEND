import React from 'react';
import './NotificationsList.css';

export interface Notification {
  id: string;
  type: 'booking' | 'review' | 'message' | 'system' | 'payment';
  title: string;
  message: string;
  time: string;
  urgent: boolean;
  read: boolean;
}

export interface NotificationsListProps {
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  showViewAll?: boolean;
  maxVisible?: number;
}

const defaultNotifications: Notification[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Nueva reserva pendiente',
    message: 'Juan Pérez quiere reservar tu propiedad "Casa en Miraflores" del 15 al 20 de enero.',
    time: 'hace 15 minutos',
    urgent: true,
    read: false
  },
  {
    id: '2',
    type: 'review',
    title: 'Nueva reseña recibida',
    message: 'María García dejó una reseña de 5 estrellas en "Departamento San Isidro".',
    time: 'hace 2 horas',
    urgent: false,
    read: false
  },
  {
    id: '3',
    type: 'message',
    title: 'Nuevo mensaje',
    message: 'Carlos Silva te envió un mensaje sobre su próxima estancia.',
    time: 'hace 1 día',
    urgent: false,
    read: true
  }
];

const getNotificationIcon = (type: Notification['type']): string => {
  const icons = {
    booking: '📅',
    review: '⭐',
    message: '💬',
    system: '🔔',
    payment: '💰'
  };
  return icons[type];
};

const getNotificationColor = (type: Notification['type']): string => {
  const colors = {
    booking: 'var(--color-accent-cool)',
    review: 'var(--color-success)',
    message: 'var(--color-accent-warm)',
    system: 'var(--color-text-main)',
    payment: 'var(--color-success)'
  };
  return colors[type];
};

export const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications = defaultNotifications,
  onNotificationClick,
  showViewAll = true,
  maxVisible = 3
}) => {
  const visibleNotifications = notifications.slice(0, maxVisible);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  if (notifications.length === 0) {
    return (
      <section className="notifications-list">
        <div className="notifications-header">
          <h2 className="notifications-title">Notificaciones</h2>
        </div>
        <div className="no-notifications">
          <div className="no-notifications-icon">🔔</div>
          <p>No tienes notificaciones nuevas</p>
        </div>
      </section>
    );
  }

  return (
    <section className="notifications-list">
      <div className="notifications-header">
        <h2 className="notifications-title">
          Notificaciones
          {unreadCount > 0 && (
            <span className="notifications-badge">{unreadCount}</span>
          )}
        </h2>
        {showViewAll && notifications.length > maxVisible && (
          <button className="view-all-btn">
            Ver todas ({notifications.length})
          </button>
        )}
      </div>
      
      <div className="notifications-container">
        {visibleNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${!notification.read ? 'notification-item--unread' : ''} ${notification.urgent ? 'notification-item--urgent' : ''}`}
            onClick={() => handleNotificationClick(notification)}
            role="button"
            tabIndex={0}
            aria-label={`Notificación: ${notification.title}`}
          >
            <div 
              className="notification-icon"
              style={{ color: getNotificationColor(notification.type) }}
            >
              {getNotificationIcon(notification.type)}
            </div>
            
            <div className="notification-content">
              <div className="notification-header">
                <h3 className="notification-title">{notification.title}</h3>
                <span className="notification-time">{notification.time}</span>
              </div>
              <p className="notification-message">{notification.message}</p>
            </div>
            
            {!notification.read && (
              <div className="notification-unread-dot"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};