// import React, { useState } from "react";
// import style from "./ChangePassword.module.css";
// import { Link } from "react-router-dom";
// import axiosinterceptor from "../../authComponent/axiosinterceptor";
// import Swal from "sweetalert2";
// import ReactPasswordChecklist from "react-password-checklist";
// import baseURL from "../../BaseURL/BaseURL";

// export default function ChangePassword() {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axiosinterceptor.put(
//         `${baseURL}/Authentication/ChangePassword`,
//         {
//           oldPassword: currentPassword,
//           newPassword: newPassword,
//           confirmNewPassword: confirmPassword,
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
//           title: "Password changed successfully",
//           showConfirmButton: false,
//           timer: 7000,
//         });

//         console.log(res.data);
//         setLoading(false);
//         window.location.pathname = "/FamilyDashboard";
//       }
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
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
//                 <form onSubmit={handleChangePassword}>
//                   <h1 className="text-center text-light fw-bold text-decoration-underline mb-5">
//                     Change Password
//                   </h1>
//                   <div className="row">
//                     <div className="col-lg-12 col-md-12">
//                       <div class="mb-5 w-50 mx-auto">
//                         <input
//                           type="password"
//                           placeholder="Current Password"
//                           className={`${style.Input}`}
//                           onChange={(e) => setCurrentPassword(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-12 col-md-12">
//                       <div class="mb-5 w-50 mx-auto">
//                         <input
//                           type="password"
//                           placeholder="New Password"
//                           className={`${style.Input}`}
//                           onChange={(e) => setNewPassword(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-12 col-md-12">
//                       <div class="mb-5 w-50 mx-auto">
//                         <input
//                           type="password"
//                           placeholder="Confirm Password"
//                           className={`${style.Input} mb-2`}
//                           onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                         {newPassword && (
//                           <ReactPasswordChecklist
//                             rules={[
//                               "minLength",
//                               "specialChar",
//                               "number",
//                               "capital",
//                               "match",
//                             ]}
//                             minLength={5}
//                             value={newPassword}
//                             valueAgain={confirmPassword}
//                             feedbackIcons={false}
//                             className="text-white"
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div class="mb-5 w-50 mx-auto text-center">
//                     <button
//                       type="submit"
//                       className={`m-4 btn fw-bold  text-center bg-white text-dark ${style.login_btn}`}
//                     >
//                       {loading ? (
//                         <>
//                           <div class="spinner-border text-black" role="status">
//                             <span class="visually-hidden">Loading...</span>
//                           </div>
//                         </>
//                       ) : (
//                         "Change Password"
//                       )}
//                     </button>
//                     <Link to="/reset-password" className="text-white">
//                       Forgot Password ?
//                     </Link>
//                   </div>
//                 </form>
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
import style from "./ChangePassword.module.css";
import { Link } from "react-router-dom";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import Swal from "sweetalert2";
import baseURL from "../../BaseURL/BaseURL";
import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("newPassword");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axiosinterceptor.put(
        `${baseURL}/Authentication/ChangePassword`,
        data,
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
          title: "Password changed successfully",
          showConfirmButton: false,
          timer: 7000,
        });

        console.log(res.data);
        setLoading(false);
        window.location.pathname = "/FamilyDashboard";
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1 className="text-center text-light fw-bold text-decoration-underline mb-5">
                    Change Password
                  </h1>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div class="mb-5 w-50 mx-auto">
                        <input
                          {...register("oldPassword", {
                            required: "Please write your old password.",
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
                          type="password"
                          placeholder="Current Password"
                          className={`${style.Input}`}
                        />
                        {errors.oldPassword && (
                          <p className="text-danger">
                            {errors.oldPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div class="mb-5 w-50 mx-auto">
                        <input
                          {...register("newPassword", {
                            required: "Write your new password.",
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
                          type="password"
                          placeholder="New Password"
                          className={`${style.Input}`}
                        />
                        {errors.newPassword && (
                          <p className="text-danger">
                            {errors.newPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div class="mb-5 w-50 mx-auto">
                        <input
                          {...register("confirmNewPassword", {
                            required: "Confirm your new password.",
                            validate: (value) =>
                              value === password || "Passwords should match",
                          })}
                          type="password"
                          placeholder="Confirm Password"
                          className={`${style.Input} mb-2`}
                        />
                        {errors.confirmNewPassword && (
                          <p className="text-danger">
                            {errors.confirmNewPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="mb-5 w-50 mx-auto text-center">
                    <button
                      type="submit"
                      className={`m-4 btn fw-bold  text-center bg-white text-dark ${style.login_btn}`}
                    >
                      {loading ? (
                        <>
                          <div class="spinner-border text-black" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </button>
                    <Link to="/reset-password" className="text-white">
                      Forgot Password ?
                    </Link>
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
