import React from "react";

const styles = {
  main: {
    backgroundColor: "transparent" /* Make it white if you need */,
    padding: "0 24px",
    margin: "0",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5dc", // faded beige background
    color: "#333",
    textAlign: "center",
    border: "1px solid #ccc",
    padding: "50px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    borderRadius: "8px",
    margin: "auto",
    maxWidth: "500px",
  },
  header: {
    color: "#4CAF50",
  },
};

const PaymentSuccess = () => {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.header}>Payment Successful ✅</h1>
        <p>
          Your payment has been successfully processed. We look forward to
          supporting your educational journey!
        </p>
        <p>Thank you for choosing El-Burhan Academy.</p>{" "}
        <p>
          Your transaction ID is #123456789. You will receive an email
          confirmation shortly.
        </p>
      </div>
    </main>
  );
};

export default PaymentSuccess;
