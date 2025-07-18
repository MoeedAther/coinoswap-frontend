import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
  Modal,
  Form,
} from "react-bootstrap";
// import { Edit, Copy, Trash2, Eye, EyeOff, Plus, X } from "lucide-react";
import {
  FaEdit,
  FaRegCopy,
  FaTrashAlt,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
  const [showPassword, setShowPassword] = useState(false);
  const [websiteLinks, setWebsiteLinks] = useState([
    "https://docs.google.com/spreadsheets/U1js9Jt83&deje9h&3he*%B...",
    "https://docs.google.com/spreadsheets/U1js9Jt83&deje9h&3he*%B...",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [deletingLink, setDeletingLink] = useState(null);
  const [rememberChoice, setRememberChoice] = useState(false);
  const [referralLinks, setReferralLinks] = useState([
    {
      id: 1,
      name: "Ref Link 01",
      url: "https://coinoswap.com?hs4+40sj48hsd938@h...",
    },
    {
      id: 2,
      name: "Ref Link 02",
      url: "https://coinoswap.com?hs4+40sj48hsd938@h...",
    },
    {
      id: 3,
      name: "Ref Link 03",
      url: "https://coinoswap.com?hs4+40sj48hsd938@h...",
    },
  ]);

  const apiKeys = [
    { id: 1, key: "7ushf78HWER-Hjqw8&4i4-bhaHJwhgj29" },
    { id: 2, key: "7Jsie893ujashd9-saejfjJs9348-s837HJsg" },
  ];

  const addWebsiteLink = () => setWebsiteLinks([...websiteLinks, ""]);
  const removeWebsiteLink = (i) =>
    setWebsiteLinks(websiteLinks.filter((_, idx) => idx !== i));

  const openEditModal = (link) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLink(null);
  };

  const openDeleteModal = (link) => {
    setDeletingLink(link);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingLink(null);
    setRememberChoice(false);
  };
  const confirmDelete = () => {
    setReferralLinks(referralLinks.filter((l) => l.id !== deletingLink.id));
    if (rememberChoice) console.log("Remembered delete");
    closeDeleteModal();
  };

  const handleSaveChanges = () => {
    setReferralLinks((prev) =>
      prev.map((l) => (l.id === editingLink.id ? editingLink : l))
    );
    closeModal();
  };

  const handleCopy = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Copy failed"));
  };
  const handleDelete = (link) => {
    openDeleteModal(link);
  };

  return (
    <>
      <Container
        fluid
        className="p-0 bg-black text-white mt-4"
        style={{ borderRadius: "20px", backgroundColor: "black" }}
      >
        <Row className="g-4 p-2">
          <Col lg={6}>
            <Card className="border-0" style={{ borderRadius: "20px" }}>
              <Card.Body fluid className="" style={{ padding: "2px" }}>
                <div className="p-4">
                  <h2
                    className="text-2xl fw-bold text-black mb-4"
                    style={{ color: "black" }}
                  >
                    Referral Link
                  </h2>
                  <p
                    className="text-gray-600 mb-6"
                    style={{ color: "#8a8989" }}
                  >
                    Earn By Recommending Crypto Swaps Through CoinoSwap. Share
                    Your Unique Affiliate Link, And Earn In Bitcoin For Every
                    Transaction Made Through It.
                  </p>
                  <Button
                    variant="black"
                    className="mb-3 bg-black text-white fw-medium"
                    style={{ borderRadius: "20px", backgroundColor: "black" }}
                  >
                    <FaPlus size={16} className="me-2" /> Create Ref Link
                  </Button>
                </div>

                <div
                  className="bg-black p-3"
                  style={{ borderRadius: "20px", backgroundColor: "black" }}
                >
                  {referralLinks.map((link) => (
                    <div
                      key={link.id}
                      className="d-flex justify-content-between align-items-center rounded-pill mb-2"
                      style={{
                        backgroundColor: "#f9fafb",
                        padding: "0.25rem",
                        gap: "0rem",
                      }}
                    >
                      <span
                        className="bg-white rounded-pill px-3 py-2 small fw-medium text-black"
                        style={{ color: "black" }}
                      >
                        {link.name}
                      </span>

                      <div
                        className="d-flex align-items-center justify-content-between bg-black rounded-pill"
                        style={{
                          gap: "1rem",
                          padding: "0.25rem",
                          backgroundColor: "black",
                        }}
                      >
                        <div className="flex-grow-1 mx-2">
                          <span className="text-warning small">{link.url}</span>
                        </div>

                        <div className="d-flex">
                          <Button
                            variant="link"
                            className="p-2 rounded-circle text-white"
                            onClick={() => openEditModal(link)}
                          >
                            <FaEdit size={16} />
                          </Button>
                          <Button
                            variant="link"
                            className="p-2 rounded-circle text-white"
                            onClick={() => handleCopy(link.url)}
                          >
                            <FaRegCopy size={16} />
                          </Button>
                          <Button
                            variant="link"
                            className="p-2 rounded-circle text-white"
                            onClick={() => handleDelete(link)}
                          >
                            <FaTrashAlt size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card
              className="border-0"
              style={{ borderRadius: "20px", backgroundColor: "" }}
            >
              <Card.Body fluid style={{ padding: "2px" }}>
                <div className="p-4">
                  <h2
                    className="text-2xl fw-bold text-black mb-4"
                    style={{ color: "black" }}
                  >
                    API Link
                  </h2>
                  <p
                    className="text-gray-600 mb-6"
                    style={{ color: "#8a8989" }}
                  >
                    An API Key Is A Unique Identifier Used By Computer
                    Applications To Securely Access Our API Services. This Key
                    Grants You Access To CoinoSwap's API Functionality, Which
                    You Can Explain In Full Detail In Our{" "}
                    <span className="text-yellow-600">API Documentation</span>.
                  </p>
                  <Button
                    variant="black"
                    className="mb-3 bg-black text-white fw-medium"
                    style={{ borderRadius: "20px", backgroundColor: "black" }}
                  >
                    <FaPlus size={16} className="me-2" /> Create API Link
                  </Button>
                </div>

                <div
                  className="bg-black p-3"
                  style={{ borderRadius: "20px", backgroundColor: "black" }}
                >
                  {apiKeys.map((api) => (
                    <div
                      key={api.id}
                      className="d-flex justify-content-between align-items-center rounded-pill mb-2"
                      style={{
                        backgroundColor: "#f9fafb",
                        padding: "0.25rem",
                        gap: "1rem",
                      }}
                    >
                      <span
                        className="rounded-pill px-3 py-2 small fw-medium text-black"
                        style={{ backgroundColor: "#fff", color: "black" }}
                      >
                        API Key 0{api.id}
                      </span>

                      <div
                        className="d-flex align-items-center justify-content-between rounded-pill"
                        style={{
                          backgroundColor: "#000",
                          gap: "1rem",
                          padding: "0.25rem",
                          flexGrow: 1,
                          marginLeft: "0.5rem",
                        }}
                      >
                        <div className="flex-grow-1 mx-2">
                          <span className="text-warning small">{api.key}</span>
                        </div>

                        <div className="d-flex">
                          <Button
                            variant="link"
                            className="p-2 rounded-circle text-white"
                            onClick={() => handleCopy(api.key)}
                          >
                            <FaRegCopy size={16} />
                          </Button>
                          <Button
                            variant="link"
                            className="p-2 rounded-circle text-white"
                            onClick={() =>
                              toast.info("Delete functionality pending")
                            }
                          >
                            <FaTrashAlt size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="g-4 p-2">
          <Col lg={6}>
            <Card
              className="bg-white border border-gray-200 p-4"
              style={{ borderRadius: "20px" }}
            >
              <h2 className="fs-3 fw-bold mb-4" style={{ color: "black" }}>
                Account Settings
              </h2>

              <div className="mb-4">
                <label
                  className="fw-semibold mb-2 px-3"
                  style={{ color: "black", fontWeight: "600" }}
                >
                  Affiliate Email
                </label>
                <InputGroup
                  className="rounded-pill"
                  style={{ backgroundColor: "black" }}
                >
                  <Form.Control
                    type="email"
                    readOnly
                    value="draztik99@gmail.com"
                    className="bg-transparent text-warning border-0 px-3 py-3 text-sm"
                  />
                  <Button variant="link" className="text-white pe-3">
                    <FaEdit size={16} />
                  </Button>
                </InputGroup>
              </div>

              {/* Affiliate Password */}
              <div className="mb-4">
                <label
                  className="fw-semibold mb-2 px-3"
                  style={{ color: "black", fontWeight: "600" }}
                >
                  Affiliate Password
                </label>
                <InputGroup
                  className="rounded-pill"
                  style={{ backgroundColor: "black" }}
                >
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    readOnly
                    value="••••••••••••••••••••••••••••"
                    className="bg-transparent text-warning border-0 px-3 py-3 text-sm"
                  />
                  <div className="d-flex align-items-center pe-2">
                    <Button
                      variant="link"
                      className="text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={16} />
                      ) : (
                        <FaEye size={16} />
                      )}
                    </Button>
                    <Button variant="link" className="text-white">
                      <FaEdit size={16} />
                    </Button>
                  </div>
                </InputGroup>
              </div>

              {/* Website Links */}
              <div>
                <label
                  className="fw-semibold mb-2 px-3"
                  style={{ color: "black", fontWeight: "600" }}
                >
                  {" "}
                  Links To Your Website Or Blog
                </label>

                <div className="mb-3">
                  {websiteLinks.map((link, index) => (
                    <InputGroup
                      key={index}
                      className="rounded-pill mb-2"
                      style={{ backgroundColor: "black" }}
                    >
                      <Form.Control
                        type="text"
                        value={link}
                        className="bg-transparent text-warning border-0 px-3 py-3 text-sm"
                        placeholder="Enter website URL"
                        readOnly
                      />
                      <Button
                        variant="link"
                        className="text-white pe-3"
                        onClick={() => removeWebsiteLink(index)}
                      >
                        <FaTimes size={16} />
                      </Button>
                    </InputGroup>
                  ))}
                </div>

                <Button
                  variant="light"
                  className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "black",
                  }}
                  onClick={addWebsiteLink}
                >
                  <FaPlus size={20} className="text-white" />
                </Button>

                <p className="text-muted small">
                  Please Provide Links To Your Website Or Blog That You Will Use
                  To Direct Traffic And Earn Revenue In The CoinoSwap Affiliate
                  Program.
                </p>
              </div>
            </Card>
          </Col>
          <Col lg={6}>
            {/* Two-Factor Auth Section */}
            <Card
              text="warning"
              className="border-0 p-2"
              style={{ borderRadius: "20px", backgroundColor: "#222120" }}
            >
              <Card.Body>
                <h2>Two-Factor Authentication</h2>
                <Button
                  variant="outline-light"
                  style={{ borderRadius: "40px", fontWeight: "medium" }}
                >
                  Enable Google Authentication
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "1rem",
              position: "relative",
              maxWidth: "500px",
              width: "100%",
              borderRadius: "20px",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              X
            </button>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#000",
                marginBottom: "1rem",
              }}
            >
              Edit Referral Link
            </h3>

            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="Enter link name"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "50px",
                  border: "none",
                  backgroundColor: "#E2E2E2",
                  fontSize: "1rem",
                  color: "#000",
                  outline: "none",
                }}
                value={editingLink?.name || ""}
                onChange={(e) =>
                  setEditingLink({
                    ...editingLink,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <button
              onClick={handleSaveChanges}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "50px",
                backgroundColor: "#000",
                color: "#fff",
                fontWeight: "500",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "1rem",
              position: "relative",
              maxWidth: "500px",
              width: "100%",
              borderRadius: "20px",
            }}
          >
            <h3
              style={{
                fontWeight: "700",
                color: "#000",
                marginBottom: "1rem",
                fontSize: "28px",
                lineHeight: "1.125",
              }}
            >
              Are You Sure You Want To Delete This Referral Link?
            </h3>

            <p
              style={{
                color: "#6c757d",
                fontSize: "14px",
                marginBottom: "0.5rem",
              }}
            >
              {deletingLink?.url}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <input
                type="checkbox"
                id="remember-delete"
                checked={rememberChoice}
                onChange={(e) => setRememberChoice(e.target.checked)}
                style={{
                  marginRight: "8px",
                  width: "16px",
                  height: "16px",
                }}
              />
              <label
                htmlFor="remember-delete"
                style={{
                  margin: 0,
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Remember And Delete Without Confirmation
              </label>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={confirmDelete}
                style={{
                  flexGrow: 1,
                  padding: "12px",
                  borderRadius: "50px",
                  backgroundColor: "red",
                  color: "#fff",
                  fontWeight: "500",
                  fontSize: "16px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>

              <button
                onClick={closeDeleteModal}
                style={{
                  flexGrow: 1,
                  padding: "12px",
                  borderRadius: "50px",
                  backgroundColor: "#E2E2E2",
                  color: "#000",
                  fontWeight: "500",
                  fontSize: "16px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
