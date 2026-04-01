import React, { Children, useEffect, useState } from "react";
import SideBar from "./SideBar";
import style from "./FamilyReport.module.css";
import "../ProgressBar/ProgressBar.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Footer from "../footer/footer";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import DashboardHeader from "./DashboardHeader";
import ProgressBar from "../ProgressBar/ProgressBar";
import baseURL from "../../BaseURL/BaseURL";

export default function FamilyDashboard() {
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   console.log(loading);
  // }, [loading]);
  const handleSessionsForStudent = async (studentId, studentName) => {
    setLoading(true);
    try {
      const res = await axiosinterceptor.get(
        `${baseURL}/Family/StudentSessionReport/${studentId}`,
        {},
        {
          params: {
            StudentId: studentId,
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSelectedStudentName(studentName);
      setSessions(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching student sessions:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(loading);

  return (
    <>
      <div className={`${style.padding}`}>
        <div className="d-lg-none">
          <button
            class="btn btn-black border border-dark border-5 fw-bold fs-3 mt-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#staticBackdrop"
            aria-controls="staticBackdrop"
          >
            My Children
          </button>

          <div
            class="offcanvas offcanvas-start "
            data-bs-scroll="false"
            data-bs-backdrop="static"
            tabindex="-1"
            id="staticBackdrop"
            aria-labelledby="staticBackdropLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title fw-bold" id="staticBackdropLabel">
                My Children
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body p-0 overflow-hidden">
              <div>
                <SideBar handleSessionsForStudent={handleSessionsForStudent} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 d-none d-lg-block">
            <SideBar handleSessionsForStudent={handleSessionsForStudent} />
          </div>

          <div className="col-lg-7 col-md-12 col-sm-12">
            {loading ? (
              <>
                <div className="redirect">
                  <div className="loader"></div>
                </div>
              </>
            ) : (
              <>
                <TableContainer sx={{ marginY: "20px" }} component={Paper}>
                  <TableRow>
                    <h1 className="fw-bold p-3">
                      Sessions list for{" "}
                      <span className="text-capitalize">
                        {" "}
                        {selectedStudentName}
                      </span>
                    </h1>
                  </TableRow>

                  <Table
                    sx={{ padding: "10px", marginTop: "10px" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#A9A9A9" }}>
                        <TableCell
                          sx={{
                            width: "20%",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "20%",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                          align="center"
                        >
                          Subject
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "15%",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                          align="center"
                        >
                          Duration
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "15%",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                          align="center"
                        >
                          Rate
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "20px" }}
                          align="center"
                        >
                          Feedback
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(sessions) && sessions.length > 0 ? (
                        sessions.map((session, index) => (
                          <TableRow
                            key={index}
                            sx={{ backgroundColor: "#DCDCDC" }}
                          >
                            <TableCell sx={{ fontWeight: "bold" }}>
                              {session.date}
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "bold" }}
                              align="center"
                            >
                              {session.subject}
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "bold" }}
                              align="center"
                            >
                              {session.duration} mins
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "bold" }}
                              align="center"
                            >
                              {session.rate}/5
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "bold" }}
                              align="center"
                            >
                              " {session.teacherFeedback} "
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            No sessions found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
