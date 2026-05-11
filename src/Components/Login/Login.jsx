import React, { useState } from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "../../Helper/CookieHelper";
import baseURL from "../../BaseURL/BaseURL";
import "../ProgressBar/ProgressBar.css";
// ============================================ New validation with react-hook-form ===========================
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const email = watch("email");
  const [confirmationLink, setConfirmationLink] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    axios
      .post(
        `${baseURL}/Authentication/FamilyLogin`,
        {
          emailOrPhoneNumber: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {

        if (res.status === 200) {
          setCookie("AccessToken", res.data.token);
          const decodedToken = jwtDecode(res.data.token);
          const Full_Name = decodedToken.FullName;
          setCookie("Full_Name", Full_Name);
          setCookie(
            "refreshToken",
            res.data.refreshToken,
            res.data.refreshTokenExpiration
          );
          setLoading(false);
          window.location.href = "/FamilyDashboard";
        }
      })
      .catch((err) => {

        if (err.response && err.response.status === 500) {
          Swal.fire({
            title: "Error!",
            text: "We are having an error right now, please try again later",
            icon: "error",
            timer: 5000,
          });
          setLoading(false);
        } else if (
          err.response &&
          err.response.status === 400 &&
          err.response.data.includes("This User Need To Confirm Before Login")
        ) {
          Swal.fire({
            title: "Error!",
            text: "Please Confirm Your Email",
            icon: "error",
            timer: 5000,
          });
          setConfirmationLink(true); // Set the state to true when the error is encountered
          setLoading(false);
        } else if (
          err.response &&
          err.response.status === 400 &&
          err.response.data.includes("PhoneNumber or Password is incorrect!")
        ) {
          Swal.fire({
            title: "Error!",
            text: "PhoneNumber or Password is incorrect!",
            icon: "error",
            timer: 5000,
          });
          setLoading(false);
        }
      });
  };

  const handleSendConfirmationLink = async () => {
    try {
      const res = await axios.put(
        `${baseURL}/Authentication/SendEmailConfirmation`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            email: email,
          },
        }
      );
      if (res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Confirmation link sent to your email",
          icon: "success",
          timer: 5000,
        });
      }
    } catch (err) {

      Swal.fire({
        title: "Error!",
        text: "Failed to send confirmation link",
        icon: "error",
        timer: 5000,
      });
    }
  };

  return (
    <>
      {loading && (
        <div className="redirect">
          <div className="loader"></div>
        </div>
      )}
      <div className={style.Container}>
        <div className={style.parent_width}>
          <div className={style.cardBorder}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column align-items-center"
            >
              <h1 className={style.loginTitle}>Login</h1>
              
              <input
                type="text"
                placeholder="Email Address"
                className={style.Input}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger mb-3 small w-100">{errors.email.message}</p>
              )}

              <input
                type="password"
                placeholder="Password"
                className={style.Input}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-danger mb-3 small w-100">{errors.password.message}</p>
              )}

              <div className={style.forgotText}>
                <Link
                  to="/reset-password"
                  className={style.a_decoration}
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className={style.login_btn}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>

              <div className={style.footerText}>
                <span>Don't have an account? </span>
                <Link to="/signup" className={style.a_decoration}>
                  Sign Up
                </Link>
              </div>

              {confirmationLink && (
                <div className="text-center mt-4 small border-top pt-3 opacity-90">
                  We've sent a confirmation email to <strong>{email}</strong>.
                  <br /> To complete registration, please click the link in your email.
                  <br /> Check your spam folder if you can't find it.
                  <div
                    onClick={handleSendConfirmationLink}
                    className={`${style.a_decoration} d-inline-block mt-2`}
                    style={{ cursor: "pointer" }}
                  >
                    Click here to resend link.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
