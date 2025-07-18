import React from "react";

export default function Exchange() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="p-3 text-white col-12"
          style={{ borderRadius: "20px",backgroundColor:'black' }}
        >
          <div className="bg-white p-3" style={{ borderRadius: "20px" }}>
            <h2 className="fs-4 fw-bold mb-3" style={{color:'black'}}>Exchanges History</h2>

            <div className="table-responsive">
              <div className="d-flex flex-column w-100">
                <div className="d-flex justify-content-between fw-semibold" style={{color:'black'}}>
                  <div>Status</div>
                  <div>Date</div>
                  <div>Order ID</div>
                  <div>Sell Amount</div>
                  <div>Get Amount</div>
                  <div>Profit</div>
                  <div>Source</div>
                </div>
              </div>

              <div className="py-5 text-muted d-flex align-items-center justify-content-center">
                <h2 className="fs-5 text-center">No exchange history found</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
