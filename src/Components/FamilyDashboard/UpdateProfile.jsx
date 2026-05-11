import React, { useState, useCallback } from "react";
import style from "./Dashboard.module.css";
import ProfileTabs from "./ProfileTabs";
import { CountryOptions, TimezoneOptions } from "./newData";
import Select from "react-select";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import Swal from "sweetalert2";
import baseURL from "../../BaseURL/BaseURL";
import { setCookie } from "../../Helper/CookieHelper";
import { useForm, Controller } from "react-hook-form";

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
  menu: (p) => ({
    ...p,
    background: "#354F52",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    zIndex: 99,
  }),
  menuList: (p) => ({ ...p, padding: 4 }),
  option: (p, s) => ({
    ...p,
    background: s.isSelected
      ? "rgba(241,114,182,0.2)"
      : s.isFocused
        ? "rgba(255,255,255,0.06)"
        : "transparent",
    color: s.isSelected ? "#52796f" : "#e2e8f0",
    borderRadius: 6,
    fontSize: "0.875rem",
  }),
  singleValue: (p) => ({ ...p, color: "#fff" }),
  placeholder: (p) => ({
    ...p,
    color: "rgba(255,255,255,0.3)",
    fontSize: "0.875rem",
  }),
  input: (p) => ({ ...p, color: "#fff" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (p) => ({ ...p, color: "rgba(255,255,255,0.3)" }),
};

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
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Hide password" : "Show password"}
      >
        <i className={`fa-solid fa-eye${show ? "-slash" : ""}`} />
      </button>
    </div>
  );
};

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
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
        background: "#354F52",
        color: "#fff",
      });
      setCookie("Full_Name", data.familyName);
      setTimeout(() => {
        window.location.pathname = "/FamilyDashboard/profile";
      }, 3500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        background: "#354F52",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className={style.pageWrapper}>
      <div className={style.profileCard}>
        {/* Heading Section */}
        <div className={style.profileHeader}>
          <div className={style.profileAvatar}>
            <i className="fa-solid fa-pen-to-square" />
          </div>
          <div className={style.profileTitleContainer}>
            <h1 className={style.profileName}>Edit Profile</h1>
            <p className={style.profileEmail}>
              Update your personal information
            </p>
          </div>
        </div>

        <ProfileTabs />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={style.formGrid}>
            <FormField label="Full Name" error={errors.familyName?.message}>
              <input
                id="familyName"
                type="text"
                placeholder="Your full name"
                className={style.inputField}
                {...register("familyName", {
                  required: "Full name is required",
                })}
              />
            </FormField>

            <FormField
              label="WhatsApp Number"
              error={errors.whatsAppNumber?.message}
            >
              <input
                id="whatsAppNumber"
                type="tel"
                placeholder="11-digit number"
                className={style.inputField}
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
                    onChange={(opt) => field.onChange(opt.value)}
                    value={
                      CountryOptions.find((o) => o.value === field.value) ??
                      null
                    }
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
                    onChange={(opt) => field.onChange(opt.value)}
                    value={
                      TimezoneOptions.find((o) => o.value === field.value) ??
                      null
                    }
                    placeholder="Select timezone…"
                  />
                )}
              />
            </FormField>
          </div>

          <FormField
            label="Current Password (required)"
            error={errors.currentPassword?.message}
          >
            <PasswordInput
              id="currentPassword"
              placeholder="Enter current password to save"
              registration={register("currentPassword", {
                required: "Current password is required",
              })}
            />
          </FormField>

          <button type="submit" className={style.submitBtn} disabled={loading}>
            {loading ? (
              <span className={style.btnSpinner} />
            ) : (
              <i className="fa-solid fa-floppy-disk" />
            )}
            {loading ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
