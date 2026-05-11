import React, { useEffect, useState, useCallback } from "react";
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
