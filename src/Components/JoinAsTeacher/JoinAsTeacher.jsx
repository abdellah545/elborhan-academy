import React, { useState, useRef, useEffect } from "react";
import Footer from "../footer/footer";
import style from "./JoinAsTeacher.module.css";
import layerImage from "./Form-Assets/Layer 37.png";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Languages } from "./Data";
import Swal from "sweetalert2";
import axios from "axios";
import baseURL from "../../BaseURL/BaseURL";

const animatedComponents = makeAnimated();

const GenderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

const LevelOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

const GradeOptions = [
  { value: "A_Plus", label: "A+" },
  { value: "A", label: "A" },
  { value: "A_Minus", label: "A-" },
  { value: "B_Plus", label: "B+" },
  { value: "B", label: "B" },
  { value: "C_Plus", label: "C+" },
  { value: "C", label: "C" },
];

const JobTypeOptions = [
  { value: "Part_Time", label: "Part Time" },
  { value: "Full_Time", label: "Full Time" },
];

const AvailableTimeOptions = [
  { value: "Morning", label: "Morning" },
  { value: "Night", label: "Night" },
];

const PreferredAgeOptions = [
  { value: "From_5to10", label: "5-10" },
  { value: "From_11to20", label: "11-20" },
  { value: "From_21toBigger", label: "21 or above" },
];

const HearAboutUsOptions = [
  { value: "Search_Engine", label: "Search Engine" },
  { value: "Social_Media", label: "Social Media" },
  { value: "Recommended_By_Friend", label: "Recommended By Friend" },
  { value: "Blog", label: "Blog" },
  { value: "Other", label: "Other" },
];

export default function JoinAsTeacher() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [languageLevels, setLanguageLevels] = useState({});
  const [ijazahEnabled, setIjazahEnabled] = useState(false);
  const [ijazah, setIjazah] = useState("");
  const ijazahRef = useRef();
  const [loading, setLoading] = useState(false);

  // Theme-aware styles for React-Select
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

  const handleLanguageChange = (selectedOptions) => {
    setValue("languages", selectedOptions);

    const newLevels = selectedOptions.reduce((acc, lang) => {
      acc[lang.value] = "";
      return acc;
    }, {});

    const updatedLevels = { ...languageLevels };
    Object.keys(languageLevels).forEach((language) => {
      if (!selectedOptions.find((option) => option.value === language)) {
        delete updatedLevels[language];
      }
    });

    setLanguageLevels({ ...updatedLevels, ...newLevels });
  };

  const handleLevelChange = (level, language) => {
    setLanguageLevels({
      ...languageLevels,
      [language]: level,
    });
  };

  const handleIjazahChange = (e) => {
    const value = e.target.value;
    setIjazahEnabled(value === "yes");
    if (value === "no") {
      setIjazah("");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const languagesWithLevels = data.languages.map((lang) => ({
      languageName: lang.label,
      languageLevel: languageLevels[lang.value],
    }));

    const formData = new FormData();
    formData.append("FirstName", data.firstName);
    formData.append("LastName", data.lastName);
    formData.append("Email", data.email);
    formData.append("WhatsAppNumber", data.whatsAppNumber);
    formData.append("Age", data.age);
    formData.append("Gender", data.gender);
    formData.append("ListOfLanguagesDto", JSON.stringify(languagesWithLevels));
    formData.append("Grade", data.grade);
    formData.append("JobType", data.jobType);
    formData.append("EductionField", data.educationField);
    formData.append("AnotherJob", data.anotherJob);
    formData.append("AvailableTime", data.availableTime);
    formData.append("YearsOfExperience", data.yearsOfExperience);
    formData.append("IsGraduated", JSON.parse(data.isGraduated));
    formData.append("PreferredAgeToTeach", data.preferredAgeToTeach);
    formData.append("HearAboutUs", data.hearAboutUs);
    formData.append("CvFile", data.cvFile[0]);
    formData.append("DemoVideoFile", data.demoVideoFile[0]);

    if (ijazahEnabled && data.ijazahFile.length > 0) {
      formData.append("IjazahFile", data.ijazahFile[0]);
    }

    try {
      const res = await axios.post(`${baseURL}/api/BeTeacher/AddBeTeacher`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        Swal.fire({
          title: "Congratulations!",
          text: "Your application has been sent successfully!, Please wait for approval",
          icon: "success",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something wrong in your application. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <header className={`${style.joinHeader} mt-5`}>
            <div className={style.imageWrapper}>
              <img
                src={layerImage}
                className={style.teacherImage}
                alt="Join Us"
              />
            </div>
            <div className="desc">
              <h1 className="fw-bold display-4 mb-3">Join Us As a Teacher</h1>
              <p className="fs-5 text-muted">
                Ready to inspire and educate? join our community <br /> as a
                teacher! Fill out the form below to get started. <br />
                Let’s shape the future together.
              </p>
            </div>
          </header>
        </div>
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
                        placeholder="e.g. John"
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
                        placeholder="e.g. Doe"
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
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Please enter a valid email address",
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
                      <label htmlFor="whatsAppNumber" className={style.formLabel}>Whatsapp Number</label>
                      <input
                        type="text"
                        className={`form-control ${style.formInput}`}
                        id="whatsAppNumber"
                        placeholder="+1 234 567 890"
                        {...register("whatsAppNumber", {
                          required: "Phone number is required",
                          minLength: {
                            value: 7,
                            message: "Phone number should be at least 7 digits",
                          },
                          maxLength: {
                            value: 15,
                            message: "Phone number should be at most 15 digits",
                          },
                          pattern: {
                            value: /^(?!0+$)\d+$/,
                            message:
                              "Phone number should not be all zeros and must be digits",
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
                    <div className="row">
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group mb-4">
                          <label htmlFor="age" className={style.formLabel}>Age</label>
                          <input
                            type="text"
                            className={`form-control ${style.formInput}`}
                            id="age"
                            placeholder="Age"
                            maxLength={3}
                            {...register("age", {
                              required: "Age is required",
                              pattern: {
                                value: /^(?!0+$)\d{1,3}$/,
                                message:
                                  "Age should be a valid number",
                              },
                            })}
                          />
                          {errors.age && (
                            <p className="text-danger mt-1 small">{errors.age.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-12">
                        <div className="form-group mb-4">
                          <label htmlFor="gender" className={style.formLabel}>Gender</label>
                          <Controller
                            name="gender"
                            control={control}
                            rules={{ required: "Please select a gender" }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                inputId="gender"
                                options={GenderOptions}
                                placeholder="Select Gender"
                                styles={comboStyles}
                                onChange={(val) => field.onChange(val.value)}
                                value={GenderOptions.find(opt => opt.value === field.value)}
                              />
                            )}
                          />
                          {errors.gender && (
                            <p className="text-danger mt-1 small">
                              {errors.gender.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>Languages</label>
                      <Controller
                        name="languages"
                        control={control}
                        rules={{
                          required: "You should at least choose one language",
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            closeMenuOnSelect={false}
                            placeholder="Select Languages"
                            isMulti
                            options={Languages}
                            onChange={handleLanguageChange}
                            styles={comboStyles}
                          />
                        )}
                      />
                      {errors.languages && (
                        <p className="text-danger mt-1 small">
                          {errors.languages.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {Object.keys(languageLevels).map((language) => (
                    <div className="col-lg-6 col-md-12 mb-4" key={language}>
                      <div className="form-group mb-4">
                        <label className={style.formLabel}>{language} Level</label>
                        <Controller
                          name={language}
                          control={control}
                          rules={{ required: "Level is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={LevelOptions}
                              placeholder="Select Level"
                              styles={comboStyles}
                              onChange={(val) => {
                                field.onChange(val.value);
                                handleLevelChange(val.value, language);
                              }}
                              value={LevelOptions.find(opt => opt.value === field.value) || LevelOptions.find(opt => opt.value === languageLevels[language])}
                            />
                          )}
                        />
                        {errors[language] && (
                          <p className="text-danger mt-1 small">
                            {errors[language].message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="col-lg-6 col-md-12">
                    <div className="row align-items-end">
                      <div className="col-lg-4 col-md-6 mb-4">
                        <div className={style.formLabel}>Ijazah:</div>
                        <div className="d-flex gap-3 mt-2">
                          <div className="form-check">
                            <input
                              type="radio"
                              id="ijazah-yes"
                              className="form-check-input"
                              name="ijazah"
                              value="yes"
                              onChange={handleIjazahChange}
                            />
                            <label
                              htmlFor="ijazah-yes"
                              className="form-check-label"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              id="ijazah-no"
                              className="form-check-input"
                              name="ijazah"
                              value="no"
                              onChange={handleIjazahChange}
                              defaultChecked
                            />
                            <label htmlFor="ijazah-no" className="form-check-label">No</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-12">
                        <div className="form-group mb-4">
                          <label htmlFor="ijazahFile" className={style.formLabel}>Ijazah File</label>
                          <input
                            type="file"
                            accept=".pdf, .docx, .png, .jpeg, .jpg"
                            className={`form-control ${style.formInput}`}
                            id="ijazahFile"
                            disabled={!ijazahEnabled}
                            {...register("ijazahFile", {
                              required: ijazahEnabled
                                ? "Ijazah file is required"
                                : false,
                            })}
                          />
                          {errors.ijazahFile && (
                            <p className="text-danger mt-1 small">
                              {errors.ijazahFile.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group mb-4">
                          <label className={style.formLabel}>Your Grade</label>
                          <Controller
                            name="grade"
                            control={control}
                            rules={{ required: "Grade is required" }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={GradeOptions}
                                placeholder="Select Your Grade"
                                styles={comboStyles}
                                onChange={(val) => field.onChange(val.value)}
                                value={GradeOptions.find(opt => opt.value === field.value)}
                              />
                            )}
                          />
                          {errors.grade && (
                            <p className="text-danger mt-1 small">
                              {errors.grade.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group mb-4">
                          <label className={style.formLabel}>Job Type</label>
                          <Controller
                            name="jobType"
                            control={control}
                            rules={{ required: "Job type is required" }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={JobTypeOptions}
                                placeholder="Select Job Type"
                                styles={comboStyles}
                                onChange={(val) => field.onChange(val.value)}
                                value={JobTypeOptions.find(opt => opt.value === field.value)}
                              />
                            )}
                          />
                          {errors.jobType && (
                            <p className="text-danger mt-1 small">
                              {errors.jobType.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group mb-4">
                      <label htmlFor="educationField" className={style.formLabel}>Education Field</label>
                      <input
                        type="text"
                        className={`form-control ${style.formInput}`}
                        id="educationField"
                        placeholder="e.g. Islamic Studies"
                        {...register("educationField", {
                          required: "Please enter your education field",
                        })}
                      />
                      {errors.educationField && (
                        <p className="text-danger mt-1 small">
                          {errors.educationField.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label htmlFor="anotherJob" className={style.formLabel}>Another job? Where?</label>
                      <input
                        type="text"
                        className={`form-control ${style.formInput}`}
                        id="anotherJob"
                        placeholder="Current occupation..."
                        {...register("anotherJob", {
                          required:
                            "Please specify if you have another job and where",
                        })}
                      />
                      {errors.anotherJob && (
                        <p className="text-danger mt-1 small">
                          {errors.anotherJob.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>Available Time</label>
                      <Controller
                        name="availableTime"
                        control={control}
                        rules={{ required: "Available time is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={AvailableTimeOptions}
                            placeholder="Select Available Time"
                            styles={comboStyles}
                            onChange={(val) => field.onChange(val.value)}
                            value={AvailableTimeOptions.find(opt => opt.value === field.value)}
                          />
                        )}
                      />
                      {errors.availableTime && (
                        <p className="text-danger mt-1 small">
                          {errors.availableTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group mb-4">
                          <label htmlFor="yearsOfExperience" className={style.formLabel}>Years of Experience</label>
                          <input
                            type="number"
                            className={`form-control ${style.formInput}`}
                            id="yearsOfExperience"
                            placeholder="0"
                            min={0}
                            {...register("yearsOfExperience", {
                              required: "Please enter your years of experience",
                            })}
                          />
                          {errors.yearsOfExperience && (
                            <p className="text-danger mt-1 small">
                              {errors.yearsOfExperience.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className={style.formLabel}>Education Status:</div>
                        <div className="d-flex gap-3 mt-2">
                          <div className="form-check">
                            <input
                              type="radio"
                              id="graduated"
                              className="form-check-input"
                              name="educationStatus"
                              value="true"
                              {...register("isGraduated", {
                                required: "Education status is required",
                              })}
                            />
                            <label
                              htmlFor="graduated"
                              className="form-check-label"
                            >
                              Graduated
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              id="student"
                              className="form-check-input"
                              name="educationStatus"
                              value="false"
                              {...register("isGraduated", {
                                required: "Education status is required",
                              })}
                            />
                            <label htmlFor="student" className="form-check-label">Student</label>
                          </div>
                        </div>
                        {errors.isGraduated && (
                          <p className="text-danger mt-1 small">
                            {errors.isGraduated.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>Preferred age group</label>
                      <Controller
                        name="preferredAgeToTeach"
                        control={control}
                        rules={{ required: "Preferred age group is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={PreferredAgeOptions}
                            placeholder="Choose a group"
                            styles={comboStyles}
                            onChange={(val) => field.onChange(val.value)}
                            value={PreferredAgeOptions.find(opt => opt.value === field.value)}
                          />
                        )}
                      />
                      {errors.preferredAgeToTeach && (
                        <p className="text-danger mt-1 small">
                          {errors.preferredAgeToTeach.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className={style.videoSection}>
                      <h3 className="fw-bold mb-3">Video Demo Requirements:</h3>
                      <p className="fs-5 mb-4 opacity-75">
                        1. Explanation of "Al-Sukun" in your language and Arabic. <br/>
                        2. Explanation of performing Salah in your language and Arabic. <br/>
                        3. Reading the first 5 verses of "Sura Younes".
                      </p>
                      <div className="form-group mb-0">
                        <label htmlFor="demoVideoFile" className={style.formLabel}>Upload your demo video</label>
                        <input
                          type="file"
                          accept="video/mp4, video/mov, video/avi, video/mkv, video/m4v"
                          className={`form-control ${style.formInput}`}
                          id="demoVideoFile"
                          {...register("demoVideoFile", {
                            required: "Video file is required",
                            validate: {
                              maxFileSize: (value) => {
                                if (value && value.length > 0) {
                                  return value[0].size <= 52428800 || "File size should be less than 50MB";
                                }
                                return true;
                              },
                            },
                          })}
                        />
                        {errors.demoVideoFile && (
                          <p className="text-danger mt-2 small">
                            {errors.demoVideoFile.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label htmlFor="cvFile" className={style.formLabel}>Upload your CV</label>
                      <input
                        type="file"
                        accept=".pdf, .docx, .png, .jpeg, .jpg"
                        className={`form-control ${style.formInput}`}
                        id="cvFile"
                        {...register("cvFile", {
                          required: "CV file is required",
                          validate: {
                            maxFileSize: (value) => {
                              if (value && value.length > 0) {
                                return value[0].size <= 52428800 || "File size should be less than 50MB";
                              }
                              return true;
                            },
                          },
                        })}
                      />
                      {errors.cvFile && (
                        <p className="text-danger mt-1 small">{errors.cvFile.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mb-4">
                      <label className={style.formLabel}>How did you hear about us?</label>
                      <Controller
                        name="hearAboutUs"
                        control={control}
                        rules={{ required: "Please select an option" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={HearAboutUsOptions}
                            placeholder="Select an option"
                            styles={comboStyles}
                            onChange={(val) => field.onChange(val.value)}
                            value={HearAboutUsOptions.find(opt => opt.value === field.value)}
                          />
                        )}
                      />
                      {errors.hearAboutUs && (
                        <p className="text-danger mt-1 small">
                          {errors.hearAboutUs.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 text-center mt-4">
                    <button
                      type="submit"
                      className={style.submitBtn}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="d-flex align-items-center justify-content-center gap-2">
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Processing...
                        </span>
                      ) : (
                        "Submit Application"
                      )}
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
