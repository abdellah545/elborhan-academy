import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./ResetPassword.module.css";
import Swal from "sweetalert2";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(e) {
    e.preventDefault();
    setLoading(true);
    let hasError = false;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `https://el-burhanacademy.azurewebsites.net/Authentication/ForgetPassword`,
        {},
        {
          params: { email: email },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Reset link sent!",
          text: "Check your email for the reset password link.",
          showConfirmButton: false,
          timer: 3000,
          background: "#1a1a2e",
          color: "#fff",
        });
        
        setTimeout(() => { window.location.pathname = "/Login"; }, 3500);
      }
    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong. Please try again.",
        background: "#1a1a2e",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={css.page}>
      <div style={css.card}>
        {/* Heading */}
        <div style={css.heading}>
          <div style={css.headingIcon}><i className="fa-solid fa-key" /></div>
          <div>
            <h1 style={css.title}>Reset Password</h1>
            <p style={css.subtitle}>Enter your email to receive a reset link</p>
          </div>
        </div>

        <form onSubmit={handleResetPassword} noValidate>
          <div style={css.field}>
            <label style={css.label}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                ...css.input,
                borderColor: emailError ? "#f87171" : "rgba(255,255,255,0.12)",
              }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
            />
            {emailError && <p style={css.error}>*Please enter a valid email address</p>}
          </div>

          <button type="submit" style={css.submitBtn} disabled={loading}>
            {loading ? <span className={style.spinner} /> : <i className="fa-solid fa-paper-plane" />}
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div style={css.footer}>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Remembered your password? </span>
            <Link to="/Login" style={css.link}>Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Styles ─── */
const css = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f0f1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "2.5rem 2rem",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
  },
  heading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "1rem",
    marginBottom: "2.5rem",
  },
  headingIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    background: "linear-gradient(135deg, rgba(241,114,182,0.2), rgba(124,106,255,0.2))",
    border: "1px solid rgba(241,114,182,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.75rem",
    color: "#f172b6",
  },
  title: { fontSize: "1.5rem", fontWeight: 700, color: "#fff", margin: 0 },
  subtitle: { fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", margin: 0 },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1.75rem",
  },
  label: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: "0.8rem 1rem",
    color: "#fff",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
  },
  error: { fontSize: "0.75rem", color: "#f87171", margin: 0 },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    width: "100%",
    padding: "0.9rem",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #f172b6, #7c6aff)",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  footer: {
    marginTop: "2rem",
    textAlign: "center",
    fontSize: "0.85rem",
  },
  link: {
    color: "#f172b6",
    textDecoration: "none",
    fontWeight: 600,
  },
};
