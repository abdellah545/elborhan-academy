import React, { useEffect, useState } from "react";
import DashboardHeader from "../FamilyDashboard/DashboardHeader";
import { Outlet, Link, useLocation } from "react-router-dom";
import axiosinterceptor from "../../authComponent/axiosinterceptor";
import baseURL from "../../BaseURL/BaseURL";
import style from "../FamilyDashboard/Dashboard.module.css";
import DevNavBar from "../DevNavBar";



export default function LayoutFamily() {
  const [hasPaymentAlert, setHasPaymentAlert] = useState(false);

  // Check if there's a pending payment (for the badge on the header)
  useEffect(() => {
    // ⚠️ DEV MODE: Skip the fetch backend auth to prevent errors
    setHasPaymentAlert(true);
  }, []);

  return (
    <div className={style.layoutFamilyWrapper}>
      <DevNavBar />
      <DashboardHeader hasPaymentAlert={hasPaymentAlert} />
      <div className={style.layoutFamilyContent}>
        <Outlet />
      </div>
    </div>
  );
}
