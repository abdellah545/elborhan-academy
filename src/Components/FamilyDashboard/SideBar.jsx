import React, { useEffect, useState, useCallback, memo } from "react";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import baseURL from "../../BaseURL/BaseURL";
import style from "./Dashboard.module.css";

// ⚠️ DEV MODE: Toggle this to true to see fake data while backend is down
const USE_FAKE_DATA = true;

/**
 * Formats total minutes → "Xhr Ymins"
 */
const formatDuration = (minutes) => {
  if (!minutes) return "0 mins";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

/**
 * Gets initials from student name
 */
const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

/**
 * Single child card — memoised to avoid re-renders when siblings update
 */
const ChildCard = memo(function ChildCard({
  child,
  index,
  onViewSessions,
  isLoadingSessions,
}) {
  const subjects = child.subjectsAverageRating || [];

  return (
    <div className={style.childCard}>
      {/* Header row */}
      <div className={style.childCardHeader}>
        <div className={style.childAvatar}>
          {getInitials(child.studentName)}
        </div>
        <p className={style.childName}>
          {child.studentName || `Student ${index + 1}`}
        </p>
        <span
          className={`${style.childStatusBadge} ${child.isActive ? style.active : style.inactive}`}
        >
          <i className={`fa-solid fa-circle fa-2xs`} />
          {child.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Payment warning */}
      <div
        className={`${style.payWarning} ${child.isActive ? style.noPay : style.mustPay}`}
      >
        {child.isActive ? "✓ No payment due" : "⚠ Payment required"}
      </div>

      {/* Stats grid */}
      <div className={style.childStats}>
        <div className={style.childStatItem}>
          <div className={style.childStatLabel}>Avg Rating</div>
          <div className={style.childStatValue}>
            ⭐ {child.averageRating ? `${child.averageRating}/5` : "—"}
          </div>
        </div>
        <div className={style.childStatItem}>
          <div className={style.childStatLabel}>Sessions</div>
          <div className={style.childStatValue}>
            {child.numberOfSessions ?? 0}
          </div>
        </div>
        <div className={style.childStatItem}>
          <div className={style.childStatLabel}>Total Time</div>
          <div className={style.childStatValue}>
            {formatDuration(child.totalMinutes)}
          </div>
        </div>
        <div className={style.childStatItem}>
          <div className={style.childStatLabel}>Total Cost</div>
          <div className={style.childStatValue}>
            {child.totalCost ? `$${child.totalCost}` : "$0"}
          </div>
        </div>
      </div>

      {/* Subject ratings */}
      {subjects.length > 0 && (
        <div className={style.subjectRatings}>
          {["Quran", "Islamic", "Arabic"].map((subj, si) => (
            <div key={subj} className={style.subjectRatingItem}>
              <span className={style.subjectRatingName}>{subj}</span>
              <span className={style.subjectRatingValue}>
                {subjects[si]?.averageRating ?? "—"}/5
              </span>
            </div>
          ))}
        </div>
      )}

      {/* View sessions CTA */}
      <button
        className={style.viewSessionsBtn}
        onClick={() => onViewSessions(child.studentId, child.studentName)}
        disabled={isLoadingSessions}
        aria-label={`View sessions for ${child.studentName}`}
      >
        {isLoadingSessions ? (
          <span className={style.btnSpinner} />
        ) : (
          <>
            <i className="fa-solid fa-table-list" />
            View Sessions
          </>
        )}
      </button>
    </div>
  );
});

/**
 * SideBar — lists children, handles add-child form
 */
export default function SideBar({ onViewSessions, isLoadingSessions }) {
  const [childrenList, setChildrenList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* ── Fetch all students + their details in parallel ── */
  const fetchAllStudents = useCallback(async () => {
    setLoading(true);
    if (USE_FAKE_DATA) {
      setChildrenList([
        {
          studentId: 1,
          studentName: "Ahmed Ali",
          isActive: true,
          averageRating: 4.8,
          numberOfSessions: 12,
          totalMinutes: 720,
          totalCost: 150,
          subjectsAverageRating: [
            { subject: "Quran", averageRating: 4.9 },
            { subject: "Islamic", averageRating: 4.5 },
            { subject: "Arabic", averageRating: 5.0 },
          ],
        },
        {
          studentId: 2,
          studentName: "Fatima Ali",
          isActive: false,
          averageRating: 4.2,
          numberOfSessions: 5,
          totalMinutes: 300,
          totalCost: 65,
          subjectsAverageRating: [
            { subject: "Quran", averageRating: 4.1 },
            { subject: "Islamic", averageRating: 4.4 },
            { subject: "Arabic", averageRating: 4.0 },
          ],
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const listRes = await axiosinterceptor.get(
        `${baseURL}/Family/GetStudents`,
        {
          withCredentials: true,
        },
      );

      const detailed = await Promise.all(
        listRes.data.map(async (student) => {
          try {
            const detailRes = await axiosinterceptor.get(
              `${baseURL}/Family/StudentReport/${student.studentId}`,
              { withCredentials: true },
            );
            return { ...student, ...detailRes.data };
          } catch {
            return student;
          }
        }),
      );

      setChildrenList(detailed);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllStudents();
  }, [fetchAllStudents]);

  /* ── Add child submit ── */
  const onAddChild = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const res = await axiosinterceptor.post(
          `${baseURL}/Family/AddStudent/${data.childName}`,
          {},
          {
            params: { Name: data.childName },
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Child added successfully",
            showConfirmButton: false,
            timer: 3000,
            background: "#354F52",
            color: "#fff",
          });
          reset();
          setShowAddForm(false);
          fetchAllStudents();
        }
      } catch (err) {
        const msg = err?.response?.data;
        Swal.fire({
          position: "center",
          icon: "error",
          title:
            typeof msg === "string" && msg.includes("Already Exist")
              ? "Student already exists"
              : "Something went wrong",
          showConfirmButton: false,
          timer: 3000,
          background: "#354F52",
          color: "#fff",
        });
      } finally {
        setLoading(false);
      }
    },
    [fetchAllStudents, reset],
  );

  return (
    <aside className={style.sidebar}>
      {/* Header */}
      <div className={style.sidebarHeader}>
        <h2 className={style.sidebarTitle}>
          <i className="fa-solid fa-users" />
          My Children
        </h2>
        <button
          className={style.addChildToggle}
          onClick={() => setShowAddForm((v) => !v)}
          aria-expanded={showAddForm}
        >
          <i className={`fa-solid fa-${showAddForm ? "xmark" : "plus"}`} />
          {showAddForm ? "Cancel" : "Add Child"}
        </button>
      </div>

      {/* Add child form */}
      {showAddForm && (
        <form
          className={style.addChildForm}
          onSubmit={handleSubmit(onAddChild)}
          noValidate
        >
          <input
            id="childName"
            type="text"
            placeholder="Enter child's full name"
            className={style.addChildInput}
            autoFocus
            {...register("childName", {
              required: "Name is required",
              maxLength: { value: 25, message: "Max 25 characters" },
            })}
          />
          {errors.childName && (
            <p className={style.fieldError}>{errors.childName.message}</p>
          )}
          <button
            type="submit"
            className={style.addChildSubmit}
            disabled={loading}
          >
            {loading ? "Adding…" : "Add Child"}
          </button>
        </form>
      )}

      {/* Loading state */}
      {loading && childrenList.length === 0 ? (
        <div
          style={{ textAlign: "center", padding: "3rem 1rem", opacity: 0.5 }}
        >
          <div className={style.spinner} style={{ margin: "0 auto 1rem" }} />
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
            Loading children…
          </p>
        </div>
      ) : childrenList.length === 0 ? (
        <div
          style={{ textAlign: "center", padding: "3rem 1rem", opacity: 0.5 }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>👨‍👩‍👧‍👦</div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
            No children added yet
          </p>
        </div>
      ) : (
        childrenList.map((child, index) => (
          <ChildCard
            key={child.studentId || index}
            child={child}
            index={index}
            onViewSessions={onViewSessions}
            isLoadingSessions={isLoadingSessions}
          />
        ))
      )}
    </aside>
  );
}
