import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
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

  const password = watch("password");
  const email = watch("email");

  /* ================= SELECT STYLE FIX ================= */
  const comboStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
      maxWidth: "300px",
      margin: "10px auto",
      boxSizing: "border-box",
    }),

    control: (provided, state) => ({
      ...provided,
      minHeight: "50px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      borderColor: "#383838",
      boxShadow: "none",
      fontSize: "17px",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#383838",
        backgroundColor: "#ffffff",
      },
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: "0 12px",
    }),

    placeholder: (provided) => ({
      ...provided,
      fontSize: "17px",
      color: "#201e1b",
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#000",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
      transition: "0.2s",
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "#000",
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
      width: "100%",
      borderRadius: "10px",
      marginTop: "4px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      zIndex: 9999,
    }),

    menuList: (provided) => ({
      ...provided,
      backgroundColor: "#ffffff",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#f5f5f5" : "#ffffff",
      color: "#201e1b",
      padding: "12px",
      fontSize: "16px",
      cursor: "pointer",
    }),
  };

  const onSubmit = async (data) => {
    data.fullname = data.firstname + " " + data.lastname;
    setLoading(true);

    try {
      const res = await axios.post(
        `${baseURL}/Authentication/FamilyRegister`,
        data,
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
        <h1>Sign up</h1>

        <div className={SignUpstyles.inputs}>
          <div className={SignUpstyles.Column}>
            <input {...register("firstname")} placeholder="First Name" />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <input
              {...register("WhatsAppNumber")}
              placeholder="Whatsapp number"
            />

            <div className={SignUpstyles.controlCountry}>
              <Controller
                name="Country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={CountryOptions}
                    styles={comboStyles}
                    placeholder="Select Country"
                  />
                )}
              />
            </div>
          </div>

          <div className={SignUpstyles.Column}>
            <input {...register("lastname")} placeholder="Last Name" />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm password"
            />
            <input {...register("email")} placeholder="Email Address" />

            <div className={SignUpstyles.controlTimezone}>
              <Controller
                name="timezone"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={TimezoneOptions}
                    styles={comboStyles}
                    placeholder="Select Timezone"
                  />
                )}
              />
            </div>
          </div>
        </div>

        <button type="submit">{loading ? "Loading..." : "Sign Up"}</button>

        <p className={SignUpstyles.notSure}>
          Already have an account? <Link to="/Login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
