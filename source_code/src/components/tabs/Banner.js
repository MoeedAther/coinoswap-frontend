import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePicture } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import banner from "../../images/Banner.png";

export default function Banner() {
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
        className="d-grid gap-4 p-3"
        style={{ borderRadius: "20px", backgroundColor: "black" }}
      >
        <div className="d-flex w-100" style={{ gap: "12px" }}>
          <div
            className="bg-white py-3 pb-0 border border-white"
            style={{ width: "50%", borderRadius: "20px", height: "164px" }}
          >
            <div className="px-3">
              <button
                className="w-100 text-white cursor-pointer py-1 px-4 rounded-pill mb-4 fw-medium border-0"
                onClick={openModal}
                style={{ width: "600px", backgroundColor: "black" }}
              >
                + Create New Banner
              </button>
            </div>

            <div
              className="p-3"
              style={{ borderRadius: "20px", backgroundColor: "black" }}
            >
              <div
                className="d-flex justify-content-between align-items-center w-100 bg-white rounded-pill border border-white ps-4"
                style={{ gap: "16px" }}
              >
                <AiOutlinePicture
                  size={28}
                  style={{ color: "black", marginLeft: "12px" }}
                />
                <div
                  className="d-flex justify-content-between align-items-center px-4 py-2 bg-black w-100 rounded-pill "
                  style={{ backgroundColor: "black" }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-warning">Banner #01</span>
                  </div>
                  <div>
                    <button className="p-2 bg-transparent border-0">
                      <MdEdit className="text-white" size={16} />
                    </button>
                    <button
                      className="p-2 bg-transparent border-0"
                      onClick={() => setshowDeleteModal(true)}
                    >
                      <FaTrashAlt className="text-white" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex-grow-1"
            style={{ maxWidth: "730px", borderRadius: "20px" }}
          >
            <div
              className="bg-white pt-4 border border-secondary"
              style={{ borderRadius: "20px" }}
            >
              <div className="mb-4 px-4">
                <h2 className="fs-3 fw-bold mb-2" style={{ color: "black" }}>
                  Banner #01 (360x60)
                </h2>
                <p className="text-muted fs-6">
                  Use the code below to embed This widget Into your website.
                </p>
              </div>

              <div
                className="p-4"
                style={{ borderRadius: "20px", backgroundColor: "black" }}
              >
                <div
                  className="border border-dark-subtle p-3 mb-4"
                  style={{ borderRadius: "5px" }}
                >
                  <code className="text-warning d-block">{iframeCode}</code>
                  <button
                    className="border border-white text-white px-4 py-2 rounded-pill mt-3 d-flex align-items-center text-sm bg-transparent"
                    style={{ gap: "6px" }}
                    onClick={handleCopyCode}
                  >
                    <span>Copy Code</span>
                    <FiCopy className="w-4 h-4" />
                  </button>
                </div>
                <div className="d-flex justify-content-center w-100">
                  <img src={banner} alt="banner" className="w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <>
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
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "1rem",
                  paddingTop: "0.5rem",
                  paddingBottom: "1.5rem",
                  width: "100%",
                  maxWidth: "600px",
                  position: "relative",
                }}
              >
                <div style={{ padding: "0 1rem" }}>
                  <button
                    onClick={closeModal}
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  >
                    <RxCross2 size={16} />
                  </button>

                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "black",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Create Banner
                  </h2>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        color: "black",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Banner Name
                    </label>
                    <input
                      type="text"
                      value={buttonName}
                      onChange={(e) => setButtonName(e.target.value)}
                      placeholder="Enter button name"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "999px",
                        border: "none",
                        backgroundColor: "#f5f5f5",
                        boxSizing: "border-box",
                        color: "black",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        color: "black",
                        marginBottom: "0.5rem",
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
                            gap: "0.25rem",
                            padding: "0.5rem 1rem",
                            borderRadius: "999px",
                            cursor: "pointer",
                            backgroundColor:
                              selectedSize === size.value
                                ? "#ffc107"
                                : "#f5f5f5",
                            color:
                              selectedSize === size.value ? "black" : "#888",
                            fontWeight: 500,
                          }}
                        >
                          <input
                            type="radio"
                            name="size"
                            value={size.value}
                            checked={selectedSize === size.value}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            style={{ marginRight: "0.25rem" }}
                          />
                          {size.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "1rem", padding: "0 1rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: "bold",
                      color: "black",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Preview
                  </label>
                  <div style={{ paddingBottom: "1rem", width: "100%" }}>
                    <img src={banner} alt="banner" className="w-100" />
                  </div>
                </div>

                <div style={{ padding: "0 1rem" }}>
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "black",
                      color: "white",
                      padding: "0.75rem",
                      borderRadius: "999px",
                      border: "none",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {showDeleteModal && (
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
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  paddingRight: "1rem",
                  color: "black",
                }}
              >
                Are You Sure You Want To Delete This Banner?
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
                    color: "white",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "20px",
                    padding: "0.5rem 1rem",
                    flex: 1,
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setshowDeleteModal(false)}
                  style={{
                    backgroundColor: "#E5E7EB",
                    color: "#000",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "20px",
                    padding: "0.5rem 1rem",
                    flex: 1,
                    cursor: "pointer",
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
