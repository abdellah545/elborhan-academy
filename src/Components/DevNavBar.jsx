import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DEV_PAGES = [
  { label: "🏠 Family Dashboard", path: "/FamilyDashboard" },
  { label: "💳 Payment Report", path: "/payment-report" },
  { label: "👤 Profile", path: "/FamilyDashboard/profile" },
  { label: "✏️ Update Profile", path: "/FamilyDashboard/updateProfile" },
  { label: "📧 Change Email", path: "/FamilyDashboard/updateEmail" },
  { label: "🔒 Change Password", path: "/FamilyDashboard/ChangePassword" },
  { label: "✅ Payment Success", path: "/payment-success" },
  { label: "❌ Payment Failed", path: "/payment-failed" },
];

export default function DevNavBar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={devStyles.wrapper}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={devStyles.toggleBtn}
        title={collapsed ? "Show Dev Nav" : "Hide Dev Nav"}
      >
        {collapsed ? "🛠️ DEV NAV ▼" : "🛠️ DEV NAV ▲"}
      </button>
      {!collapsed && (
        <div style={devStyles.navBar}>
          <span style={devStyles.label}>⚠️ DEV MODE — Backend Auth Bypassed</span>
          <div style={devStyles.links}>
            {DEV_PAGES.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  style={{ ...devStyles.link, ...(isActive ? devStyles.activeLink : {}) }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const devStyles = {
  wrapper: { zIndex: 99999, fontFamily: "monospace", width: "100%" },
  toggleBtn: {
    display: "block", width: "100%", padding: "6px 14px",
    background: "#1e293b", color: "#facc15", border: "none",
    borderBottom: "1px solid #334155", cursor: "pointer",
    fontSize: "12px", fontWeight: "bold", letterSpacing: "0.05em", textAlign: "left",
  },
  navBar: {
    background: "rgba(15,23,42,1)", borderBottom: "2px solid #facc15",
    padding: "8px 16px", display: "flex", alignItems: "center",
    gap: "10px", flexWrap: "wrap",
  },
  label: {
    color: "#facc15", fontSize: "11px", fontWeight: "bold",
    paddingRight: "12px", borderRight: "1px solid #334155", whiteSpace: "nowrap",
  },
  links: { display: "flex", flexWrap: "wrap", gap: "8px" },
  link: {
    color: "#94a3b8", textDecoration: "none", fontSize: "12px",
    padding: "4px 10px", borderRadius: "6px", border: "1px solid #334155",
    background: "transparent", whiteSpace: "nowrap",
  },
  activeLink: { color: "#0f172a", background: "#facc15", border: "1px solid #facc15", fontWeight: "bold" },
};
