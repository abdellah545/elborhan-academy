import React from "react";
import style from "./Dashboard.module.css";
import { Link } from "react-router-dom";

const PaymentFailure = () => {
  return (
    <div className={style.statusPageContainer}>
      <div className={style.statusCard}>
        <span className={style.statusIcon}>❌</span>
        <h2 className={style.statusTitle} style={{ color: "#f87171" }}>Payment Unsuccessful</h2>
        <p className={style.statusText}>
          We encountered an issue with your payment attempt.<br />
          Please ensure your payment information is correct and try again.
          <br /><br />
          Need help? Contact us at<br />
          <strong style={{ color: "#fff" }}>support@elburhanacademy.com</strong>
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link to="/payment-report" className={style.statusActionBtn} style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}>
            Try Again
          </Link>
          <Link to="/FamilyDashboard" className={style.statusActionBtn}>
            <i className="fa-solid fa-house" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
