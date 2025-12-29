import { NavLink } from "react-router-dom";

function Navbar({ user, onSignOut }) {
  return (
    <nav style={styles.navbar}>
      {/* Left Icon */}
      <div style={styles.icon}>⚡</div>

      {/* Center Links */}
      <div style={styles.links}>
        {user ? (
          <>
            <NavLink
              to="/feed"
              style={({ isActive }) =>
                isActive ? { ...styles.link, ...styles.activeLink } : styles.link
              }
            >
              Feed
            </NavLink>

            <NavLink
              to="/profile"
              style={({ isActive }) =>
                isActive ? { ...styles.link, ...styles.activeLink } : styles.link
              }
            >
              Profile
            </NavLink>

           
          </>
        ) : (
          <>
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive ? { ...styles.link, ...styles.activeLink } : styles.link
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              style={({ isActive }) =>
                isActive ? { ...styles.link, ...styles.activeLink } : styles.link
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              style={({ isActive }) =>
                isActive ? { ...styles.link, ...styles.activeLink } : styles.link
              }
            >
              Contact
            </NavLink>
          </>
        )}
      </div>

      {/* Right: Show user name if logged in */}
      <div style={styles.email}>
        {user ? user.displayName || user.email : "your@email.com"}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "10px 14px",
    backgroundColor: "#1e1e1e",
    borderRadius: "999px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    zIndex: 1000,
  },

  icon: {
    width: "36px",
    height: "36px",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    cursor: "pointer",
  },

  links: {
    display: "flex",
    gap: "8px",
  },

  link: {
    color: "#e5e5e5",
    textDecoration: "none",
    fontSize: "14px",
    padding: "6px 12px",
    borderRadius: "999px",
    cursor: "pointer",
  },

  activeLink: {
    backgroundColor: "#ffffff",
    color: "#000000",
  },

  email: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
  },
};

export default Navbar;
