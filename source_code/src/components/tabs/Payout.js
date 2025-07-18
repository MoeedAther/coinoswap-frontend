import React, { useState } from "react";

export default function Payout() {
  const [amount, setAmount] = useState("0.00");
  const [btcAddress, setBtcAddress] = useState("");

  return (
    <div
      className="p-3"
      style={{ borderRadius: "20px", backgroundColor: "black" }}
    >
      <div className="bg-white p-3" style={{ borderRadius: "20px" }}>
        <h2 className="fs-4 fw-bold mb-4 text-black">Request A Payout</h2>

        <div
          style={{
            display: "grid",
            gap: "0.75rem", // equivalent to Tailwind's gap-3
            marginBottom: "1rem",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {/* Available Balance */}
          <div
            style={{
              color: "white",
              backgroundColor: "black",
              paddingTop: "0.5rem",
              paddingBottom: "0px",
              fontSize: "0.875rem",
              fontWeight: 500,
              borderRadius: "20px",
            }}
          >
            <p style={{ paddingLeft: "0.75rem", paddingRight: "0.75rem" }}>
              Available Balance
            </p>
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                padding: "1rem 0.75rem",
                marginTop: "0.25rem",
                borderRadius: "20px",
              }}
            >
              <span
                style={{
                  color: "#facc15", // Tailwind's yellow-500
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                }}
              >
                0.004 BTC
              </span>
            </div>
          </div>

          {/* Minimum Withdrawal Amount */}
          <div>
            <div
              style={{
                color: "black",
                backgroundColor: "#E2E2E2",
                paddingTop: "0.5rem",
                paddingBottom: "2px",
                fontSize: "0.875rem",
                fontWeight: 500,
                borderRadius: "20px",
              }}
            >
              <p style={{ paddingLeft: "0.75rem", paddingRight: "0.75rem" }}>
                Minimum Withdrawal Amount
              </p>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "1rem 0.75rem",
                  marginTop: "0.25rem",
                  borderRadius: "20px",
                }}
              >
                <span
                  style={{
                    color: "#facc15",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                  }}
                >
                  0.004 BTC
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              fontWeight: "bold",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              color: "black",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Amount
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            style={{
              padding: "0.75rem 1rem",
              backgroundColor: "#f0f0f0",
              borderRadius: "999px",
              border: "none",
              fontSize: "1.25rem",
              width: "100%",
              boxSizing: "border-box",
              color: "black",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              fontWeight: "bold",
              color: "black",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            BTC Address
          </label>
          <input
            type="text"
            value={btcAddress}
            onChange={(e) => setBtcAddress(e.target.value)}
            placeholder="Enter BTC Address"
            style={{
              padding: "0.75rem 1rem",
              backgroundColor: "#f0f0f0",
              borderRadius: "999px",
              border: "none",
              width: "100%",
              boxSizing: "border-box",
              fontSize: "1rem",
              color: "black",
              outline: "none",
            }}
            className="placeholder-black"
          />

          <style>
            {`
    .placeholder-black::placeholder {
      color: black;
    }
  `}
          </style>

          <p
            style={{
              color: "#6c757d",
              fontSize: "0.875rem",
              marginTop: "0.5rem",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
            }}
          >
            Our Withdrawal Requests Are Made Within 2-3 Business Days
          </p>
        </div>

        <button
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "999px",
            padding: "0.5rem 2rem",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
          }}
        >
          Payout
        </button>
      </div>

      <div className="bg-white p-3 mt-4" style={{ borderRadius: "20px" }}>
        <h2 className="fs-4 fw-bold" style={{color:'black'}}>Payout History</h2>

        <div className="table-responsive">
          <table className="table w-100 mb-0">
            <thead>
              <tr className="d-flex justify-content-between w-100">
                <th className="fw-semibold text-black">Status</th>
                <th className="fw-semibold text-black">Created Date</th>
                <th className="fw-semibold text-black">Amount Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3" className="py-5 text-center text-muted">
                  <div className="fs-6">No payout history found</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
