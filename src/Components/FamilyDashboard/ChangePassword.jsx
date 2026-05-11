import React, { useState, useCallback } from "react";
import style from "./Dashboard.module.css";
import ProfileTabs from "./ProfileTabs";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import Swal from "sweetalert2";
import baseURL from "../../BaseURL/BaseURL";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const FormField = ({ label, error, children }) => (
  <div className={style.formField}>
    <label className={style.fieldLabel}>{label}</label>
    {children}
    {error && <p className={style.fieldError}>{error}</p>}
  </div>
);

const PasswordInput = ({ id, placeholder, registration }) => {
  const [show, setShow] = useState(false);
  return (
    <div className={style.passWrap}>
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className={style.inputField}
        {...registration}
      />
      <button
        type="button"
        className={style.passToggle}
        onClick={() => setShow(v => !v)}
      >
        <i className={`fa-solid fa-eye${show ? "-slash" : ""}`} />
      </button>
    </div>
  );
};

function PasswordChecklist({ value, confirmValue }) {
  if (!value) return null;
  const rules = [
    { label: "At least 6 characters", pass: value.length >= 6 },
    { label: "Contains a number", pass: /[0-9]/.test(value) },
    { label: "Contains an uppercase letter", pass: /[A-Z]/.test(value) },
    { label: "Contains a special character", pass: /[@$!%*?&]/.test(value) },
    { label: "Passwords match", pass: value === confirmValue && !!confirmValue },
  ];
  return (
    <div className={style.checklist}>
      {rules.map(({ label, pass }) => (
        <div key={label} className={style.checkItem}>
          <span className={style.checkDot} style={{ background: pass ? "#4ade80" : "rgba(255,255,255,0.15)" }} />
          <span style={{ color: pass ? "#4ade80" : "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ChangePassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const newPwd = watch("newPassword", "");
  const confirmPwd = watch("confirmNewPassword", "");

  const onSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await axiosinterceptor.put(`${baseURL}/Authentication/ChangePassword`, data, { headers: { "Content-Type": "application/json" }, withCredentials: true });
      if (res.status === 200) {
        Swal.fire({ icon: "success", title: "Password updated!", timer: 3000, showConfirmButton: false, background: "#354F52", color: "#fff" });
        setTimeout(() => { window.location.pathname = "/FamilyDashboard"; }, 3200);
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update failed", text: "Check current password.", background: "#354F52", color: "#fff" });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className={style.pageWrapper}>
      <div className={style.profileCard}>
        <div className={style.profileHeader}>
          <div className={style.profileAvatar}><i className="fa-solid fa-lock" /></div>
          <div className={style.profileTitleContainer}>
            <h1 className={style.profileName}>Change Password</h1>
            <p className={style.profileEmail}>Secure your account with a new password</p>
          </div>
        </div>

        <ProfileTabs />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormField label="Current Password" error={errors.oldPassword?.message}>
            <PasswordInput id="oldPassword" placeholder="Current password" registration={register("oldPassword", { required: "Required" })} />
          </FormField>

          <FormField label="New Password" error={errors.newPassword?.message}>
            <PasswordInput id="newPassword" placeholder="New strong password" registration={register("newPassword", { required: "Required", minLength: 6 })} />
          </FormField>

          <FormField label="Confirm Password" error={errors.confirmNewPassword?.message}>
            <PasswordInput id="confirmNewPassword" placeholder="Confirm new password" registration={register("confirmNewPassword", { required: "Required", validate: v => v === newPwd || "Mismatch" })} />
          </FormField>

          <PasswordChecklist value={newPwd} confirmValue={confirmPwd} />

          <button type="submit" className={style.submitBtn} disabled={loading}>
            {loading ? <span className={style.btnSpinner} /> : <i className="fa-solid fa-shield-halved" />}
            Update Password
          </button>

          <div className={style.forgotWrap}>
            <Link to="/reset-password" className={style.forgotLink}>Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
