import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import { TimezoneOptions } from "./newData";
import baseURL from "../../BaseURL/BaseURL";
import style from "./Dashboard.module.css";
import ProfileTabs from "./ProfileTabs";

// ⚠️ DEV MODE: Toggle this to true to see fake data while backend is down
const USE_FAKE_DATA = true;

const InfoRow = ({ label, value, icon }) => (
  <div className={style.infoRow}>
    <div className={style.infoLabel}>
      <i className={`fa-solid ${icon} ${style.infoIcon}`} />
      {label}
    </div>
    <div className={style.infoValue}>
      {value || <span className={style.textMuted}>—</span>}
    </div>
  </div>
);

const tzLabels = TimezoneOptions.reduce((a, c) => {
  a[c.value] = c.label;
  return a;
}, {});

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (USE_FAKE_DATA) {
      setProfile({
        name: "Mohamed Tariq",
        email: "parent@example.com",
        whatsAppNumber: "+201012345678",
        country: "Egypt",
        timeZone: "UTC",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axiosinterceptor.get(
        `${baseURL}/Family/GetFamilyprofile`,
      );
      setProfile(res.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className={style.pageWrapper}>
      <div className={style.profileCard}>
        {/* Avatar Section */}
        <div className={style.profileHeader}>
          <div className={style.profileAvatar}>{initials}</div>
          <div className={style.profileTitleContainer}>
            <h1 className={style.profileName}>{profile?.name || "—"}</h1>
            <p className={style.profileEmail}>{profile?.email || "—"}</p>
          </div>
        </div>

        <ProfileTabs />

        {loading ? (
          <div className={style.spinnerCenter}>
            <div className={style.spinner} />
          </div>
        ) : (
          <div className={style.infoGrid}>
            <InfoRow label="Full Name" value={profile?.name} icon="fa-user" />
            <InfoRow label="Email" value={profile?.email} icon="fa-envelope" />
            <InfoRow
              label="WhatsApp"
              value={profile?.whatsAppNumber}
              icon="fa-whatsapp brands"
            />
            <InfoRow label="Country" value={profile?.country} icon="fa-globe" />
            <InfoRow
              label="Timezone"
              value={tzLabels[profile?.timeZone]}
              icon="fa-clock"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Inline styles (all dark-mode) ─── */
const css = {
  page: {
    minHeight: "calc(100vh - 68px)",
    background: "#2F3E46",
    padding: "2rem 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "2rem",
    marginBottom: "2rem",
  },
  avatarWrap: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
    marginBottom: "2rem",
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 16,
    background: "#2F3E46",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: 800,
    color: "#fff",
    flexShrink: 0,
  },
  name: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    textTransform: "capitalize",
  },
  email: {
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.45)",
    margin: 0,
    marginTop: "0.25rem",
  },
  tabs: {
    display: "flex",
    gap: "0.4rem",
    flexWrap: "wrap",
    marginBottom: "2rem",
    padding: "0.35rem",
    background: "rgba(255,255,255,0.04)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.07)",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.45rem 0.85rem",
    borderRadius: 8,
    fontSize: "0.82rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    transition: "all 0.15s ease",
  },
  tabActive: {
    background: "rgba(82,121,111,0.15)",
    color: "#52796f",
    fontWeight: 700,
  },
  loadingWrap: {
    display: "flex",
    justifyContent: "center",
    padding: "2.5rem 0",
  },
  infoGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.9rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  infoLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    fontWeight: 600,
  },
  infoIcon: {
    color: "#52796f",
    width: 16,
    textAlign: "center",
  },
  infoValue: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#fff",
    textAlign: "right",
  },
};
