import { useForm, Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import SignUpstyles from "./signUp.module.css";
import Select from "react-select";
import { CountryOptions, TimezoneOptions } from "./data";
import axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.getAttribute("data-theme") === "dark");

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const password = watch("password");

  /* ================= MODERN SELECT STYLE (Matching JoinAsTeacher) ================= */
  const comboStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
      marginBottom: "20px",
    }),
    control: (base, state) => ({
      ...base,
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "var(--bg-main)",
      borderColor: "var(--border-color)",
      borderWidth: "2px",
      borderRadius: "12px",
      minHeight: "56px",
      boxShadow: state.isFocused ? "0 0 0 4px rgba(0, 123, 255, 0.1)" : "none",
      "&:hover": {
        borderColor: "var(--accent-color)"
      },
      transition: "all 0.3s ease",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--card-bg)",
      zIndex: "9999",
      borderRadius: "12px",
      border: "1px solid var(--border-color)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      marginTop: "8px",
      overflow: "hidden"
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? "var(--accent-color)" 
        : state.isFocused 
          ? "rgba(255, 255, 255, 0.05)" 
          : "transparent",
      color: state.isSelected ? "white" : "var(--text-main)",
      padding: "12px 16px",
      fontSize: "1rem",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "var(--accent-color)",
        color: "white"
      }
    }),
    input: (provided) => ({
      ...provided,
      color: "var(--text-main)",
      margin: "0px",
      padding: "0px",
      input: {
        background: "transparent !important",
        border: "none !important",
        outline: "none !important",
        boxShadow: "none !important",
        padding: "0px !important",
        fontSize: "inherit !important"
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 16px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--text-main)"
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "var(--text-muted)",
      fontSize: "1.05rem"
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "var(--text-muted)",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "0.2s",
    }),
    indicatorSeparator: () => ({
      display: "none"
    })
  };

  const onSubmit = async (data) => {
    data.fullname = data.firstname + " " + data.lastname;
    setLoading(true);

    try {
      const res = await axios.post(
        `${baseURL}/Authentication/FamilyRegister`,
        {
          ...data,
          Country: data.Country?.label,
          timezone: data.timezone?.label
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.status === 200) {
        Swal.fire({
          title: "Congratulations!",
          text: "Please check your email to activate your account!",
          icon: "success",
        });
        setTimeout(() => {
          window.location.pathname = "/Login";
        }, 3000);
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
      });
    }

    setLoading(false);
  };

  return (
    <div className={SignUpstyles.signUpContainer}>
      <form className={SignUpstyles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={SignUpstyles.signUpTitle}>Sign Up</h1>

        <div className={SignUpstyles.inputs}>
          <div className={SignUpstyles.Column}>
            <input 
              {...register("firstname", { required: "First name is required" })} 
              placeholder="First Name" 
            />
            {errors.firstname && <p className="text-danger small mb-2 w-100">{errors.firstname.message}</p>}

            <input
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" }
              })}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p className="text-danger small mb-2 w-100">{errors.password.message}</p>}

            <input
              {...register("WhatsAppNumber", { required: "Whatsapp number is required" })}
              placeholder="Whatsapp number"
            />
            {errors.WhatsAppNumber && <p className="text-danger small mb-2 w-100">{errors.WhatsAppNumber.message}</p>}

            <div className={SignUpstyles.controlCountry}>
              <Controller
                name="Country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={CountryOptions}
                    styles={comboStyles}
                    placeholder="Select Country"
                    instanceId="country-select"
                  />
                )}
              />
              {errors.Country && <p className="text-danger small mb-2 w-100">{errors.Country.message}</p>}
            </div>
          </div>

          <div className={SignUpstyles.Column}>
            <input 
              {...register("lastname", { required: "Last name is required" })} 
              placeholder="Last Name" 
            />
            {errors.lastname && <p className="text-danger small mb-2 w-100">{errors.lastname.message}</p>}

            <input
              {...register("confirmPassword", { 
                required: "Confirm password",
                validate: value => value === password || "Passwords don't match"
              })}
              type="password"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && <p className="text-danger small mb-2 w-100">{errors.confirmPassword.message}</p>}

            <input 
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
              })} 
              placeholder="Email Address" 
            />
            {errors.email && <p className="text-danger small mb-2 w-100">{errors.email.message}</p>}

            <div className={SignUpstyles.controlTimezone}>
              <Controller
                name="timezone"
                control={control}
                rules={{ required: "Timezone is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={TimezoneOptions}
                    styles={comboStyles}
                    placeholder="Select Timezone"
                    instanceId="timezone-select"
                  />
                )}
              />
              {errors.timezone && <p className="text-danger small mb-2 w-100">{errors.timezone.message}</p>}
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner-border spinner-border-sm text-light" role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
          ) : "Sign Up"}
        </button>

        <p className={SignUpstyles.notSure}>
          Already have an account? <Link to="/Login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
