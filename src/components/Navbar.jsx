import { ArrowRight, Bell, Compass, Menu, X } from "lucide-react";

export default function Navbar({
  navItems,
  activeNav,
  mobileMenu,
  setMobileMenu,
  notificationsOpen,
  setNotificationsOpen,
  notifications,
  setNotifications,
  unreadCount,
  openNotification,
  scrollTo,
  formatTime,
}) {
  return (
    <header className="navbar">
      <button
        className="brand"
        onClick={() => scrollTo("home")}
        aria-label="Visitly home"
      >
        <span className="brand-mark">
          <Compass size={21} />
        </span>
        <span>
          visitly<span className="brand-period">.</span>
        </span>
      </button>

      <nav className={`nav-links ${mobileMenu ? "nav-open" : ""}`}>
        {navItems.map(([label, id]) => (
          <button
            key={id}
            className={activeNav === id ? "nav-link active" : "nav-link"}
            onClick={() => scrollTo(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="nav-actions">
        <div className="notification-wrap">
          <button
            className="icon-button"
            onClick={() => setNotificationsOpen((value) => !value)}
            aria-label="Toggle notifications"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="notification-dot">{unreadCount}</span>
            )}
          </button>

          {notificationsOpen && (
            <div className="notification-popover">
              <div className="popover-heading">
                <strong>Notifications</strong>
                <button
                  className="text-button"
                  onClick={() =>
                    setNotifications((previous) =>
                      previous.map((item) => ({ ...item, read: true })),
                    )
                  }
                >
                  Mark all read
                </button>
              </div>

              {notifications.length === 0 ? (
                <p className="empty-note">You're all caught up.</p>
              ) : (
                notifications.slice(0, 6).map((item) => (
                  <button
                    className={`notification-item ${item.read ? "" : "unread"}`}
                    key={item.id}
                    onClick={() => openNotification(item)}
                  >
                    <span className="notification-icon">
                      <Bell size={15} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.detail}</small>
                      <small>{formatTime(item.time)}</small>
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <button
          className="button button-primary nav-cta"
          onClick={() => scrollTo("faculty")}
        >
          Request a visit <ArrowRight size={16} />
        </button>

        <button
          className="icon-button mobile-toggle"
          onClick={() => setMobileMenu((value) => !value)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
