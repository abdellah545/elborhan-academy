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

function FormField({ label, hint, error, children }) {
  return (
    <div style={css.field}>
      <label style={css.label}>{label}</label>
      {hint && <p style={css.hint}>{hint}</p>}
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



export default function ChangeEmail() {
  const [step, setStep] = useState(1);
  const [newEmailValue, setNewEmailValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // Step 1 form — send OTP
  const {
    register: reg1,
    handleSubmit: submit1,
    formState: { errors: err1 },
  } = useForm();

  // Step 2 form — verify OTP
  const {
    register: reg2,
    handleSubmit: submit2,
    formState: { errors: err2 },
  } = useForm();

  /* ── Send OTP ── */
  const onSendOTP = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await axiosinterceptor.get(`${baseURL}/Family/SendOTP`, {
        params: { NewEmail: data.NewEmail, Password: data.Password },
      });
      if (res.status === 200) {
        setNewEmailValue(data.NewEmail);
        setStep(2);
        Swal.fire({
          icon: "success",
          title: "OTP sent!",
          text: `Check your inbox at ${data.NewEmail}`,
          timer: 4000,
          showConfirmButton: false,
          background: "#1a1a2e",
          color: "#fff",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to send OTP",
        text: "Check your email and password.",
        background: "#1a1a2e",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── Verify OTP ── */
  const onVerifyOTP = useCallback(async (data) => {
    setVerifyLoading(true);
    try {
      const res = await axiosinterceptor.put(
        `${baseURL}/Family/VerifyOTP`,
        { otp: data.otp, email: newEmailValue },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Email changed successfully!",
          timer: 3500,
          showConfirmButton: false,
          background: "#1a1a2e",
          color: "#fff",
        });
        setTimeout(() => { window.location.pathname = "/FamilyDashboard/profile"; }, 3600);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: "Please try again.",
        background: "#1a1a2e",
        color: "#fff",
      });
    } finally {
      setVerifyLoading(false);
    }
  }, [newEmailValue]);

  return (
    <div style={css.page}>
      <div style={css.card}>
        {/* Heading */}
        <div style={css.heading}>
          <div style={css.headingIcon}><i className="fa-solid fa-envelope" /></div>
          <div>
            <h1 style={css.title}>Change Email</h1>
            <p style={css.subtitle}>Update your login email address</p>
          </div>
        </div>

        <ProfileTabs />

        {step === 1 ? (
          <form onSubmit={submit1(onSendOTP)} noValidate>
            <FormField label="New Email Address" error={err1.NewEmail?.message}>
              <input
                id="NewEmail"
                type="email"
                placeholder="new@example.com"
                style={css.input}
                {...reg1("NewEmail", {
                  required: "Email is required",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email format" },
                })}
              />
            </FormField>

            <FormField label="Current Password" error={err1.Password?.message}>
              <PasswordInput
                id="Password"
                placeholder="Your current password"
                registration={reg1("Password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
              />
            </FormField>

            <button type="submit" style={css.submitBtn} disabled={loading}>
              {loading ? <span className={s.btnSpinner} /> : <i className="fa-solid fa-paper-plane" />}
              {loading ? "Sending…" : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={submit2(onVerifyOTP)} noValidate>
            <div style={css.otpInfo}>
              <i className="fa-solid fa-circle-info" style={{ color: "#a78bfa" }} />
              <span>A 6-digit code was sent to <strong style={{ color: "#fff" }}>{newEmailValue}</strong></span>
            </div>

            <FormField label="Verification Code" error={err2.otp?.message}>
              <input
                id="otp"
                type="text"
                placeholder="e.g. 123456"
                style={{ ...css.input, textAlign: "center", fontSize: "1.4rem", letterSpacing: "0.3em" }}
                maxLength={8}
                {...reg2("otp", {
                  required: "OTP is required",
                  pattern: { value: /^\d+$/, message: "Numbers only" },
                })}
              />
            </FormField>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                style={css.outlineBtn}
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button type="submit" style={{ ...css.submitBtn, flex: 1 }} disabled={verifyLoading}>
                {verifyLoading ? <span className={s.btnSpinner} /> : <i className="fa-solid fa-check" />}
                {verifyLoading ? "Verifying…" : "Confirm Change"}
              </button>
            </div>
          </form>
        )}
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
    maxWidth: 560,
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
  /* form */
  field: { display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" },
  label: { fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" },
  hint:  { fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", margin: 0 },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: "0.7rem 1rem",
    color: "#fff",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
  },
  passWrap: { position: "relative" },
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
  otpInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.85rem 1rem",
    background: "rgba(167,139,250,0.08)",
    border: "1px solid rgba(167,139,250,0.2)",
    borderRadius: 10,
    color: "rgba(255,255,255,0.55)",
    fontSize: "0.85rem",
    marginBottom: "1.5rem",
  },
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
  },
  outlineBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.85rem 1.25rem",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "transparent",
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.9rem",
    fontWeight: 600,
    cursor: "pointer",
    flexShrink: 0,
  },
};
