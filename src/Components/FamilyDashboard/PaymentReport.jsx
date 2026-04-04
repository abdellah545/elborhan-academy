import React, { useEffect, useState, useCallback, memo } from "react";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import baseURL from "../../BaseURL/BaseURL";
import style from "./Dashboard.module.css";

// ⚠️ DEV MODE: Toggle this to true to see fake data while backend is down
const USE_FAKE_DATA = true;

/* ─── Extra CSS only for PaymentReport ─── */
const payStyle = {
  page: {
    minHeight: "calc(100vh - 68px)",
    background: "#0f0f1a",
    padding: "2rem",
  },
  pageTitle: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#fff",
    marginBottom: "0.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  pageSubtitle: {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "2rem",
  },
  studentSection: {
    marginBottom: "2rem",
  },
  studentHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "linear-gradient(135deg, #f172b633, #7c6aff33)",
    border: "1px solid rgba(241,114,182,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    color: "#f172b6",
    fontSize: "0.9rem",
    flexShrink: 0,
  },
  studentName: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#fff",
    textTransform: "capitalize",
    margin: 0,
  },
  studentTotal: {
    marginLeft: "auto",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#4ade80",
    background: "rgba(74,222,128,0.1)",
    border: "1px solid rgba(74,222,128,0.2)",
    borderRadius: 50,
    padding: "0.25rem 0.75rem",
  },
  summaryBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: "1.25rem 1.5rem",
    marginBottom: "2rem",
  },
  summaryLabel: {
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.45)",
    marginBottom: "0.25rem",
  },
  summaryValue: {
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#fff",
  },
  payBtn: {
    padding: "0.75rem 2rem",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #4ade80, #22c55e)",
    color: "#0f0f1a",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "opacity 0.2s ease",
  },
  noDue: {
    textAlign: "center",
    padding: "4rem 1rem",
    opacity: 0.6,
  },
  noDueIcon: { fontSize: "3rem", marginBottom: "1rem" },
  noDueText: { color: "#4ade80", fontWeight: 700, fontSize: "1.1rem" },
};

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
    <div style={payStyle.studentSection}>
      <div style={payStyle.studentHeader}>
        <div style={payStyle.studentAvatar}>{getInitials(student.name)}</div>
        <p style={payStyle.studentName}>{student.name}</p>
        <span style={payStyle.studentTotal}>${student.costOfSessions ?? 0}</span>
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
                    <span style={{ color: "#4ade80", fontWeight: 600 }}>
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
                name: "Ahmed Ali",
                costOfSessions: 150,
                sessions: [
                  { id: 1, date: "2024-04-01T10:00:00Z", subject: "Quran Recitation", duration: 60, costOfThisSession: 75 },
                  { id: 2, date: "2024-04-05T10:00:00Z", subject: "Quran Recitation", duration: 60, costOfThisSession: 75 },
                ]
              },
              {
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
      <div style={{ ...payStyle.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className={style.spinner} />
      </div>
    );
  }

  const students = reportData?.studentSessionsOfFamily ?? [];
  const hasPayment = reportData?.isfound;
  const totalCost = reportData?.cost ?? 0;

  return (
    <div style={payStyle.page}>
      <h1 style={payStyle.pageTitle}>
        <i className="fa-solid fa-credit-card" style={{ color: "#f172b6" }} />
        Payment Report
      </h1>
      <p style={payStyle.pageSubtitle}>
        Detailed billing breakdown for all children
      </p>

      {/* Summary bar */}
      {hasPayment && (
        <div style={payStyle.summaryBar}>
          <div>
            <div style={payStyle.summaryLabel}>Total Due</div>
            <div style={payStyle.summaryValue}>${totalCost}</div>
          </div>
          <div>
            <div style={payStyle.summaryLabel}>Students</div>
            <div style={payStyle.summaryValue}>{students.length}</div>
          </div>
          <button
            style={payStyle.payBtn}
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
        <div style={payStyle.noDue}>
          <div style={payStyle.noDueIcon}>✅</div>
          <p style={payStyle.noDueText}>No outstanding payments</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", marginTop: "0.5rem" }}>
            All sessions are fully paid up.
          </p>
        </div>
      )}
    </div>
  );
}
