import React, { useEffect, useState } from "react";
import style from "./SideBar.module.css";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import Swal from "sweetalert2";
import baseURL from "../../BaseURL/BaseURL";
import "../ProgressBar/ProgressBar.css";
import { useForm } from "react-hook-form";

export default function SideBar({ handleSessionsForStudent }) {
  const [childName, setChildName] = useState("");
  const [childrenList, setChildrenList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchStudentDetails = async (studentId) => {
    setLoading(false);
    try {
      const res = await axiosinterceptor.get(
        `${baseURL}/Family/StudentReport/${studentId}`,
        {
          withCredentials: true,
        }
      );
      // setLoading(true);

      return res.data;
    } catch (error) {
      console.error("Error fetching student details:", error);
      return null;
    }
  };

  const handleFetchStudentNameANDid = async () => {
    try {
      setLoading(true);
      const res = await axiosinterceptor.get(`${baseURL}/Family/GetStudents`, {
        withCredentials: true,
      });

      setLoading(true);
      const detailedStudentList = await Promise.all(
        res.data.map(async (student) => {
          const studentDetails = await fetchStudentDetails(student.studentId);
          return { ...student, ...studentDetails };
        })
      );

      setLoading(false);
      setChildrenList(detailedStudentList);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    handleFetchStudentNameANDid();
  }, []);

  const handleAddChild = async (e) => {
    e.preventDefault();
    setError(true);
    try {
      setLoading(true);
      const res = await axiosinterceptor.post(
        `${baseURL}/Family/AddStudent/${childName}`,
        {},
        {
          params: {
            Name: childName,
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
          title: "Child added successfully",
          showConfirmButton: false,
          timer: 4000,
        });
        setChildName("");
        handleFetchStudentNameANDid(); // Refetch student list to update the table
        setLoading(true);
        // setError(false);
      }
    } catch (error) {
      console.error("Error adding child:", error);
      setLoading(false);
      // setError(false);
    }
  };

  const onAddChildSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axiosinterceptor.post(
        `${baseURL}/Family/AddStudent/${data.childName}`,
        {},
        {
          params: {
            Name: data.childName,
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
          title: "Child added successfully",
          showConfirmButton: false,
          timer: 4000,
        });
        handleFetchStudentNameANDid(); // Refetch student list to update the table
        setLoading(true);
        // setError(false);
      }
    } catch (error) {
      console.error("Error adding child:", error);
      if(error.response.data.includes("Student Already Exist")){
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Student Already Exist",
          showConfirmButton: false,
          timer: 4000,
        });
      }
      setLoading(false);
      // setError(false);
    }
  };
  return (
    <>
      {loading && (
        <>
          <div className="redirect">
            <div class="loader"></div>
          </div>
        </>
      )}
      <div className={`${style.sidebar}`}>
        <div className={`${style.sidebar_content}`}>
          <div className="row py-2">
            <div className="col-lg-4 col-md-12">
              <h3 className="text-center fw-bold mt-2">Children List</h3>
            </div>
            <div className="col-lg-8 col-md-12 text-center">
              <form onSubmit={handleSubmit(onAddChildSubmit)}>
                <button
                  class="btn fs-3"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span className="mx-2">Add Child</span>
                  <i class="fa-solid fa-circle-plus letter-spacing"></i>
                </button>
                <div class="collapse col-lg-12 col-md-12" id="collapseExample">
                  <div class="card card-body">
                    <input
                      type="text"
                      placeholder="Add Child"
                      class="form-control"
                      {...register("childName", {
                        required: "Name is required",
                        maxLength: {
                          value: 25,
                          message: "Student name shouldn't exceed 25 characters",
                        },
                      })}

                    />
                    {errors.childName && (
                      <p className="text-danger">
                        {errors.childName.message}
                      </p>
                    )}
                    <button
                      className="btn btn-dark mt-2"
                      type="submit"
                      // onClick={handleAddChild}
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr />
          <div className="container">
            <div className="row">
              {childrenList.map((child, index) => (
                <>
                  <React.Fragment key={index}>
                    <div className="col-lg-7 col-md-12 col-sm-12 my-3 p-3">
                      <h3 className="fw-bold text-capitalize">
                        <span
                          className={`id fw-bold cursor-not-allowed ${style.bg_gray}`}
                        >
                          {index + 1}
                        </span>{" "}
                        {child.studentName}{" "}
                        {child.isActive ? (
                          <i
                            class="fa-solid fa-circle-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            class="fa-solid fa-circle-xmark"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </h3>
                      <br />
                      <table className="table striped">
                        <thead>
                          <tr>
                            <th className="text-center">Average Rate</th>
                            <th className="text-center">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-center">
                              {child.averageRating
                                ? `${child.averageRating}/5`
                                : "0/5"}
                            </td>
                            <td className="text-center">
                              {child.totalMinutes
                                ? `${Math.floor(child.totalMinutes / 60)} hrs ${
                                    child.totalMinutes % 60
                                  } mins`
                                : "0 mins"}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="detailed row">
                        <div className="col-lg-4">
                          <p className="text-center fw-bold">Quran</p>
                          <h5 className="text-center">
                            {child.subjectsAverageRating &&
                            child.subjectsAverageRating.length > 0
                              ? `${
                                  child.subjectsAverageRating[0]
                                    ?.averageRating || "0"
                                }/5`
                              : "0.00/5"}
                          </h5>
                        </div>
                        <div className="col-lg-4">
                          <p className="text-center fw-bold">Islamic</p>
                          <h5 className="text-center">
                            {child.subjectsAverageRating &&
                            child.subjectsAverageRating.length > 1
                              ? `${
                                  child.subjectsAverageRating[1]
                                    ?.averageRating || "0"
                                }/5`
                              : "0.00/5"}
                          </h5>
                        </div>
                        <div className="col-lg-4">
                          <p className="text-center fw-bold">Arabic</p>
                          <h5 className="text-center">
                            {child.subjectsAverageRating &&
                            child.subjectsAverageRating.length > 2
                              ? `${
                                  child.subjectsAverageRating[2]
                                    ?.averageRating || "0"
                                }/5`
                              : "0.00/5"}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 d-flex justify-content-center align-items-center flex-column">
                      <h6 className="fw-bold">
                        NO. OF SESSIONS :{" "}
                        {child.numberOfSessions
                          ? `${child.numberOfSessions}`
                          : "0"}
                      </h6>
                      <br />
                      <h4>Total Costs</h4>
                      <h4 className="fw-bold">
                        {child.totalCost ? `${child.totalCost} $` : "0 $"}
                      </h4>
                      <br />
                      <button
                        type="button"
                        onClick={() =>
                          handleSessionsForStudent(
                            child.studentId,
                            child.studentName
                          )
                        }
                        className={`mb-3 ${style.btn_dark}`}
                        {...(window.innerWidth <= 992 && {
                          "data-bs-dismiss": "offcanvas",
                          "aria-label": "Close",
                        })}
                      >
                        {loading ? (
                          <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          "View Sessions"
                        )}
                      </button>
                    </div>
                    <div className="text-center fw-bold">
                      {child.isActive ? (
                        <div style={{ color: "green" }}>
                          This child don't have to pay now
                        </div>
                      ) : (
                        <div style={{ color: "red" }}>
                          This child has to pay now
                        </div>
                      )}
                    </div>

                    <br />
                  </React.Fragment>
                  <div className="py-4 bg-white"></div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
