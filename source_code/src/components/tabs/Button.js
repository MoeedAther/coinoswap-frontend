import { FaRegCopy, FaTrashAlt, FaTimes } from "react-icons/fa";
import React, { useState } from "react";
import { BsSpeedometer2 } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { SiOpenlayers } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Card,
  Button,
} from "react-bootstrap";

export default function Buttons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonName, setButtonName] = useState("Button #2");
  const [selectedSize, setSelectedSize] = useState("250×40");
  const [showDeleteModal, setshowDeleteModal] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sizes = [
    { label: "250×40", value: "250×40" },
    { label: "750×40", value: "750×40" },
    { label: "370×40", value: "370×40" },
  ];

  const iframeCode =
    '<iframe Src="" Style="Border:0px #f1f1f1 None;" Name="myiFrame" Scrolling="No" Frameborder="1" Marginheight="0px" Marginwidth="0px" Height="400px" Width="600px" Allowfullscreen></iframe>';

  const handleCopyCode = () => {
    const textarea = document.createElement("textarea");
    textarea.value = iframeCode;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy!");
    }
    document.body.removeChild(textarea);
  };

  const handleDelete = () => {
    console.log("Widget deleted");
    // setShowModal(false);
  };

  return (
    <>
      <div
        className="container-fluid py-4 bg-black"
        style={{ borderRadius: "20px", backgroundColor: "black" }}
      >
        {" "}
        <Row className="gx-4">
          <Col lg={6}>
            <Card
              className="bg-white pt-3"
              style={{ height: "auto", borderRadius: "20px" }}
            >
              <div className="px-3">
                <Button
                  variant="none"
                  className="mb-3 w-100 rounded-pill bg-black text-white"
                  onClick={openModal}
                  style={{ backgroundColor: "black" }}
                >
                  + Create New Button
                </Button>
              </div>

              <div
                className="text-white p-2"
                style={{ borderRadius: "20px", backgroundColor: "black" }}
              >
                <InputGroup
                  className="bg-white rounded-pill d-flex align-items-center justify-content-between ps-3"
                  style={{ padding: "2px" }}
                >
                  <SiOpenlayers
                    size={28}
                    style={{ color: "black", marginLeft: "8px" }}
                  />
                  <div
                    className="rounded-pill d-flex justify-content-between align-items-center p-2 px-3"
                    style={{ width: "90%", backgroundColor: "black" }}
                  >
                    <span className="text-warning">Button #01</span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem", 
                      }}
                    >
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          color: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        <MdEdit />
                      </button>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          color: "#ffffff",
                          cursor: "pointer",
                        }}
                        onClick={() => setshowDeleteModal(true)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </InputGroup>
              </div>
            </Card>
          </Col>

          <Col lg={6}>
            <div
              className="bg-white"
              style={{ borderRadius: "20px", padding: "2px" }}
            >
              {" "}
              <div className="p-4">
                <h2 style={{ color: "black" }}>Button #01</h2>
                <p className="text-muted">
                  Use the code below to embed this widget into your website.
                </p>
              </div>
              <div
                className="p-3"
                style={{ borderRadius: "20px", backgroundColor: "black" }}
              >
                <div
                  className="bg-black text-warning p-3 border"
                  style={{ borderRadius: "5px" }}
                >
                  <code className="text-warning">{iframeCode}</code>
                  <Button
                    variant="outline-light"
                    className="mt-3 rounded-pill d-flex align-items-center gap-2"
                    onClick={handleCopyCode}
                    style={{ gap: "6px" }}
                  >
                    Copy Code <FaRegCopy />
                  </Button>
                </div>
                <div className="d-flex align-items-center justify-content-center mt-3">
                  <button
                    className="fw-bold py-3 border-0 text-black"
                    style={{
                      background: "linear-gradient(to right, #F49F0A, #F36403)",
                      transition: "all 0.2s",
                      width: "70%",
                      borderRadius: "10px",
                      fontWeight: "700",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(to right, #F36403, #F49F0A)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(to right, #F49F0A, #F36403)";
                    }}
                  >
                    Exchange Crypto
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 50,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                padding: "1rem 0 1.5rem",
                width: "100%",
                maxWidth: "600px",
                position: "relative",
                boxSizing: "border-box",
              }}
            >
              <div style={{ padding: "0 1.5rem" }}>
                <button
                  onClick={closeModal}
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#000",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  x
                </button>

                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#000",
                    marginBottom: "1.5rem",
                  }}
                >
                  Create Button
                </h2>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Button Name
                  </label>
                  <input
                    type="text"
                    value={buttonName}
                    onChange={(e) => setButtonName(e.target.value)}
                    placeholder="Enter button name"
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "999px",
                      border: "none",
                      fontSize: "1rem",
                      outline: "none",
                      boxSizing: "border-box",
                      color: "black",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      fontWeight: "bold",
                      color: "#000",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Choose Size
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {sizes.map((size) => (
                      <label
                        key={size.value}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.5rem 1rem",
                          borderRadius: "999px",
                          cursor: "pointer",
                          backgroundColor:
                            selectedSize === size.value ? "#facc15" : "#f8f9fa",
                          color:
                            selectedSize === size.value ? "#000" : "#6c757d",
                          fontWeight:
                            selectedSize === size.value ? "600" : "normal",
                        }}
                      >
                        <input
                          type="radio"
                          name="size"
                          value={size.value}
                          checked={selectedSize === size.value}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          style={{ margin: 0 }}
                        />
                        <span style={{ fontSize: "0.875rem" }}>
                          {size.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "0.5rem",
                    display: "block",
                    paddingLeft: "1.5rem",
                  }}
                >
                  Preview
                </label>
                <div
                  style={{
                    backgroundColor: "#000",
                    padding: "1rem",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 1.5rem",
                  }}
                >
                  <button
                    style={{
                      fontWeight: "bold",
                      padding: "0.5rem",
                      color: "#000",
                      backgroundImage:
                        "linear-gradient(to right, #F49F0A, #F36403)",
                      borderRadius: "10px",
                      border: "none",
                      width: "60%",
                      cursor: "pointer",
                    }}
                  >
                    Exchange Crypto
                  </button>
                </div>
              </div>

              <div style={{ padding: "0 1.5rem" }}>
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "#000",
                    color: "#fff",
                    padding: "0.75rem",
                    borderRadius: "999px",
                    border: "none",
                    fontWeight: 500,
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {showDeleteModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 3,
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "1rem",
                borderRadius: "1rem",
                width: "90%",
                maxWidth: "400px",
                boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15)",
                boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  paddingRight: "1rem",
                  color: "#000000",
                }}
              >
                Are You Sure You Want To Delete This Button?
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <button
                  onClick={handleDelete}
                  style={{
                    backgroundColor: "#DC2626",
                    color: "#ffffff",
                    fontWeight: 600,
                    width: "50%",
                    border: "none",
                    borderRadius: "20px",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setshowDeleteModal(false)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#E5E7EB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#E5E7EB")
                  }
                  style={{
                    backgroundColor: "#E5E7EB",
                    color: "#000000",
                    fontWeight: 600,
                    width: "50%",
                    border: "none",
                    borderRadius: "20px",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    transition: "none",
                    boxShadow: "none",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
