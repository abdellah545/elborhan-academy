import React from "react";
import style from "./Dashboard.module.css";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className={style.statusPageContainer}>
      <div className={style.statusCard}>
        <span className={style.statusIcon}>✅</span>
        <h1 className={style.statusTitle}>Payment Successful</h1>
        <p className={style.statusText}>
          Your payment has been successfully processed. We look forward to
          supporting your educational journey! Thank you for choosing El-Burhan Academy.
          <br /><br />
          <small style={{ opacity: 0.6 }}>Transaction ID: #123456789</small>
        </p>
        <Link to="/FamilyDashboard" className={style.statusActionBtn}>
          <i className="fa-solid fa-house" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
