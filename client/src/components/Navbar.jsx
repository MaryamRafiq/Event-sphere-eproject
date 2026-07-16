import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/events", label: "Events", icon: "◈" },
  { to: "/pricing", label: "Pricing", icon: "✧" },
  { to: "/about", label: "About", icon: "◎" },
  { to: "/contact", label: "Contact", icon: "⬟" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // DARK MODE DEFAULT
  const [theme, setTheme] = useState(
    () => localStorage.getItem("es-theme") || "dark",
  );

  const toggleDashboard = () => {
    setDashboardOpen((prev) => !prev);
  };

  // ✅ HELPER TO CLOSE ALL MENUS ON NAVIGATION
  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    setDashboardOpen(false);
  };

  /* ✅ STICKY NAVBAR - PERFECT SCROLL HANDLER */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Body padding dynamically adjust
      if (scrollY > 20) {
        document.body.classList.add("navbar-scrolled");
        document.documentElement.style.scrollPaddingTop = "64px";
      } else {
        document.body.classList.remove("navbar-scrolled");
        document.documentElement.style.scrollPaddingTop = "72px";
      }
    };

    // Initial call
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("navbar-scrolled");
      document.documentElement.style.scrollPaddingTop = "";
    };
  }, []);

  /* APPLY THEME TO BODY */
  useEffect(() => {
    const body = document.body;
    if (theme === "dark") {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
    }
    localStorage.setItem("es-theme", theme);
  }, [theme]);

  /* ✅ REMOVED THE PROBLEM EFFECT (location.pathname) AND REPLACED WITH ONCLICK EVENT HANDLERS */

  /* Close menus when clicking outside of the navigation container */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        closeMenus();
      }
    };

    if (menuOpen || profileOpen || dashboardOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, profileOpen, dashboardOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleProfile = () => {
    setProfileOpen((open) => !open);
  };

  const handleProfileClick = (role) => {
    navigate(`/profilepage?role=${role}`);
    closeMenus();
  };

  const dark = theme === "dark";

  return (
    <nav
      className={`nb-root ${scrolled ? "nb-scrolled" : "nb-top"}`}
      ref={drawerRef}
    >
      <div className="nb-wrap">
        {/* MAIN BAR */}
        <div className="nb-bar">
          {/* LOGO */}
          <Link to="/" className="nb-logo" onClick={closeMenus}>
            <div className="nb-orb">
              <span className="nb-orb-label">ES</span>
            </div>
            <span className="nb-brand">
              Event<em>Sphere</em>
            </span>
          </Link>

          {/* DESKTOP CENTER */}
          <div className="nb-center nb-desktop">
            {NAV_LINKS.map((link, index) => (
              <div
                key={link.to}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {index > 0 && <div className="nb-sep" />}
                <Link
                  to={link.to}
                  className={`nb-link ${
                    location.pathname === link.to ? "active" : ""
                  }`}
                  onClick={closeMenus}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              </div>
            ))}

            {/* Desktop Dashboard Dropdown */}
            <div className="nb-sep" />
            <div className="nb-dashboard-container">
              <button className="nb-dashboard-btn" onClick={toggleDashboard}>
                <span>📊 Dashboard</span>
                <span className="nb-dashboard-arrow">▼</span>
              </button>

              <div
                className={`nb-dashboard-dropdown ${
                  dashboardOpen ? "open" : ""
                }`}
              >
                <Link
                  to="/attendee"
                  className="nb-dashboard-item"
                  onClick={closeMenus}
                >
                  👤 Attendee Dashboard
                </Link>

                <Link
                  to="/exhibitor"
                  className="nb-dashboard-item"
                  onClick={closeMenus}
                >
                  🏪 Exhibitor Dashboard
                </Link>

                <Link
                  to="/admin"
                  className="nb-dashboard-item"
                  onClick={closeMenus}
                >
                  ⚙️ Admin Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* DESKTOP RIGHT */}
          <div className="nb-right nb-desktop">
            <button
              className="nb-theme"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {dark ? "☀️" : "🌙"}
            </button>

            <Link to="/login" className="nb-signin" onClick={closeMenus}>
              Sign in
            </Link>

            <Link to="/register" className="nb-cta" onClick={closeMenus}>
              Get Started →
            </Link>

            {/* PROFILE DROPDOWN */}
            <div className="nb-profile-container">
              <button
                className="nb-profile-btn"
                onClick={toggleProfile}
                aria-label="Profile Menu"
                aria-expanded={profileOpen}
              >
                <span className="nb-profile-name">Profile</span>
                <span className="nb-profile-arrow">▼</span>
              </button>

              <div
                className={`nb-profile-dropdown ${profileOpen ? "open" : ""}`}
              >
                <div
                  className="nb-profile-item"
                  onClick={() => handleProfileClick("attendee")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleProfileClick("attendee");
                      e.preventDefault();
                    }
                  }}
                >
                  👤 Attendee Profile
                </div>
                <div
                  className="nb-profile-item"
                  onClick={() => handleProfileClick("exhibitor")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleProfileClick("exhibitor");
                      e.preventDefault();
                    }
                  }}
                >
                  🏪 Exhibitor Profile
                </div>
                <div
                  className="nb-profile-item"
                  onClick={() => handleProfileClick("admin")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleProfileClick("admin");
                      e.preventDefault();
                    }
                  }}
                >
                  ⚙️ Admin Profile
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE RIGHT */}
          <div className="nb-right nb-mobile-only" style={{ gap: 8 }}>
            <button
              className="nb-theme"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {dark ? "☀️" : "🌙"}
            </button>

            <button
              className={`nb-ham ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle Menu"
            >
              <div className="nb-ham-line"></div>
              <div className="nb-ham-line"></div>
              <div className="nb-ham-line"></div>
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`nb-drawer ${menuOpen ? "open" : ""}`}>
          <div className="nb-drawer-inner">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nb-mob-link ${
                  location.pathname === link.to ? "active" : ""
                }`}
                onClick={closeMenus}
              >
                <span className="nb-mob-icon">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            <div className="nb-mob-actions">
              <Link to="/login" className="nb-signin" onClick={closeMenus}>
                Sign in
              </Link>
              <Link to="/register" className="nb-cta" onClick={closeMenus}>
                Get Started →
              </Link>

              {/* MOBILE DASHBOARD */}
              <div className="nb-mob-dashboard">
                <div className="nb-mob-title">📊 Dashboard</div>

                <Link
                  to="/attendee/dashboard"
                  className="nb-mob-link"
                  onClick={closeMenus}
                >
                  👤 Attendee Dashboard
                </Link>

                <Link
                  to="/exhibitor/dashboard"
                  className="nb-mob-link"
                  onClick={closeMenus}
                >
                  🏪 Exhibitor Dashboard
                </Link>

                <Link
                  to="/admin/dashboard"
                  className="nb-mob-link"
                  onClick={closeMenus}
                >
                  ⚙️ Admin Dashboard
                </Link>
              </div>

              {/* MOBILE PROFILE */}
              <div className="nb-mob-profile">
                <div
                  className="nb-profile-item"
                  onClick={() => handleProfileClick("attendee")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleProfileClick("attendee");
                      e.preventDefault();
                    }
                  }}
                >
                  👤 Attendee
                </div>
                <div
                  className="nb-profile-item"
                  onClick={() => handleProfileClick("exhibitor")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleProfileClick("exhibitor");
                      e.preventDefault();
                    }
                  }}
                >
                  🏪 Exhibitor
                </div>
                <div
                  className="nb-profile-item"
                  onClick={() => handleProfileClick("admin")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleProfileClick("admin");
                      e.preventDefault();
                    }
                  }}
                >
                  ⚙️ Admin
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
