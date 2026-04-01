// import React, { useState } from "react";
// import style from "./UpdateProfile.module.css";
// import { CountryOptions, TimezoneOptions } from "./newData";
// import Select from "react-select";
// import { Link } from "react-router-dom";
// import Footer from "../footer/footer";
// import axiosinterceptor from "../../authComponent/axiosinterceptor";
// import Swal from "sweetalert2";
// import baseURL from "../../BaseURL/BaseURL";
// import { setCookie } from "../../Helper/CookieHelper";

// export default function UpdateProfile() {
//   const [fullname, setFullname] = useState();
//   const [whatsAppNumber, setWhatsAppNumber] = useState();
//   const [country, setCountry] = useState();
//   const [timezone, setTimezone] = useState();
//   const [password, setPassword] = useState();
//   const [loading, setLoading] = useState(false);

//   const handleUpdateProfile = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = axiosinterceptor.put(
//         `${baseURL}/Family/EditProfile`,
//         {
//           familyName: fullname,
//           whatsAppNumber: whatsAppNumber,
//           country: country,
//           timezone: timezone,
//           currentPassword: password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Profile updated successfully",
//         showConfirmButton: true,
//         timer: 3000,
//       });
//       setLoading(false);
//       setCookie("Full_Name", fullname);
//       setTimeout(() => {
//         window.location.reload();
//         window.location.pathname = "/FamilyDashboard/profile";
//       }, 4000);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       <div className={`container ${style.Container}`}>
//         <div className="row py-5 justify-content-center">
//           <div className="container">
//             <div
//               className={`parent p-4 ${style.cardBorder} ${style.parent_width}`}
//             >
//               <div className="child mt-3">
//                 <br />
//                 <form onSubmit={handleUpdateProfile}>
//                   <h1
//                     className={`text-center fw-bold text-decoration-underline ${style.font_size}`}
//                   >
//                     Update Profile
//                   </h1>
//                   <h6 className="text-center fw-bold">xxxxxxxxxx@gmail.com</h6>
//                   <br />
//                   <div className="row">
//                     <div className="col-lg-6 col-md-12">
//                       <div class="form-floating mb-3">
//                         <input
//                           type="text"
//                           class="form-control"
//                           id="floatingInput"
//                           placeholder="Full Name"
//                           required
//                           onChange={(e) => setFullname(e.target.value)}
//                         />
//                         <label htmlFor="floatingInput">Full Name</label>
//                       </div>
//                     </div>
//                     <div className="col-lg-6 col-md-12">
//                       <div class="form-floating mb-3">
//                         <input
//                           type="text"
//                           class="form-control"
//                           id="floatingInput"
//                           placeholder="Whatsapp Number"
//                           required
//                           onChange={(e) => setWhatsAppNumber(e.target.value)}
//                         />
//                         <label htmlFor="floatingInput">Whatsapp Number</label>
//                       </div>
//                     </div>
//                     <div className="col-lg-6 col-md-12">
//                       <div className="form-floating mb-3">
//                         <Select
//                           isSearchable
//                           placeholder="Country"
//                           options={CountryOptions}
//                           onChange={(selectedOption) =>
//                             setCountry(selectedOption.value)
//                           }
//                           value={CountryOptions.find(
//                             (option) => option.value === country
//                           )}
//                           styles={{
//                             menu: (provided) => ({
//                               ...provided,
//                               width: "100%",
//                               zIndex: "99",
//                             }),
//                             placeholder: (styles) => ({
//                               ...styles,
//                               color: "black",
//                             }),
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-6 col-md-12">
//                       <Select
//                         isSearchable
//                         placeholder="Timezone"
//                         options={TimezoneOptions}
//                         onChange={(selectedOption) =>
//                           setTimezone(selectedOption.value)
//                         }
//                         value={TimezoneOptions.find(
//                           (option) => option.value === timezone
//                         )}
//                         styles={{
//                           container: (provided) => ({
//                             ...provided,
//                             width: "100%",
//                             marginBottom: "15px",
//                           }),
//                           menu: (provided) => ({
//                             ...provided,
//                             width: "100%",
//                             zIndex: "99",
//                           }),
//                           placeholder: (styles) => ({
//                             ...styles,
//                             color: "black",
//                           }),
//                         }}
//                       />
//                     </div>
//                     <div className="col-lg-6 col-md-12">
//                       <div class="form-floating mb-3">
//                         <input
//                           type="password"
//                           class="form-control"
//                           id="floatingInput"
//                           placeholder="Your Password"
//                           required
//                           onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <label htmlFor="floatingInput">Your Password</label>
//                       </div>
//                     </div>
//                     <div className="col-lg-6 col-md-12">
//                       <div class="form-floating mb-3">
//                         <button
//                           type="submit"
//                           className="btn btn-white btn-lg btn-block border border-2 border-dark fw-bold rounded w-100 py-2"
//                         >
//                           {loading ? (
//                             <>
//                               <div
//                                 class="spinner-border text-dark"
//                                 role="status"
//                               >
//                                 <span class="visually-hidden">Loading...</span>
//                               </div>
//                             </>
//                           ) : (
//                             "Confirm Changes"
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <hr />
//                 </form>
//                 <div className="buttons text-center">
//                   <div
//                     class="btn-group gap-1"
//                     role="group"
//                     aria-label="Basic example"
//                   >
//                     <Link
//                       to="/FamilyDashboard/profile"
//                       type="button"
//                       class="btn btn-dark"
//                     >
//                       Profile
//                     </Link>
//                     <Link
//                       to="/FamilyDashboard/updateProfile"
//                       type="button"
//                       class="btn btn-dark"
//                     >
//                       Update Profile
//                     </Link>
//                     <Link
//                       to="/FamilyDashboard/ChangePassword"
//                       type="button"
//                       class="btn btn-dark"
//                     >
//                       Change Password
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// ========================================= New Validation using react hook form ======================================

import React, { useState } from "react";
import style from "./UpdateProfile.module.css";
import { CountryOptions, TimezoneOptions } from "./newData";
import Select from "react-select";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import Swal from "sweetalert2";
import baseURL from "../../BaseURL/BaseURL";
import { setCookie } from "../../Helper/CookieHelper";
import { useForm, Controller } from "react-hook-form";

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const countryComboboxStyle = {
    menu: (provided) => ({
      ...provided,
      width: "100%",
      zIndex: "99",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "black",
    }),
  };

  const TimezoneComboboxStyle = {
    container: (provided) => ({
      ...provided,
      width: "100%",
      marginBottom: "15px",
    }),
    menu: (provided) => ({
      ...provided,
      width: "100%",
      zIndex: "99",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "black",
    }),
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = axiosinterceptor.put(`${baseURL}/Family/EditProfile`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile updated successfully",
        showConfirmButton: true,
        timer: 3000,
      });
      setLoading(false);
      setCookie("Full_Name", data.fullname);
      setTimeout(() => {
        window.location.reload();
        window.location.pathname = "/FamilyDashboard/profile";
      }, 4000);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <>

      <div className={`container ${style.Container}`}>
        <div className="row py-5 justify-content-center">
          <div className="container">
            <div
              className={`parent p-4 ${style.cardBorder} ${style.parent_width}`}
            >
              <div className="child mt-3">
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1
                    className={`text-center fw-bold text-decoration-underline ${style.font_size}`}
                  >
                    Update Profile
                  </h1>
                  <h6 className="text-center fw-bold">xxxxxxxxxx@gmail.com</h6>
                  <br />
                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <div class="form-floating mb-3">

                        <input
                          type="text"
                          class="form-control"
                          id="floatingInput"
                          placeholder="Full Name"
                          required
                          {...register("familyName", {
                            required: "Full name is required",
                          })}
                        />
                        <label htmlFor="floatingInput">Full Name</label>
                        {errors.familyName && (
                          <p className="text-danger">
                            {errors.familyName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          class="form-control"
                          id="floatingInput"
                          placeholder="Whatsapp Number"
                          {...register("whatsAppNumber", {
                            required: {
                              value: true,
                              message: "phone number is required",
                            },
                            minLength: {
                              value: 11,
                              message: "phone number should be 11 digits",
                            },
                            maxLength: {
                              value: 11,
                              message: "phone number should be 11 digits",
                            },
                            pattern: {
                              value: /^\d+$/, // Regular expression to match only digits
                              message: "The entered value should be a number",
                            },
                          })}
                        />
                        <label htmlFor="floatingInput">Whatsapp Number</label>
                        {errors.whatsAppNumber && (
                          <p className="text-danger">
                            {errors.whatsAppNumber.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-floating mb-3">
                        <Controller
                          name="country"
                          control={control}
                          rules={{ required: "Country is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isSearchable
                              options={CountryOptions}
                              styles={countryComboboxStyle}
                              onChange={(selectedOption) =>
                                field.onChange(selectedOption.value)
                              }
                              onBlur={field.onBlur}
                              value={CountryOptions.find(
                                (option) => option.value === field.value
                              )}
                            />
                          )}
                        />
                        {errors.country && (
                          <p className="text-danger">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <Controller
                        name="timezone"
                        control={control}
                        rules={{ required: "Timezone is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable
                            options={TimezoneOptions}
                            styles={TimezoneComboboxStyle}
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption.value)
                            }
                            onBlur={field.onBlur}
                            value={TimezoneOptions.find(
                              (option) => option.value === field.value
                            )}
                          />
                        )}
                      />
                      {errors.timezone && (
                        <p className="text-danger">{errors.timezone.message}</p>
                      )}
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingInput"
                          placeholder="Your Password"
                          {...register("currentPassword", {
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
                        <label htmlFor="floatingInput">Your Password</label>
                        {errors.currentPassword && <p className="text-danger">{errors.currentPassword.message}</p>}

                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div class="form-floating mb-3">
                        <button
                          type="submit"
                          className="btn btn-white btn-lg btn-block border border-2 border-dark fw-bold rounded w-100 py-2"
                        >
                          {loading ? (
                            <>
                              <div
                                class="spinner-border text-dark"
                                role="status"
                              >
                                <span class="visually-hidden">Loading...</span>
                              </div>
                            </>
                          ) : (
                            "Confirm Changes"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </form>
                <div className="buttons text-center">
                  <div
                    class="btn-group gap-1"
                    role="group"
                    aria-label="Basic example"
                  >
                    <Link
                      to="/FamilyDashboard/profile"
                      type="button"
                      class="btn btn-dark"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/FamilyDashboard/updateProfile"
                      type="button"
                      class="btn btn-dark"
                    >
                      Update Profile
                    </Link>
                    <Link
                      to="/FamilyDashboard/ChangePassword"
                      type="button"
                      class="btn btn-dark"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
