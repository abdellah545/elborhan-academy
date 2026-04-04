import React, { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCookie, deleteCookie } from "../../Helper/CookieHelper";
import style from "./Dashboard.module.css";

/**
 * DashboardHeader — Premium glassmorphic top navigation
 * Memoised to prevent re-renders from parent state changes.
 */
const DashboardHeader = memo(function DashboardHeader({ hasPaymentAlert = false }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const fullName = getCookie("Full_Name") || "Family";
  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    sessionStorage.removeItem("AccessToken");
    deleteCookie("refreshToken");
    deleteCookie("AccessToken");
    deleteCookie("Full_Name");
    window.location.pathname = "/";
  };

  const navLinks = [
    { to: "/FamilyDashboard", label: "Family Report", icon: "fa-chart-bar" },
    { to: "/payment-report", label: "Payments", icon: "fa-credit-card", badge: hasPaymentAlert },
  ];

  return (
    <header className={style.header}>
      {/* Brand */}
      <Link to="/" className={style.headerBrand}>
        <span className={style.headerBrandLogo}>El-Burhan</span>
        <span className={style.headerBrandSep}>|</span>
        <span className={style.headerBrandLabel}>Family Dashboard</span>
      </Link>

      {/* Desktop Nav */}
      <nav className={`${style.headerNav} ${menuOpen ? style.open : ""}`}>
        {navLinks.map(({ to, label, icon, badge }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`${style.headerNavLink} ${isActive ? style.headerNavLinkActive : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <i className={`fa-solid ${icon} me-1`} />
              {label}
              {badge && <span className={style.payBadge} aria-label="Payment alert" />}
            </Link>
          );
        })}

        {/* User Dropdown */}
        <div className={style.userMenu}>
          <button
            className={style.userMenuBtn}
            onClick={() => setDropOpen((v) => !v)}
            aria-expanded={dropOpen}
            aria-haspopup="true"
          >
            <span className={style.userAvatar} aria-hidden="true">{initials}</span>
            <span>{fullName}</span>
            <i className={`fa-solid fa-chevron-${dropOpen ? "up" : "down"}`} style={{ fontSize: "0.7rem", opacity: 0.6 }} />
          </button>

          {dropOpen && (
            <div className={style.userDropdown} role="menu">
              <Link
                to="/FamilyDashboard/profile"
                className={style.userDropdownItem}
                onClick={() => setDropOpen(false)}
                role="menuitem"
              >
                <i className="fa-solid fa-user" style={{ width: 16, opacity: 0.7 }} />
                My Profile
              </Link>
              <Link
                to="/FamilyDashboard/updateProfile"
                className={style.userDropdownItem}
                onClick={() => setDropOpen(false)}
                role="menuitem"
              >
                <i className="fa-solid fa-pen-to-square" style={{ width: 16, opacity: 0.7 }} />
                Update Profile
              </Link>
              <Link
                to="/FamilyDashboard/ChangePassword"
                className={style.userDropdownItem}
                onClick={() => setDropOpen(false)}
                role="menuitem"
              >
                <i className="fa-solid fa-lock" style={{ width: 16, opacity: 0.7 }} />
                Change Password
              </Link>
              <hr className={style.userDropdownSep} />
              <button
                className={`${style.userDropdownItem} ${style.danger}`}
                onClick={handleLogout}
                role="menuitem"
              >
                <i className="fa-solid fa-right-from-bracket" style={{ width: 16, opacity: 0.7 }} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        className={style.mobileToggle}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
});

export default DashboardHeader;
