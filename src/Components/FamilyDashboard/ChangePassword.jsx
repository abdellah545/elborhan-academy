import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import Swal from "sweetalert2";
import baseURL from "../../BaseURL/BaseURL";
import { useForm } from "react-hook-form";
import s from "./Dashboard.module.css";

/* ── Profile sub-tabs ── */
const PROFILE_TABS = [
  { to: "/FamilyDashboard/profile",        label: "Profile",         icon: "fa-user" },
  { to: "/FamilyDashboard/updateProfile",  label: "Edit Profile",    icon: "fa-pen-to-square" },
  { to: "/FamilyDashboard/updateEmail",    label: "Change Email",    icon: "fa-envelope" },
  { to: "/FamilyDashboard/ChangePassword", label: "Change Password", icon: "fa-lock" },
];

function ProfileTabs() {
  const { pathname } = useLocation();
  return (
    <nav style={css.tabs}>
      {PROFILE_TABS.map(({ to, label, icon }) => (
        <Link
          key={to}
          to={to}
          style={{ ...css.tab, ...(pathname === to ? css.tabActive : {}) }}
        >
          <i className={`fa-solid ${icon}`} style={{ fontSize: "0.8rem" }} />
          {label}
        </Link>
      ))}
    </nav>
  );
}

function FormField({ label, error, children }) {
  return (
    <div style={css.field}>
      <label style={css.label}>{label}</label>
      {children}
      {error && <p style={css.error}>{error}</p>}
    </div>
  );
}

function PasswordInput({ id, placeholder, registration }) {
  const [show, setShow] = useState(false);
  return (
    <div style={css.passWrap}>
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        style={css.input}
        {...registration}
      />
      <button
        type="button"
        style={css.passToggle}
        onClick={() => setShow(v => !v)}
        aria-label={show ? "Hide password" : "Show password"}
      >
        <i className={`fa-solid fa-eye${show ? "-slash" : ""}`} />
      </button>
    </div>
  );
}

/** Live password strength checklist */
function PasswordChecklist({ value, confirmValue }) {
  if (!value) return null;

  const rules = [
    { label: "At least 6 characters",       pass: value.length >= 6 },
    { label: "Contains a number",            pass: /[0-9]/.test(value) },
    { label: "Contains an uppercase letter", pass: /[A-Z]/.test(value) },
    { label: "Contains a special character", pass: /[@$!%*?&]/.test(value) },
    { label: "Passwords match",             pass: value === confirmValue && !!confirmValue },
  ];

  return (
    <div style={css.checklist}>
      {rules.map(({ label, pass }) => (
        <div key={label} style={css.checkItem}>
          <span style={{ ...css.checkDot, background: pass ? "#4ade80" : "rgba(255,255,255,0.15)" }} />
          <span style={{ color: pass ? "#4ade80" : "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const newPwd = watch("newPassword", "");
  const confirmPwd = watch("confirmNewPassword", "");

  const onSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await axiosinterceptor.put(
        `${baseURL}/Authentication/ChangePassword`,
        data,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Password changed!",
          text: "You will be redirected to your dashboard.",
          timer: 4000,
          showConfirmButton: false,
          background: "#1a1a2e",
          color: "#fff",
        });
        setTimeout(() => { window.location.pathname = "/FamilyDashboard"; }, 4200);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to change password",
        text: "Please check your current password and try again.",
        background: "#1a1a2e",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div style={css.page}>
      <div style={css.card}>
        {/* Heading */}
        <div style={css.heading}>
          <div style={css.headingIcon}><i className="fa-solid fa-lock" /></div>
          <div>
            <h1 style={css.title}>Change Password</h1>
            <p style={css.subtitle}>Keep your account secure with a strong password</p>
          </div>
        </div>

        <ProfileTabs />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField label="Current Password" error={errors.oldPassword?.message}>
            <PasswordInput
              id="oldPassword"
              placeholder="Enter your current password"
              registration={register("oldPassword", {
                required: "Current password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
            />
          </FormField>

          <FormField label="New Password" error={errors.newPassword?.message}>
            <PasswordInput
              id="newPassword"
              placeholder="Choose a strong new password"
              registration={register("newPassword", {
                required: "New password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                pattern: { value: /[0-9]/, message: "Must contain a number" },
                validate: {
                  uppercase: v => /[A-Z]/.test(v) || "Must contain uppercase",
                  special:   v => /[@$!%*?&]/.test(v) || "Must contain a special character",
                },
              })}
            />
          </FormField>

          <FormField label="Confirm New Password" error={errors.confirmNewPassword?.message}>
            <PasswordInput
              id="confirmNewPassword"
              placeholder="Repeat your new password"
              registration={register("confirmNewPassword", {
                required: "Please confirm your new password",
                validate: v => v === newPwd || "Passwords do not match",
              })}
            />
          </FormField>

          {/* Live strength checklist */}
          <PasswordChecklist value={newPwd} confirmValue={confirmPwd} />

          <button type="submit" style={css.submitBtn} disabled={loading}>
            {loading ? <span className={s.btnSpinner} /> : <i className="fa-solid fa-shield-halved" />}
            {loading ? "Updating…" : "Update Password"}
          </button>

          <div style={css.forgotWrap}>
            <Link to="/reset-password" style={css.forgotLink}>
              <i className="fa-solid fa-rotate-left" style={{ marginRight: "0.3rem", fontSize: "0.8rem" }} />
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Styles ─── */
const css = {
  page: {
    minHeight: "calc(100vh - 68px)",
    background: "#0f0f1a",
    padding: "2rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "2rem",
    marginBottom: "2rem",
  },
  heading: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },
  headingIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: "linear-gradient(135deg,rgba(241,114,182,0.2),rgba(124,106,255,0.2))",
    border: "1px solid rgba(241,114,182,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: "#f172b6",
    flexShrink: 0,
  },
  title:    { fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: 0 },
  subtitle: { fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", margin: 0 },
  tabs: {
    display: "flex",
    gap: "0.4rem",
    flexWrap: "wrap",
    marginBottom: "2rem",
    padding: "0.35rem",
    background: "rgba(255,255,255,0.04)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.07)",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.45rem 0.85rem",
    borderRadius: 8,
    fontSize: "0.82rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
  },
  tabActive: {
    background: "rgba(241,114,182,0.15)",
    color: "#f172b6",
    fontWeight: 700,
  },
  field:     { display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" },
  label:     { fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: "0.7rem 2.8rem 0.7rem 1rem",
    color: "#fff",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
  },
  passWrap:   { position: "relative" },
  passToggle: {
    position: "absolute",
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.35)",
    cursor: "pointer",
    padding: "0.25rem",
    fontSize: "0.9rem",
  },
  error: { fontSize: "0.75rem", color: "#f87171", margin: 0 },
  /* password checklist */
  checklist: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    padding: "0.85rem 1rem",
    marginBottom: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.45rem",
  },
  checkItem: { display: "flex", alignItems: "center", gap: "0.6rem" },
  checkDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    flexShrink: 0,
    transition: "background 0.2s ease",
  },
  /* submit */
  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    width: "100%",
    padding: "0.85rem",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #f172b6, #7c6aff)",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: "1rem",
  },
  forgotWrap: { textAlign: "center" },
  forgotLink: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.35)",
    textDecoration: "none",
    transition: "color 0.15s ease",
  },
};
