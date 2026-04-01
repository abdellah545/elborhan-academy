// import React, { useState } from "react";
// import style from "./ChangeEmail.module.css";
// import axiosinterceptor from "../../authComponent/axiosinterceptor";

// import Swal from "sweetalert2";
// import baseURL from "../../BaseURL/BaseURL";

// export default function ChangeEmail() {
//   const [loading, setLoading] = useState(false);
//   const [Verifyloading, setVerifyloading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [codeFieldDisabled, setCodeFieldDisabled] = useState(true); // Initially disabled

//   const handleSENDotp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axiosinterceptor.get(
//         `${baseURL}/Family/SendOTP`,
//         {
//           params: {
//             NewEmail: email,
//             Password: password,
//           },
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.status === 200) {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "OTP sent successfully, check your email",
//           showConfirmButton: false,
//           timer: 5000,
//         });
//         setLoading(false);
//         setCodeFieldDisabled(false); // Enable the code field after OTP is sent
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     setVerifyloading(true);
//     try {
//       const res = await axiosinterceptor.put(
//         "https://el-burhanacademy.azurewebsites.net/Family/VerifyOTP",
//         {
//           otp: otp,
//           email: email,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.status === 200) {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Email changed successfully",
//           showConfirmButton: false,
//           timer: 4000,
//         });
//         setVerifyloading(false);
//         setTimeout(() => {
//           window.location.pathname = "/FamilyDashboard/profile";
//         }, 4000);
//       }
//     } catch (err) {
//       console.log(err);
//       setVerifyloading(false);
//     }
//   };

//   return (
//     <>
//       <div className={`container ${style.Container}`}>
//         <div className="row py-5 justify-content-center">
//           <div className="col-lg-12 col-md-12 col-sm-12">
//             <div
//               className={`parent bg-dark ${style.cardBorder} ${style.parent_width}`}
//             >
//               <div className="child mt-4">
//                 <form onSubmit={handleSENDotp}>
//                   <h1 className="text-center text-light fw-bold text-decoration-underline mb-5">
//                     Change Email
//                   </h1>
//                   <div className="row">
//                     <div className="col-lg-12 col-md-12">
//                       <div class="mb-5 w-50 mx-auto">
//                         <input
//                           type="email"
//                           placeholder="New Email"
//                           className={`${style.Input}`}
//                           onChange={(e) => setEmail(e.target.value)}
//                           value={email}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-12 col-md-12">
//                       <div class="mb-5 w-50 mx-auto">
//                         <input
//                           type="password"
//                           placeholder="Current Password"
//                           className={`${style.Input}`}
//                           onChange={(e) => setPassword(e.target.value)}
//                           value={password}
//                         />
//                       </div>
//                     </div>
//                     <div class="mb-5 w-50 mx-auto text-center">
//                       <button
//                         type="submit"
//                         className={`m-2 btn fw-bold  text-center bg-white text-dark ${style.login_btn}`}
//                       >
//                         {loading ? (
//                           <>
//                             <div
//                               class="spinner-border text-black"
//                               role="status"
//                             >
//                               <span class="visually-hidden">Loading...</span>
//                             </div>
//                           </>
//                         ) : (
//                           "Verify Email"
//                         )}
//                       </button>
//                     </div>
//                     <div className="col-lg-12 col-md-12">
//                       <div class="mb-5 w-25 mx-auto">
//                         <input
//                           type="text"
//                           placeholder="Enter Code"
//                           className={`${style.Input} mb-2`}
//                           onChange={(e) => setOtp(e.target.value)}
//                           value={otp}
//                           disabled={codeFieldDisabled} // Disable if codeFieldDisabled is true
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//                 <div class="mb-5 w-50 mx-auto text-center">
//                   <button
//                     type="button"
//                     onClick={handleVerifyOTP}
//                     className={`m-2 btn fw-bold  text-center bg-white text-dark ${style.login_btn}`}
//                     disabled={codeFieldDisabled} // Disable if codeFieldDisabled is true
//                   >
//                     {Verifyloading ? (
//                       <>
//                         <div class="spinner-border text-black" role="status">
//                           <span class="visually-hidden">Loading...</span>
//                         </div>
//                       </>
//                     ) : (
//                       "Verify Code"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// ========================================= New Validation using react hook form ======================================

import React, { useState } from "react";
import style from "./ChangeEmail.module.css";
import axiosinterceptor from "../../authComponent/axiosinterceptor";

import Swal from "sweetalert2";
import baseURL from "../../BaseURL/BaseURL";
import { useForm } from "react-hook-form";
export default function ChangeEmail() {
 // First form instance
 const {
  register: register1,
  handleSubmit: handleSubmit1,
  watch: watch1,
  formState: { errors: errors1 },
} = useForm();

// Second form instance
const {
  register: register2,
  handleSubmit: handleSubmit2,
  formState: { errors: errors2 },
} = useForm();

  const email = watch1("NewEmail");

  const [loading, setLoading] = useState(false);
  const [Verifyloading, setVerifyloading] = useState(false);
  // const [otp, setOtp] = useState("");
  const [codeFieldDisabled, setCodeFieldDisabled] = useState(true); // Initially disabled

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosinterceptor.get(
        `${baseURL}/Family/SendOTP`,
        {
          params: {
            NewEmail: data.NewEmail,
            Password: data.Password,
          },
        },
        {
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
          title: "OTP sent successfully, check your email",
          showConfirmButton: false,
          timer: 5000,
        });
        setLoading(false);
        setCodeFieldDisabled(false); // Enable the code field after OTP is sent
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onHandleVerifyOTP = async (data) => {
    setVerifyloading(true);
    try {
      const res = await axiosinterceptor.put(
        "https://el-burhanacademy.azurewebsites.net/Family/VerifyOTP",
        {
          otp: data.otp,
          email: email,
        },
        {
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
          title: "Email changed successfully",
          showConfirmButton: false,
          timer: 4000,
        });
        setVerifyloading(false);
        setTimeout(() => {
          window.location.pathname = "/FamilyDashboard/profile";
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      setVerifyloading(false);
    }
  };

  return (
    <>
      <div className={`container ${style.Container}`}>
        <div className="row py-5 justify-content-center">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div
              className={`parent bg-dark ${style.cardBorder} ${style.parent_width}`}
            >
              <div className="child mt-4">
                <form onSubmit={handleSubmit1(onSubmit)}>
                  <h1 className="text-center text-light fw-bold text-decoration-underline mb-5">
                    Change Email
                  </h1>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div class="mb-5 w-50 mx-auto">
                        <input
                          type="email"
                          placeholder="New Email"
                          className={`${style.Input}`}
                          {...register1("NewEmail", {
                            required: {
                              value: true,
                              message: "Email is required",
                            },
                            pattern: {
                              value:
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "Please enter a valid email formula",
                            },
                          })}
                        />
                        {errors1.NewEmail && (
                          <p className="text-danger">
                            {errors1.NewEmail.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div class="mb-5 w-50 mx-auto">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className={`${style.Input}`}
                          {...register1("Password", {
                            required: "Password is required.",
                            minLength: {
                              value: 6,
                              message: "Must be at least 6 characters.",
                            },
                            pattern: {
                              value: /[0-9]/,
                              message: "Must contain at least one number.",
                            },
                            validate: {
                              uppercase: (value) =>
                                value.match(/[A-Z]/)
                                  ? true
                                  : "Must contain at least one uppercase letter.",
                              specialChar: (value) =>
                                value.match(/[@$!%*?&]/)
                                  ? true
                                  : "Must contain at least one special character like (@, _, ...).",
                            },
                          })}
                        />
                        {errors1.Password && (
                          <p className="text-danger">
                            {errors1.Password.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div class="mb-5 w-50 mx-auto text-center">
                      <button
                        type="submit"
                        className={`m-2 btn fw-bold  text-center bg-white text-dark ${style.login_btn}`}
                      >
                        {loading ? (
                          <>
                            <div
                              class="spinner-border text-black"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </>
                        ) : (
                          "Verify Email"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                <form onSubmit={handleSubmit2(onHandleVerifyOTP)}>
                  <div className="col-lg-12 col-md-12">
                    <div class="mb-5 w-25 mx-auto">
                      <input
                        type="text"
                        placeholder="Enter Code"
                        className={`${style.Input} mb-2`}
                        {...register2("otp", {
                          required: "OTP is required.",
                          pattern: {
                            value: /^\d+$/, // Regular expression to match only digits
                            message: "The entered value should be a number",
                          },
                        })}
                        disabled={codeFieldDisabled} // Disable if codeFieldDisabled is true
                      />
                      {errors2.otp && (
                        <p className="text-danger">{errors2.otp.message}</p>
                      )}
                    </div>
                  </div>
                  <div class="mb-5 w-50 mx-auto text-center">
                    <button
                      type="submit"
                      // onClick={handleVerifyOTP}
                      className={`m-2 btn fw-bold  text-center bg-white text-dark ${style.login_btn}`}
                      disabled={codeFieldDisabled} // Disable if codeFieldDisabled is true
                    >
                      {Verifyloading ? (
                        <>
                          <div class="spinner-border text-black" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </>
                      ) : (
                        "Verify Code"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
