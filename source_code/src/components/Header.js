import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import {
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  Nav,
} from "react-bootstrap";

import Account from "./tabs/Account";
import Widget from "./tabs/Widget";
import ButtonTab from "./tabs/Button";
import Banner from "./tabs/Banner";
import Exchange from "./tabs/Exchnage";
import Stats from "./tabs/Stats";
import Payout from "./tabs/Payout";
// import Navbar from "./Navbar";

export default function Header() {
  const [activeTab, setActiveTab] = useState("Account");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Account":
        return <Account />;
      case "Widget":
        return <Widget />;
      case "Button":
        return <ButtonTab />;
      case "Banner":
        return <Banner />;
      case "Exchanges":
        return <Exchange />;
      case "Daily Stats":
        return <Stats />;
      case "Payouts":
        return <Payout />;
      default:
        return null;
    }
  };

  const data = [
    "Total Turnover",
    "Total Profit",
    "Ready to Payout",
    "Completed Exchanges",
  ];

  return (
    <>
      {/* <Navbar/> */}
      <div className="bg-black text-white py-4">
        <h2 className="text-center display-5 fw-bold mt-5">
          Partner <span className="text-warning">Account</span>
        </h2>

        <Container fluid className="mt-5 p-4 px-5">
          <Row className="g-4 justify-content-start">
            {data.map((title, idx) => (
              <Col key={idx} md={6} lg={3}>
                <Card
                  className="text-white"
                  style={{
                    backgroundColor: "#1A1918",
                    borderRadius: "20px",
                  }}
                >
                  <Card.Body className="p-1">
                    <div className="d-flex justify-content-between align-items-center px-4 py-2">
                      <Card.Title className="fs-5 fw-semibold m-0">
                        {title}
                      </Card.Title>
                      <IoMdEye size={22} className="text-light" />
                    </div>
                    <div
                      className="bg-white text-black p-3 mt-1 "
                      style={{ borderRadius: "20px" }}
                    >
                      <h3 className="fw-bold text-warning">0.004 ₿</h3>
                      <p className="mb-0" style={{ color: "black" }}>
                        ~6542,25 USD
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <p className="mt-2 ms-2 fw-medium">Partner Share 0.5%</p>

          <div
            className="bg-light mt-5 p- border border-white"
            style={{ borderRadius: "20px", backgroundColor: "black" }}
          >
            <Nav className="justify-content-between p-3" variant="pills">
              {[
                "Account",
                "Widget",
                "Button",
                "Banner",
                "Exchanges",
                "Daily Stats",
                "Payouts",
              ].map((tab) => (
                <Nav.Item key={tab}>
                  <Button
                    variant={activeTab === tab ? "black" : ""}
                    style={{
                      borderRadius: "50px",
                      padding: "8px 16px",
                      fontSize: "1rem",
                      fontWeight: "700",
                      backgroundColor:
                        activeTab === tab ? "#000" : "transparent",
                      color: activeTab === tab ? "#fff" : "#000",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </Button>
                </Nav.Item>
              ))}
            </Nav>
            <div className="mt-">{renderTabContent()}</div>
          </div>
        </Container>
      </div>
    </>
  );
}
