import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Dashboard.module.css";

const PROFILE_TABS = [
  { to: "/FamilyDashboard/profile",        label: "Profile",         icon: "fa-user" },
  { to: "/FamilyDashboard/updateProfile",  label: "Edit Profile",    icon: "fa-pen-to-square" },
  { to: "/FamilyDashboard/updateEmail",    label: "Change Email",     icon: "fa-envelope" },
  { to: "/FamilyDashboard/ChangePassword", label: "Change Password", icon: "fa-lock" },
];

export default function ProfileTabs() {
  const { pathname } = useLocation();
  
  return (
    <nav className={style.profileTabs}>
      {PROFILE_TABS.map(({ to, label, icon }) => {
        const isActive = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`${style.profileTab} ${isActive ? style.profileTabActive : ""}`}
          >
            <i className={`fa-solid ${icon}`} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
