import React, { useState, useRef } from "react";
import Footer from "../footer/footer";
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

  const comboStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
      marginBottom: "11px",
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
          <header className="d-flex justify-content-center mt-5">
            <img
              src={layerImage}
              className="img-fluid align-items-md-center"
              alt=""
            />
            <div className="desc px-3">
              <h1 className="fw-bold">Join Us As a Teacher</h1>
              <p className="fs-5">
                Ready to inspire and educate? join our community <br /> as a
                teacher! Fill out the form below to get started. <br />
                Let’s shape the future together.
              </p>
            </div>
          </header>
        </div>
        <div className="container">
          <div className="row">
            <div className="form_container p-5 border shadow rounded mb-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        {...register("firstName", {
                          required: "First Name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "First Name should not contain spaces",
                          },
                        })}
                      />
                      {errors.firstName && (
                        <p className="text-danger">
                          {errors.firstName.message}
                        </p>
                      )}
                      <label htmlFor="firstName">First Name</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        {...register("lastName", {
                          required: "Last Name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "Last Name should not contain spaces",
                          },
                        })}
                      />
                      {errors.lastName && (
                        <p className="text-danger">{errors.lastName.message}</p>
                      )}
                      <label htmlFor="lastName">Last Name</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Please enter a valid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                      )}
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="whatsAppNumber"
                        placeholder="Whatsapp Number"
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
                        <p className="text-danger">
                          {errors.whatsAppNumber.message}
                        </p>
                      )}
                      <label htmlFor="whatsAppNumber">Whatsapp Number</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="row">
                      <div className="col-lg-3 col-md-12">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="age"
                            placeholder="Age"
                            maxLength={2}
                            {...register("age", {
                              required: "Age is required",
                              pattern: {
                                value: /^(?!0+$)\d{1,2}$/,
                                message:
                                  "Age should be a number between 1 and 99",
                              },
                            })}
                          />
                          {errors.age && (
                            <p className="text-danger">{errors.age.message}</p>
                          )}
                          <label htmlFor="age">Age</label>
                        </div>
                      </div>
                      <div className="col-lg-9 col-md-12">
                        <div className="form-floating mb-3">
                          <select
                            id="gender"
                            className="form-select"
                            {...register("gender", {
                              required: "Please select a gender",
                            })}
                          >
                            <option value="" disabled>
                              Select Gender
                            </option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                          </select>
                          {errors.gender && (
                            <p className="text-danger">
                              {errors.gender.message}
                            </p>
                          )}
                          <label htmlFor="gender">Gender</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
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
                        <p className="text-danger">
                          {errors.languages.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {Object.keys(languageLevels).map((language) => (
                    <div className="col-lg-6 col-md-12 mb-4" key={language}>
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="level"
                          {...register(language, {
                            required: "Level is required",
                          })}
                          value={languageLevels[language]}
                          onChange={(e) =>
                            handleLevelChange(e.target.value, language)
                          }
                        >
                          <option value="" disabled>
                            Select Level
                          </option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                        {errors[language] && (
                          <p className="text-danger">
                            {errors[language].message}
                          </p>
                        )}
                        <label htmlFor="level">{language} Level</label>
                      </div>
                    </div>
                  ))}
                  <div className="col-lg-6 col-md-12">
                    <div className="row">
                      <div className="col-lg-3 col-md-6">
                        <div>
                          <label htmlFor="ijazah">Ijazah:</label>
                        </div>
                        <input
                          type="radio"
                          id="ijazah-yes"
                          name="ijazah"
                          value="yes"
                          onChange={handleIjazahChange}
                        />
                        <label
                          htmlFor="ijazah-yes"
                          style={{ marginRight: "10px" }}
                        >
                          Yes
                        </label>
                        <input
                          type="radio"
                          id="ijazah-no"
                          name="ijazah"
                          value="no"
                          onChange={handleIjazahChange}
                        />
                        <label htmlFor="ijazah-no">No</label>
                      </div>
                      <div className="col-lg-9 col-md-12">
                        <div className="form-floating mb-3">
                          <input
                            type="file"
                            accept=".pdf, .docx, .png, .jpeg, .jpg"
                            className="form-control"
                            id="ijazahFile"
                            placeholder="Ijazah File"
                            disabled={!ijazahEnabled}
                            onChange={(e) => setIjazah(e.target.value)}
                            {...register("ijazahFile", {
                              required: ijazahEnabled
                                ? "Ijazah file is required"
                                : false,
                            })}
                          />
                          <label htmlFor="ijazahFile">Ijazah File</label>
                          {errors.ijazahFile && (
                            <p className="text-danger">
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
                        <div className="form-floating mb-3">
                          <select
                            type="text"
                            id="grade"
                            className="form-select"
                            placeholder="Grade"
                            {...register("grade", {
                              required: "Please select your grade",
                            })}
                          >
                            <option value="" disabled>
                              Select Your Grade
                            </option>
                            <option value="A_Plus">A+</option>
                            <option value="A">A</option>
                            <option value="A_Minus">A-</option>
                            <option value="B_Plus">B+</option>
                            <option value="B">B</option>
                            <option value="C_Plus">C+</option>
                            <option value="C">C</option>
                          </select>
                          <label htmlFor="grade">Grade</label>
                          {errors.grade && (
                            <p className="text-danger">
                              {errors.grade.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-floating mb-3">
                          <select
                            type="text"
                            id="jobType"
                            className="form-select"
                            placeholder="Job Type"
                            {...register("jobType", {
                              required: "Please select your job type",
                            })}
                          >
                            <option value="" disabled>
                              Select Job Type
                            </option>
                            <option value="Part_Time">Part Time</option>
                            <option value="Full_Time">Full Time</option>
                          </select>
                          <label htmlFor="jobType">Job Type</label>
                          {errors.jobType && (
                            <p className="text-danger">
                              {errors.jobType.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="educationField"
                        placeholder="Education Field"
                        {...register("educationField", {
                          required: "Please enter your education field",
                        })}
                      />
                      <label htmlFor="educationField">Education Field</label>
                      {errors.educationField && (
                        <p className="text-danger">
                          {errors.educationField.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="anotherJob"
                        placeholder="Do you have another job? Where?"
                        {...register("anotherJob", {
                          required:
                            "Please specify if you have another job and where",
                        })}
                      />
                      <label htmlFor="anotherJob">
                        Do you have another job? Where?
                      </label>
                      {errors.anotherJob && (
                        <p className="text-danger">
                          {errors.anotherJob.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <select
                        type="text"
                        id="availableTime"
                        className="form-select"
                        placeholder="Available Time"
                        {...register("availableTime", {
                          required: "Please select your available time",
                        })}
                      >
                        <option value="" disabled>
                          Select Available Time
                        </option>
                        <option value="Morning">Morning</option>
                        <option value="Night">Night</option>
                      </select>
                      <label htmlFor="availableTime">Available Time</label>
                      {errors.availableTime && (
                        <p className="text-danger">
                          {errors.availableTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <div className="form-floating mb-3">
                          <input
                            type="number"
                            className="form-control"
                            id="yearsOfExperience"
                            placeholder="Years of Experience"
                            min={0}
                            {...register("yearsOfExperience", {
                              required: "Please enter your years of experience",
                            })}
                          />
                          <label htmlFor="yearsOfExperience">
                            Years of Experience
                          </label>
                          {errors.yearsOfExperience && (
                            <p className="text-danger">
                              {errors.yearsOfExperience.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div>
                          <label htmlFor="isGraduated">Education Status:</label>
                        </div>
                        <input
                          type="radio"
                          id="graduated"
                          name="educationStatus"
                          value="true"
                          {...register("isGraduated", {
                            required: "Education status is required",
                          })}
                        />
                        <label
                          htmlFor="graduated"
                          style={{ marginRight: "10px" }}
                        >
                          Graduated
                        </label>
                        <input
                          type="radio"
                          id="student"
                          name="educationStatus"
                          value="false"
                          {...register("isGraduated", {
                            required: "Education status is required",
                          })}
                        />
                        <label htmlFor="student">Student</label>
                        {errors.isGraduated && (
                          <p className="text-danger">
                            {errors.isGraduated.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <select
                        type="text"
                        id="preferredAgeToTeach"
                        className="form-select"
                        placeholder="Preferred age group to teach"
                        {...register("preferredAgeToTeach", {
                          required:
                            "Please select your preferred age group to teach",
                        })}
                      >
                        <option value="" disabled>
                          Choose a group
                        </option>
                        <option value="From_5to10">5-10</option>
                        <option value="From_11to20">11-20</option>
                        <option value="From_21toBigger">21 or above</option>
                      </select>
                      <label htmlFor="preferredAgeToTeach">
                        Preferred age group to teach
                      </label>
                      {errors.preferredAgeToTeach && (
                        <p className="text-danger">
                          {errors.preferredAgeToTeach.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <h2>Video Demo:</h2>
                    <p className="fs-5">
                      Explanation of "Al-Sukun" in your language and Arabic,
                      Explanation of performing Salah in your language and
                      Arabic and reading the first 5 verses of "Sura Younes".
                    </p>
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        accept="video/mp4, video/mov, video/avi, video/mkv, video/m4v"
                        className="form-control"
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
                      <label htmlFor="demoVideoFile">
                        Upload your demo video
                      </label>
                      {errors.demoVideoFile && (
                        <p className="text-danger">
                          {errors.demoVideoFile.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="file"
                        accept=".pdf, .docx, .png, .jpeg, .jpg"
                        className="form-control"
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
                      <label htmlFor="cvFile">Upload your CV</label>
                      {errors.cvFile && (
                        <p className="text-danger">{errors.cvFile.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <select
                        type="text"
                        id="hearAboutUs"
                        className="form-select"
                        placeholder="How did you hear about us?"
                        {...register("hearAboutUs", {
                          required: "Please let us know how you heard about us",
                        })}
                      >
                        <option value="" disabled>
                          Select how you heard about us
                        </option>
                        <option value="Search_Engine">
                          Search Engine (Google, Yahoo, etc.)
                        </option>
                        <option value="Social_Media">
                          Social Media (Facebook, Twitter, etc.)
                        </option>
                        <option value="Recommended_By_Friend">
                          Recommended By Friend
                        </option>
                        <option value="Blog">Blog</option>
                        <option value="Other">Other</option>
                      </select>
                      <label htmlFor="hearAboutUs">
                        How did you hear about us?
                      </label>
                      {errors.hearAboutUs && (
                        <p className="text-danger">
                          {errors.hearAboutUs.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="btn fs-3 fw-bold border border-dark"
                    >
                      {loading ? (
                        "Please wait while we process your request..."
                      ) : (
                        "Submit"
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
