import React, { useEffect, useState, useCallback, memo } from "react";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import baseURL from "../../BaseURL/BaseURL";
import style from "./Dashboard.module.css";

// ⚠️ DEV MODE: Toggle this to true to see fake data while backend is down
const USE_FAKE_DATA = true;

/**
 * Formats date string
 */
const fmt = (d) => {
  if (!d) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(d));
  } catch {
    return d;
  }
};

const getInitials = (name = "") =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";

/**
 * One student's payment table — memoised
 */
const StudentPaymentTable = memo(function StudentPaymentTable({ student }) {
  return (
    <div className={style.studentPaySection}>
      <div className={style.studentPayHeader}>
        <div className={style.studentPayAvatar}>{getInitials(student.name)}</div>
        <p className={style.studentPayName}>{student.name}</p>
        <span className={style.studentPayTotal}>${student.costOfSessions ?? 0}</span>
      </div>

      <div className={style.tableWrap}>
        <table className={style.table} aria-label={`Payment details for ${student.name}`}>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Subject</th>
              <th scope="col">Duration</th>
              <th scope="col">Session Cost</th>
            </tr>
          </thead>
          <tbody>
            {student.sessions?.length > 0 ? (
              student.sessions.map((s, i) => (
                <tr key={s.id ?? i}>
                  <td>{fmt(s.date)}</td>
                  <td>{s.subject ?? "—"}</td>
                  <td>{s.duration != null ? `${s.duration} mins` : "—"}</td>
                  <td>
                    <span style={{ color: "#4ade80", fontWeight: 700 }}>
                      ${s.costOfThisSession ?? 0}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className={style.tableEmpty}>
                  No sessions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default function PaymentReport() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchPaymentReport() {
      if (USE_FAKE_DATA) {
        if (!cancelled) {
          setReportData({
            isfound: true,
            cost: 215,
            studentSessionsOfFamily: [
              {
                id: "s1",
                name: "Ahmed Ali",
                costOfSessions: 150,
                sessions: [
                  { id: 1, date: "2024-04-01T10:00:00Z", subject: "Quran Recitation", duration: 60, costOfThisSession: 75 },
                  { id: 2, date: "2024-04-05T10:00:00Z", subject: "Quran Recitation", duration: 60, costOfThisSession: 75 },
                ]
              },
              {
                id: "s2",
                name: "Fatima Ali",
                costOfSessions: 65,
                sessions: [
                  { id: 3, date: "2024-04-03T14:30:00Z", subject: "Arabic Language", duration: 45, costOfThisSession: 65 }
                ]
              }
            ]
          });
          setLoading(false);
        }
        return;
      }

      try {
        const res = await axiosinterceptor.get(`${baseURL}/Family/PaymentReport`);
        if (!cancelled) setReportData(res.data);
      } catch (err) {
        // Error handled silently
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPaymentReport();
    return () => { cancelled = true; };
  }, []);

  const handlePayment = useCallback(async () => {
    setPaying(true);
    try {
      const res = await axiosinterceptor.get(`${baseURL}/api/Payment/PaymentWithPayMob`);
      window.location.replace(res.data);
    } catch (err) {
      setPaying(false);
    }
  }, []);

  if (loading) {
    return (
      <div className={style.spinnerOverlay}>
        <div className={style.spinner} />
      </div>
    );
  }

  const students = reportData?.studentSessionsOfFamily ?? [];
  const hasPayment = reportData?.isfound;
  const totalCost = reportData?.cost ?? 0;

  return (
    <div className={style.paymentPage}>
      <h1 className={style.paymentTitle}>
        <i className="fa-solid fa-credit-card" />
        Payment Report
      </h1>
      <p className={style.paymentSubtitle}>
        Detailed billing breakdown for all children
      </p>

      {/* Summary card */}
      {hasPayment && (
        <div className={style.summaryCard}>
          <div>
            <div className={style.summaryItemLabel}>Total Due</div>
            <div className={style.summaryItemValue}>${totalCost}</div>
          </div>
          <div>
            <div className={style.summaryItemLabel}>Students</div>
            <div className={style.summaryItemValue}>{students.length}</div>
          </div>
          <button
            className={style.payButton}
            onClick={handlePayment}
            disabled={paying}
          >
            {paying ? (
              <span className={style.btnSpinner} />
            ) : (
              <i className="fa-solid fa-bolt" />
            )}
            {paying ? "Redirecting…" : "Pay Now"}
          </button>
        </div>
      )}

      {students.length > 0 ? (
        students.map((student, i) => (
          <StudentPaymentTable key={student.id ?? i} student={student} />
        ))
      ) : (
        <div className={style.noPaymentDue}>
          <span className={style.noDueIcon}>✅</span>
          <p className={style.noDueText}>No outstanding payments</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem" }}>
            All sessions are fully paid up.
          </p>
        </div>
      )}
    </div>
  );
}
