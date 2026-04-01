import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "../../Helper/CookieHelper";
import { ProgressBar } from "react-bootstrap";
import baseURL from "../../BaseURL/BaseURL";
import "../ProgressBar/ProgressBar.css";
// ============================================ New validation with react-hook-form ===========================
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ChangeEmail from "./../FamilyDashboard/ChangeEmail";

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
        console.log(res);
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
        console.log(err);
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
      console.log(err);
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
      <div className={`container ${style.Container}`}>
        <div className="row py-5 justify-content-center">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className={`parent ${style.cardBorder} ${style.parent_width}`}>
              <div className="child mt-5">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <h1 className="text-center">Login</h1>
                  <input
                    type="text"
                    placeholder="Email"
                    className={`m-4 ${style.Input}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
                        message: "Enter a valid email formula",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                  <input
                    type="password"
                    placeholder="Password"
                    className={`m-4 ${style.Input}`}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                  <Link
                    to="/reset-password"
                    className={`text-start ${style.a_decoration}`}
                  >
                    Forgot Password ?
                  </Link>
                  <div>
                    <button
                      type="submit"
                      className={`m-4 text-center text-decoration-none ${style.login_btn}`}
                    >
                      {loading ? (
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                  <p className="text-center m-3">
                    Don't have an account ?{" "}
                    <Link
                      to="/signup"
                      className={`${style.a_decoration} text-decoration-none fw-bold`}
                    >
                      Sign Up
                    </Link>
                  </p>
                  {confirmationLink && (
                    <div className="text-center m-3">
                      We've sent a confirmation email to your address,
                      <span
                        className={`${style.a_decoration} text-decoration-none fw-bold`}
                      >
                        {email}
                      </span>
                      .<br></br> To complete your registration, please click the
                      confirmation link in the email.<br></br> The email might
                      have landed in your spam folder, so be sure to check there
                      as well. <br></br>If you don't see the email within a few
                      minutes, you can request a new one by
                      <div
                        onClick={handleSendConfirmationLink}
                        className={`${style.a_decoration} text-decoration-none fw-bold`}
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        clicking here.
                      </div>{" "}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
