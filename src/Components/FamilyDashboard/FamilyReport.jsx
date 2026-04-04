import React, { useState, useCallback, useMemo } from "react";
import SideBar from "./SideBar";
import style from "./Dashboard.module.css";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import baseURL from "../../BaseURL/BaseURL";

// ⚠️ DEV MODE: Toggle this to true to see fake data while backend is down
const USE_FAKE_DATA = true;

/**
 * Formats ISO date string → "Apr 3, 2025"
 */
const formatDate = (raw) => {
  if (!raw) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(raw));
  } catch {
    return raw;
  }
};

/**
 * Rating stars display (⭐ × rating)
 */
const RatingBadge = ({ value }) => (
  <span className={style.ratingBadge}>
    ⭐ {value ?? "—"}/5
  </span>
);

/**
 * Sessions table — only re-renders when sessions or name change
 */
const SessionsTable = React.memo(function SessionsTable({ sessions, studentName }) {
  if (!studentName) {
    return (
      <div className={style.sessionsPanelEmpty}>
        <div className={style.sessionsPanelEmptyIcon}>📋</div>
        <p className={style.sessionsPanelEmptyText}>
          Select a child from the sidebar to view their session history.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={style.sessionsPanelHeader}>
        <h2 className={style.sessionsPanelTitle}>
          Sessions for <span>{studentName}</span>
          {sessions.length > 0 && (
            <span className={style.sessionCount}>{sessions.length} sessions</span>
          )}
        </h2>
      </div>

      <div className={style.tableWrap}>
        <table className={style.table} aria-label={`Session list for ${studentName}`}>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Subject</th>
              <th scope="col">Duration</th>
              <th scope="col">Rating</th>
              <th scope="col">Teacher Feedback</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length > 0 ? (
              sessions.map((session, i) => (
                <tr key={session.id ?? i}>
                  <td>{formatDate(session.date)}</td>
                  <td>{session.subject ?? "—"}</td>
                  <td>{session.duration != null ? `${session.duration} mins` : "—"}</td>
                  <td>
                    <RatingBadge value={session.rate} />
                  </td>
                  <td>
                    <span
                      className={style.feedbackText}
                      title={session.teacherFeedback}
                    >
                      {session.teacherFeedback || "—"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={style.tableEmpty}>
                  No sessions found for this student yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
});

/**
 * FamilyDashboard — main page
 */
export default function FamilyDashboard() {
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);

  const handleSessionsForStudent = useCallback(async (studentId, studentName) => {
    setSelectedStudentName(studentName);
    setLoadingSessions(true);
    if (USE_FAKE_DATA) {
      setSessions([
        {
          id: 101,
          date: "2024-04-01T10:00:00Z",
          subject: "Quran Recitation",
          duration: 60,
          rate: 5,
          teacherFeedback: "Excellent recitation today, keep up the good work!"
        },
        {
          id: 102,
          date: "2024-04-03T14:30:00Z",
          subject: "Arabic Language",
          duration: 45,
          rate: 4,
          teacherFeedback: "Good progress on grammar rules, Needs more practice with vocabulary."
        },
        {
          id: 103,
          date: "2024-04-05T09:00:00Z",
          subject: "Islamic Studies",
          duration: 60,
          rate: 5,
          teacherFeedback: "Very attentive during the stories of the Prophets."
        }
      ]);
      setLoadingSessions(false);
      return;
    }

    try {
      const res = await axiosinterceptor.get(
        `${baseURL}/Family/StudentSessionReport/${studentId}`,
        { withCredentials: true }
      );
      setSessions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {

      setSessions([]);
    } finally {
      setLoadingSessions(false);
    }
  }, []);

  // Memoize sessions so SessionsTable only re-renders when they change
  const memoSessions = useMemo(() => sessions, [sessions]);

  return (
    <div className={style.dashboardRoot}>
      {/* Full-screen loading overlay */}
      {loadingSessions && (
        <div className={style.spinnerOverlay} role="status" aria-label="Loading sessions">
          <div className={style.spinner} />
        </div>
      )}

      <div className={style.dashboardBody}>
        {/* Left — Children sidebar */}
        <SideBar
          onViewSessions={handleSessionsForStudent}
          isLoadingSessions={loadingSessions}
        />

        {/* Right — Sessions table */}
        <main className={style.sessionsPanel}>
          <SessionsTable
            sessions={memoSessions}
            studentName={selectedStudentName}
          />
        </main>
      </div>
    </div>
  );
}
