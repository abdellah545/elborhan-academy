import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { CountryOptions, TimezoneOptions } from "./newData";
import Select from "react-select";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import Swal from "sweetalert2";
import baseURL from "../../BaseURL/BaseURL";
import { setCookie } from "../../Helper/CookieHelper";
import { useForm, Controller } from "react-hook-form";
import s from "./Dashboard.module.css";

/* ── Profile sub-tabs (shared across all profile pages) ── */
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

/* react-select dark theme styles */
const selectDark = {
  control: (p, s) => ({
    ...p,
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${s.isFocused ? "rgba(241,114,182,0.5)" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 10,
    boxShadow: "none",
    minHeight: 46,
    color: "#fff",
    "&:hover": { borderColor: "rgba(241,114,182,0.4)" },
  }),
  menu: (p) => ({ ...p, background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, zIndex: 99 }),
  menuList: (p) => ({ ...p, padding: 4 }),
  option: (p, s) => ({
    ...p,
    background: s.isSelected ? "rgba(241,114,182,0.2)" : s.isFocused ? "rgba(255,255,255,0.06)" : "transparent",
    color: s.isSelected ? "#f172b6" : "#e2e8f0",
    borderRadius: 6,
    fontSize: "0.875rem",
  }),
  singleValue: (p) => ({ ...p, color: "#fff" }),
  placeholder: (p) => ({ ...p, color: "rgba(255,255,255,0.3)", fontSize: "0.875rem" }),
  input: (p) => ({ ...p, color: "#fff" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (p) => ({ ...p, color: "rgba(255,255,255,0.3)" }),
};

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

export default function UpdateProfile() {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      await axiosinterceptor.put(`${baseURL}/Family/EditProfile`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
        timer: 3000,
        showConfirmButton: false,
        background: "#1a1a2e",
        color: "#fff",
      });
      setCookie("Full_Name", data.familyName);
      setTimeout(() => { window.location.pathname = "/FamilyDashboard/profile"; }, 3500);
    } catch (err) {

      Swal.fire({ icon: "error", title: "Update failed", background: "#1a1a2e", color: "#fff" });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div style={css.page}>
      <div style={css.card}>
        {/* Heading */}
        <div style={css.heading}>
          <div style={css.headingIcon}><i className="fa-solid fa-pen-to-square" /></div>
          <div>
            <h1 style={css.title}>Edit Profile</h1>
            <p style={css.subtitle}>Update your personal information</p>
          </div>
        </div>

        <ProfileTabs />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div style={css.grid2}>
            <FormField label="Full Name" error={errors.familyName?.message}>
              <input
                id="familyName"
                type="text"
                placeholder="Your full name"
                style={css.input}
                {...register("familyName", { required: "Full name is required" })}
              />
            </FormField>

            <FormField label="WhatsApp Number" error={errors.whatsAppNumber?.message}>
              <input
                id="whatsAppNumber"
                type="tel"
                placeholder="11-digit number"
                style={css.input}
                {...register("whatsAppNumber", {
                  required: "Phone number is required",
                  minLength: { value: 11, message: "Must be 11 digits" },
                  maxLength: { value: 15, message: "Too long" },
                  pattern: { value: /^\d+$/, message: "Numbers only" },
                })}
              />
            </FormField>

            <FormField label="Country" error={errors.country?.message}>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable
                    options={CountryOptions}
                    styles={selectDark}
                    onChange={opt => field.onChange(opt.value)}
                    value={CountryOptions.find(o => o.value === field.value) ?? null}
                    placeholder="Select country…"
                  />
                )}
              />
            </FormField>

            <FormField label="Timezone" error={errors.timezone?.message}>
              <Controller
                name="timezone"
                control={control}
                rules={{ required: "Timezone is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable
                    options={TimezoneOptions}
                    styles={selectDark}
                    onChange={opt => field.onChange(opt.value)}
                    value={TimezoneOptions.find(o => o.value === field.value) ?? null}
                    placeholder="Select timezone…"
                  />
                )}
              />
            </FormField>
          </div>

          {/* Current password confirmation */}
          <FormField label="Current Password (required to save changes)" error={errors.currentPassword?.message}>
            <PasswordInput
              id="currentPassword"
              placeholder="Enter your current password"
              registration={register("currentPassword", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                pattern: { value: /[0-9]/, message: "Must contain a number" },
                validate: {
                  uppercase: v => /[A-Z]/.test(v) || "Must contain an uppercase letter",
                  special:   v => /[@$!%*?&]/.test(v) || "Must contain a special character",
                },
              })}
            />
          </FormField>

          <button type="submit" style={css.submitBtn} disabled={loading}>
            {loading ? <span className={s.btnSpinner} /> : <i className="fa-solid fa-floppy-disk" />}
            {loading ? "Saving…" : "Save Changes"}
          </button>
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
    maxWidth: 760,
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
    background: "linear-gradient(135deg, rgba(241,114,182,0.2), rgba(124,106,255,0.2))",
    border: "1px solid rgba(241,114,182,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: "#f172b6",
    flexShrink: 0,
  },
  title: { fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: 0 },
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
    transition: "all 0.15s ease",
  },
  tabActive: {
    background: "rgba(241,114,182,0.15)",
    color: "#f172b6",
    fontWeight: 700,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginBottom: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    marginBottom: "1rem",
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
  error: {
    fontSize: "0.75rem",
    color: "#f87171",
    margin: 0,
  },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    width: "100%",
    padding: "0.85rem",
    marginTop: "0.5rem",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #f172b6, #7c6aff)",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  },
};
