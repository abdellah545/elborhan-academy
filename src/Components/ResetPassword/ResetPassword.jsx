import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./ResetPassword.module.css";
import Swal from "sweetalert2";
import axios from "axios";

// const ForgetPassword = "Authentication/ForgetPassword";
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(e) {
    e.preventDefault();
    setLoading(true);
    if (!/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email)) {
      setEmailError(true);
    }
    try {
      const res = await axios.post(
        `https://el-burhanacademy.azurewebsites.net/Authentication/ForgetPassword`,
        {},
        {
          params: {
            email: email,
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Check your gmail for reset password link",
          showConfirmButton: false,
          timer: 3000
        });
        
        setTimeout(() => {
          window.location.pathname = "/Login";
        }, 4000);
        console.log(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <>
      <section className={`container mt-5 ${style.Container}`}>
        <div className="row py-5 justify-content-center">
          <div className="col-lg-12">
            <div className={`parent ${style.cardBorder} ${style.parent_width}`}>
              <div className="child mt-4">
                <form onSubmit={handleResetPassword} className="p-4">
                  <h1 className="text-center mb-5 fw-bold">Reset Password</h1>
                  <input
                    type="text"
                    className={`m-4 ${style.Input}`}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-danger text-center">
                      *Enter a valid email
                    </p>
                  )}
                  <div className="confirm text-center">
                    <button
                      type="submit"
                      className={`m-4 text-center text-decoration-none ${style.confirm_btn}`}
                    >
                      {loading ? (
                        <>
                          <div class="spinner-border text-light" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        </>
                      ) : (
                        "Confirm"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
