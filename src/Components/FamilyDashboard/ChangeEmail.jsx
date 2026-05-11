import React, { useState, useCallback } from "react";
import style from "./Dashboard.module.css";
import ProfileTabs from "./ProfileTabs";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import Swal from "sweetalert2";
import baseURL from "../../BaseURL/BaseURL";
import { useForm } from "react-hook-form";

const FormField = ({ label, hint, error, children }) => (
  <div className={style.formField}>
    <label className={style.fieldLabel}>{label}</label>
    {hint && <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>{hint}</p>}
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

export default function ChangeEmail() {
  const [step, setStep] = useState(1);
  const [newEmailValue, setNewEmailValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const { register: reg1, handleSubmit: submit1, formState: { errors: err1 } } = useForm();
  const { register: reg2, handleSubmit: submit2, formState: { errors: err2 } } = useForm();

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
          timer: 3000,
          showConfirmButton: false,
          background: "#354F52",
          color: "#fff",
        });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed to send OTP", background: "#354F52", color: "#fff" });
    } finally {
      setLoading(false);
    }
  }, []);

  const onVerifyOTP = useCallback(async (data) => {
    setVerifyLoading(true);
    try {
      const res = await axiosinterceptor.put(
        `${baseURL}/Family/VerifyOTP`,
        { otp: data.otp, email: newEmailValue },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.status === 200) {
        Swal.fire({ icon: "success", title: "Email changed!", timer: 2500, showConfirmButton: false, background: "#354F52", color: "#fff" });
        setTimeout(() => { window.location.pathname = "/FamilyDashboard/profile"; }, 2600);
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Invalid OTP", background: "#354F52", color: "#fff" });
    } finally {
      setVerifyLoading(false);
    }
  }, [newEmailValue]);

  return (
    <div className={style.pageWrapper}>
      <div className={style.profileCard}>
        <div className={style.profileHeader}>
          <div className={style.profileAvatar}><i className="fa-solid fa-envelope" /></div>
          <div className={style.profileTitleContainer}>
            <h1 className={style.profileName}>Change Email</h1>
            <p className={style.profileEmail}>Update your login email address</p>
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
                className={style.inputField}
                {...reg1("NewEmail", {
                  required: "Email is required",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email" },
                })}
              />
            </FormField>

            <FormField label="Current Password" error={err1.Password?.message}>
              <PasswordInput
                id="Password"
                placeholder="Your current password"
                registration={reg1("Password", { required: "Password is required" })}
              />
            </FormField>

            <button type="submit" className={style.submitBtn} disabled={loading}>
              {loading ? <span className={style.btnSpinner} /> : <i className="fa-solid fa-paper-plane" />}
              {loading ? "Sending…" : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={submit2(onVerifyOTP)} noValidate>
            <div className={style.otpInfo}>
              <i className="fa-solid fa-circle-info" />
              <span>OTP sent to <strong>{newEmailValue}</strong></span>
            </div>

            <FormField label="Verification Code" error={err2.otp?.message}>
              <input
                id="otp"
                type="text"
                placeholder="000000"
                className={style.inputField}
                style={{ textAlign: "center", fontSize: "1.5rem", letterSpacing: "0.2em" }}
                maxLength={8}
                {...reg2("otp", { required: "OTP is required" })}
              />
            </FormField>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button type="button" className={style.submitBtn} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }} onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit" className={style.submitBtn} style={{ flex: 1 }} disabled={verifyLoading}>
                {verifyLoading ? <span className={style.btnSpinner} /> : <i className="fa-solid fa-check" />}
                Confirm Change
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
