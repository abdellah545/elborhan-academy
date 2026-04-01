import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import style from "./PaymentReport.module.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import Footer from "../footer/footer";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import baseURL from "../../BaseURL/BaseURL";
import "../ProgressBar/ProgressBar.css";

function PaymentReportTable({ student }) {
  return (
    <>
      <div className="row p-3">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <TableContainer
            sx={{ width: "70%", marginX: "auto" }}
            component={Paper}
          >
            <h1 className="fw-bold p-3 text-center">
              Detailed list for{" "}
              <span className="text-capitalize">{student.name}</span>
            </h1>
            <hr />
            <Table
              sx={{ padding: "10px", marginTop: "" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ backgroundColor: "#A9A9A9" }}>
                  <TableCell
                    sx={{ width: "20%", fontWeight: "bold", fontSize: "22px" }}
                    align="center"
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ width: "20%", fontWeight: "bold", fontSize: "22px" }}
                    align="center"
                  >
                    Subject
                  </TableCell>
                  <TableCell
                    sx={{ width: "20%", fontWeight: "bold", fontSize: "22px" }}
                    align="center"
                  >
                    Duration
                  </TableCell>
                  <TableCell
                    sx={{ width: "20%", fontWeight: "bold", fontSize: "22px" }}
                    align="center"
                  >
                    Cost
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student.sessions.map((session, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: "#DCDCDC",
                    }}
                  >
                    <TableCell sx={{ fontSize: "20px" }} align="center">
                      {session.date}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }} align="center">
                      {session.subject}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }} align="center">
                      {session.duration}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }} align="center">
                      {session.costOfThisSession}
                    </TableCell>
                  </TableRow>
                ))}
                {/* TableRow for total cost */}
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                    <h3>Total cost : {student.costOfSessions} $</h3>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <hr />
        </div>
      </div>
    </>
  );
}

export default function PaymentReport() {
  const [reportData, setReportData] = useState(null);
  const [payment, setPayment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPaymentReport() {
      try {
        setLoading(true);
        const response = await axiosinterceptor.get(
          `${baseURL}/Family/PaymentReport`
        );
        setLoading(false);
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching payment report:", error);
        setLoading(false);
      }
    }

    fetchPaymentReport();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axiosinterceptor.get(
        `${baseURL}/api/Payment/PaymentWithPayMob`
      );
      window.location.replace(response.data);
    } catch (error) {
      console.error("Error fetching payment report:", error);
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
      <div className={`${style.padding}`}>
        {reportData &&
          reportData.studentSessionsOfFamily.map((student, index) => (
            <PaymentReportTable key={index} student={student} />
          ))}
        {reportData?.isfound ? (
          <div className="total_cost container d-flex justify-content-between my-3">
            <h1 className="fw-bold">
              Total cost for all students : {reportData?.cost} $
            </h1>
            <button
              className="btn btn-success fs-3 fw-bold"
              onClick={handlePayment}
            >
              {" "}
              Pay Now
            </button>
          </div>
        ) : (
          <div className=" d-flex justify-content-center align-items-center">
            <h1 className="fw-bold text-success">No data found</h1>
          </div>
        )}
      </div>
    </>
  );
}
