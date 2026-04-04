import React, { useEffect, useState } from "react";
import imgFreeTrial from "./Assets/Frame 1.png";
import { useForm, Controller } from "react-hook-form";
import style from "./FreeTrial.module.css";
import Footer from "../footer/footer";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
import {
  CountryOptions,
  TimezoneOptions,
  PreferredDays,
  PreferredTimes,
} from "./data";
import axios from "axios";
import baseURL from "../../BaseURL/BaseURL";

const animatedComponents = makeAnimated();

const GenderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

export default function FreeTrial() {
  const [coursesData, setCoursesData] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

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

  const comboStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (base, state) => ({
      ...base,
      backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "var(--bg-main)",
      borderColor: "var(--border-color)",
      borderWidth: "2px",
      borderRadius: "12px",
      minHeight: "52px",
      boxShadow: state.isFocused ? "0 0 0 4px rgba(0, 123, 255, 0.1)" : "none",
      "&:hover": {
        borderColor: "var(--accent-color)"
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--card-bg)",
      zIndex: "99",
      borderRadius: "12px",
      border: "1px solid var(--border-color)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "var(--btn-light-bg)" : "transparent",
      color: "var(--text-main)",
      "&:active": {
        backgroundColor: "var(--accent-color)",
        color: "white"
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--text-main)"
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "var(--btn-light-bg)",
      borderRadius: "6px"
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "var(--text-main)"
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "var(--text-muted)",
    }),
  };

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const groupBadgeStyles = {
    backgroundColor: isDark ? "#3f4055" : "#EBECF0",
    borderRadius: "2em",
    color: isDark ? "#ffffff" : "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span style={{ color: "var(--text-main)", fontWeight: "bold" }}>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/Course/GetAllCoursesGroupedByCategory`
        );
        const formattedData = response.data.map((category) => ({
          label: category.category,
          options: category.courses.map((course) => ({
            value: course.courseId,
            label: course.name,
          })),
        }));
        setCoursesData(formattedData);
      } catch (error) {

      }
    };

    fetchCourses();
  }, []);

  const onSubmit = async (data) => {
    data.coursesIds = data.selectedCourses;

    if (data.coursesIds && data.coursesIds.length > 0) {
      clearErrors("atLeastOneSelection");
    } else {
      setError("atLeastOneSelection", {
        type: "custom",
        message: "Please select at least one course",
      });
      return;
    }

    data.preferredDays = data.preferredDays
      ? data.preferredDays.map((day) => day.value).join(",")
      : "";
    data.PreferrdTime = data.preferredTimes
      ? data.preferredTimes.map((time) => time.value).join(",")
      : "";

    try {
      const response = await axios.post(
        `${baseURL}/FreeTrail/AddFreeTrail`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire(
        "Congratulations!",
        "Your free trial class has been scheduled!",
        "success"
      );
    } catch (err) {

      Swal.fire(
        "Error!",
        err.response?.data?.message || "An error occurred",
        "error"
      );
    }
  };

  return (
    <>
      <section className={style.topSection}>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center w-100">
            <div className={style.imageWrapper}>
              <img
                src={imgFreeTrial}
                className={style.freeTrialImage}
                alt="Free Trial"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className={`${style.formContainer} col-lg-10`}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label htmlFor="firstName" className={style.formLabel}>First Name</label>
                      <input
                        type="text"
                        className={`form-control ${style.formInput}`}
                        id="firstName"
                        placeholder="John"
                        {...register("firstName", {
                          required: "First Name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "First Name should not contain spaces",
                          },
                        })}
                      />
                      {errors.firstName && (
                        <p className="text-danger mt-1 small">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label htmlFor="lastName" className={style.formLabel}>Last Name</label>
                      <input
                        type="text"
                        className={`form-control ${style.formInput}`}
                        id="lastName"
                        placeholder="Doe"
                        {...register("lastName", {
                          required: "Last Name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "Last Name should not contain spaces",
                          },
                        })}
                      />
                      {errors.lastName && (
                        <p className="text-danger mt-1 small">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label htmlFor="email" className={style.formLabel}>Email Address</label>
                      <input
                        type="text"
                        className={`form-control ${style.formInput}`}
                        id="email"
                        placeholder="email@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-danger mt-1 small">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label htmlFor="whatsAppNumber" className={style.formLabel}>WhatsApp Number</label>
                      <input
                        type="text"
                        className={`form-control ${style.formInput}`}
                        id="whatsAppNumber"
                        placeholder="+1 234 567 890"
                        {...register("whatsAppNumber", {
                          required: {
                            value: true,
                            message: "Phone number is required",
                          },
                          minLength: {
                            value: 7,
                            message: "Phone number should be at least 7 digits",
                          },
                          maxLength: {
                            value: 15,
                            message:
                              "Phone number should be less than 15 digits",
                          },
                          pattern: {
                            value: /^(?!0+$)\d{7,15}$/,
                            message: "Phone number should not be all zeros",
                          },
                        })}
                      />
                      {errors.whatsAppNumber && (
                        <p className="text-danger mt-1 small">
                          {errors.whatsAppNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>Select Country</label>
                      <Controller
                        name="Country"
                        control={control}
                        rules={{ required: "Country is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable
                            placeholder="Select Country"
                            options={CountryOptions}
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption.value)
                            }
                            onBlur={field.onBlur}
                            value={CountryOptions.find(
                              (option) => option.value === field.value
                            )}
                            styles={comboStyles}
                          />
                        )}
                      />
                      {errors.Country && (
                        <p className="text-danger mt-1 small">{errors.Country.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>Timezone</label>
                      <Controller
                        name="timezone"
                        control={control}
                        rules={{ required: "Choose your timezone" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable
                            placeholder="Timezone"
                            options={TimezoneOptions}
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption.value)
                            }
                            value={TimezoneOptions.find(
                              (option) => option.value === field.value
                            )}
                            styles={comboStyles}
                          />
                        )}
                      />
                      {errors.timezone && (
                        <p className="text-danger mt-1 small">{errors.timezone.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>Select Courses</label>
                      <Controller
                        name="selectedCourses"
                        control={control}
                        rules={{
                          required: "You should at least choose one course",
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            placeholder="Select Courses"
                            isMulti
                            options={coursesData}
                            formatGroupLabel={formatGroupLabel}
                            onChange={(selectedOptions) => {
                              clearErrors("atLeastOneSelection");
                              field.onChange(
                                selectedOptions.map((option) => option.value)
                              );
                            }}
                            value={(field.value || []).map((val) => ({
                              value: val,
                              label:
                                coursesData
                                  .flatMap((group) => group.options)
                                  .find((option) => option.value === val)
                                  ?.label || "N/A",
                            }))}
                            components={animatedComponents}
                            styles={comboStyles}
                          />
                        )}
                      />
                      {errors.selectedCourses && (
                        <p className="text-danger mt-1 small">
                          {errors.selectedCourses.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>Preferred Days</label>
                      <Controller
                        name="preferredDays"
                        control={control}
                        rules={{ required: "Please select at least one day." }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            closeMenuOnSelect={false}
                            placeholder="Preferred Days"
                            isMulti
                            options={PreferredDays}
                            styles={comboStyles}
                          />
                        )}
                      />
                      {errors.preferredDays && (
                        <p className="text-danger mt-1 small">
                          {errors.preferredDays.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>Preferred Times</label>
                      <Controller
                        name="preferredTimes"
                        control={control}
                        rules={{
                          required: "Please determine at least one time.",
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isSearchable
                            closeMenuOnSelect={false}
                            placeholder="Preferred Times"
                            components={animatedComponents}
                            isMulti
                            options={PreferredTimes}
                            styles={comboStyles}
                          />
                        )}
                      />
                      {errors.preferredTimes && (
                        <p className="text-danger mt-1 small">
                          {errors.preferredTimes.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>Student Gender</label>
                      <Controller
                        name="studentGender"
                        control={control}
                        rules={{ required: "Student Gender is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={GenderOptions}
                            placeholder="Select Gender"
                            styles={comboStyles}
                            onChange={(val) => field.onChange(val.value)}
                            value={GenderOptions.find(opt => opt.value === field.value)}
                          />
                        )}
                      />
                      {errors.studentGender && (
                        <p className="text-danger mt-1 small">
                          {errors.studentGender.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-group mb-4">
                      <label htmlFor="studentAge" className={style.formLabel}>Student Age</label>
                      <input
                        type="number"
                        className={`form-control ${style.formInput}`}
                        id="studentAge"
                        placeholder="Age"
                        {...register("studentAge", {
                          required: "Student Age is required",
                          min: {
                            value: 5,
                            message: "Age must be at least 5",
                          },
                          max: {
                            value: 99,
                            message: "Age must be less than 100",
                          },
                        })}
                      />
                      {errors.studentAge && (
                        <p className="text-danger mt-1 small">
                          {errors.studentAge.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>Teacher Gender</label>
                      <Controller
                        name="teacherGender"
                        control={control}
                        rules={{ required: "Teacher Gender is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={GenderOptions}
                            placeholder="Select Gender"
                            styles={comboStyles}
                            onChange={(val) => field.onChange(val.value)}
                            value={GenderOptions.find(opt => opt.value === field.value)}
                          />
                        )}
                      />
                      {errors.teacherGender && (
                        <p className="text-danger mt-1 small">
                          {errors.teacherGender.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group mb-4">
                      <label htmlFor="comment" className={style.formLabel}>Learning Goals</label>
                      <textarea
                        className={`form-control ${style.formInput} ${style.textarea}`}
                        id="comment"
                        rows="6"
                        placeholder="Share your learning goals with us..."
                        {...register("comment", {
                          required: "A comment is required",
                        })}
                      ></textarea>
                      {errors.comment && (
                        <p className="text-danger mt-1 small">{errors.comment.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 text-center mt-4">
                    <button
                      type="submit"
                      className={style.submitBtn}
                    >
                      Get your free trial
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

