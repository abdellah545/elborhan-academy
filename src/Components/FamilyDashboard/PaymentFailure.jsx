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
    color: "#f44336",
  },
};

const PaymentFailure = () => {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h2 style={styles.header}>Payment Unsuccessful ❌</h2>
        <p>
          We encountered an issue with your payment attempt. Please ensure your
          payment information is correct and try again.
        </p>
        <p>
          If you continue to experience issues, please contact El-Burhan
          Academy’s support team at <b>support@elburhanacademy.com</b>.
        </p>
        <p> We are here to help!</p>
      </div>
    </main>
  );
};

export default PaymentFailure;
