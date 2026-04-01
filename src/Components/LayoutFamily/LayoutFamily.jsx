import React from "react";
import DashboardHeader from "../FamilyDashboard/DashboardHeader";
import { Outlet } from "react-router-dom";

export default function LayoutFamily() {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
}
