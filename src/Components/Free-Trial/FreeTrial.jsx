import React, { useEffect, useState } from "react";
import imgFreeTrial from "./Assets/Frame 1.png";
import { useForm, Controller } from "react-hook-form";
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
const comboStyles = {
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

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
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
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

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
        console.error("Failed to fetch courses", error);
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
      console.error(err);
      Swal.fire(
        "Error!",
        err.response?.data?.message || "An error occurred",
        "error"
      );
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <header className="d-flex justify-content-center text-center">
            <div className="image">
              <img
                src={imgFreeTrial}
                className="img-fluid w-75 align-items-md-center"
                alt=""
              />
            </div>
          </header>
        </div>
        <div className="container my-4">
          <div className="text-center">
            <p className="fs-4">
              Explore El-burhan Academy with free evaluation sessions
            </p>
            <h3 className="fw-bold">Schedule your trial class effortlessly</h3>
            <p className="fs-4">
              Rest assured, your data remains confidential.
            </p>
          </div>
        </div>
      </section>
      <section>
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
                        id="floatingInput"
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
                      <label htmlFor="floatingInput">First Name</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
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
                      <label htmlFor="floatingInput">Last Name</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                      )}
                      <label htmlFor="floatingInput">Email</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="WhatsApp Number"
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
                        <p className="text-danger">
                          {errors.whatsAppNumber.message}
                        </p>
                      )}
                      <label htmlFor="floatingInput">WhatsApp Number</label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
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
                      <p className="text-danger">{errors.Country.message}</p>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-12">
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
                      <p className="text-danger">{errors.timezone.message}</p>
                    )}
                  </div>
                  <div className="col-lg-12">
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
                      <p className="text-danger">
                        {errors.selectedCourses.message}
                      </p>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-12">
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
                      <p className="text-danger">
                        {errors.preferredDays.message}
                      </p>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-12">
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
                      <p className="text-danger">
                        {errors.preferredTimes.message}
                      </p>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-floating mb-3">
                      <select
                        type="text"
                        id="floatingInput"
                        placeholder="Student Gender"
                        className="form-select"
                        {...register("studentGender", {
                          required: "Student Gender is required",
                        })}
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                      <label htmlFor="floatingInput">Student Gender</label>
                      {errors.studentGender && (
                        <p className="text-danger">
                          {errors.studentGender.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Student Age"
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
                      <label htmlFor="floatingInput">Student Age</label>
                      {errors.studentAge && (
                        <p className="text-danger">
                          {errors.studentAge.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-floating mb-3">
                      <select
                        type="text"
                        id="floatingInput"
                        placeholder="Teacher Gender"
                        className="form-select"
                        {...register("teacherGender", {
                          required: "Teacher Gender is required",
                        })}
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                      <label htmlFor="floatingInput">Teacher Gender</label>
                      {errors.teacherGender && (
                        <p className="text-danger">
                          {errors.teacherGender.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <textarea
                      type="text"
                      className="form-control mb-3"
                      id="exampleFormControlTextarea1"
                      rows="6"
                      placeholder="Share your learning goals with us"
                      {...register("comment", {
                        required: "A comment is required",
                      })}
                    ></textarea>
                    {errors.comment && (
                      <p className="text-danger">{errors.comment.message}</p>
                    )}
                  </div>
                  <hr />
                  <div className="col-lg-4 col-md-12">
                    <button
                      type="submit"
                      className="text-decoration-none text-black btn fs-3 fw-bold border border-3 border-dark rounded"
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
