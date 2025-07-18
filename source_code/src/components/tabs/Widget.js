import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Card,
} from "react-bootstrap";
// import { ChevronDown, RefreshCw, Copy, Trash2, Check, X } from "lucide-react";
import {
  FaChevronDown,
  FaSyncAlt,
  FaRegCopy,
  FaTrashAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

import { BsSpeedometer2 } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WidgetBootstrap() {
  const [sendAmount, setSendAmount] = useState("400");
  const [receiveAmount, setReceiveAmount] = useState("7324.49");
  const [sendCurrency, setSendCurrency] = useState("BTC");
  const [receiveCurrency, setReceiveCurrency] = useState("ETH");
  const [copied, setCopied] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [widgetName, setWidgetName] = useState("Widget #2");
  const [defaultAmount, setDefaultAmount] = useState("01");
  const [defaultSendCoin, setDefaultSendCoin] = useState("BTC");
  const [defaultReceiveCoin, setDefaultReceiveCoin] = useState("ETH");
  const [exchangePartners, setExchangePartners] = useState("All");
  const [enableLogo, setEnableLogo] = useState(true);
  const [shortFormat, setShortFormat] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);

  const iframeCode =
    '<iframe Src="" Style="Border:0px #f1f1f1 None;" Name="myiFrame" Scrolling="No" Frameborder="1" Marginheight="0px" Marginwidth="0px" Height="400px" Width="600px" Allowfullscreen></iframe>';

  const handleCopyCode = async () => {
    navigator.clipboard
      .writeText(iframeCode)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Copy failed"));
  };

  const handleDelete = () => {
    console.log("Widget deleted");
  };

  return (
    <>
      <div
        className="container-fluid py-4"
        style={{ borderRadius: "20px", backgroundColor: "black" }}
      >
        <Row className="gx-4">
          <Col lg={6}>
            <Card
              className="bg-white pt-3"
              style={{ height: "auto", borderRadius: "20px" }}
            >
              <div className="px-3">
                <Button
                  variant="none"
                  className="mb-3 w-100 rounded-pill text-white"
                  onClick={() => setShowCreateModal(true)}
                  style={{ backgroundColor: "black" }}
                >
                  + Create New Widget
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
                  <BsSpeedometer2
                    size={28}
                    style={{ color: "black", marginLeft: "8px" }}
                  />
                  <div
                    className="rounded-pill d-flex justify-content-between align-items-center p-2 px-3"
                    style={{
                      width: "90%",
                      backgroundColor: "black",
                      paddingRight: "12px",
                    }}
                  >
                    <span className="text-warning">Widget #01</span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Button
                        variant="link"
                        style={{
                          color: "#fff",
                          padding: 0,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <MdEdit />
                      </Button>

                      <Button
                        variant="link"
                        onClick={() => setshowDeleteModal(true)}
                        style={{
                          color: "#fff",
                          padding: 0,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <FaTrashAlt />
                      </Button>
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
              <div className="p-4">
                <h2 style={{ color: "black" }}>Widget #01</h2>
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
                  style={{ borderRadius: "6px" }}
                >
                  <code className="text-warning">{iframeCode}</code>
                  <Button
                    variant="outline-light"
                    className="mt-3 rounded-pill d-flex align-items-center"
                    onClick={handleCopyCode}
                    style={{ gap: "6px" }}
                  >
                    Copy Code <FaRegCopy />
                  </Button>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    color: "white",
                    padding: "1rem",
                    marginTop: "1rem",
                    borderRadius: "20px",
                  }}
                >
                  <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        marginBottom: "1rem",
                        borderRadius: "1rem",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <button
                        style={{
                          color: "white",
                          width: "50%",
                          padding: "1rem 0",
                          borderRadius: "999px",
                          fontWeight: "600",
                          fontSize: "18px",
                          border: "none",
                          backgroundColor: "black",
                        }}
                      >
                        Exchange Crypto
                      </button>
                      <button
                        style={{
                          color: "black",
                          width: "50%",
                          padding: "1rem 0",
                          borderRadius: "999px",
                          fontWeight: "600",
                          fontSize: "18px",
                          border: "none",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "3rem",
                        }}
                      >
                        Buy/Sell Crypto 💳
                        <span
                          style={{
                            color: "white",
                            textTransform: "uppercase",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "999px",
                            position: "absolute",
                            fontSize: "12px",
                            top: "-8px",
                            right: "40px",
                            backgroundColor: "#f34900",
                          }}
                        >
                          Available Soon
                        </span>
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "black",
                      padding: "1rem",
                      borderRadius: "20px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          padding: "1rem",
                          border: "1px solid #6c757d",
                          borderRadius: "20px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                color: "#6c757d",
                                fontSize: "0.875rem",
                                marginBottom: "0.5rem",
                              }}
                            >
                              You Send:
                            </div>
                            <input
                              type="text"
                              value={sendAmount}
                              onChange={(e) => setSendAmount(e.target.value)}
                              style={{
                                backgroundColor: "transparent",
                                color: "white",
                                fontSize: "2rem",
                                fontWeight: "600",
                                border: "none",
                                width: "100%",
                                outline: "none",
                                marginLeft: "-15px",
                              }}
                            />
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "1rem",
                              backgroundColor: "#1B1A1A",
                              borderRadius: "10px",
                              padding: "1rem",
                            }}
                          >
                            <div
                              style={{
                                width: "24px",
                                height: "24px",
                                backgroundColor: "#f97316",
                                borderRadius: "999px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: "0.5rem",
                              }}
                            >
                              <span
                                style={{
                                  color: "white",
                                  fontSize: "0.75rem",
                                  fontWeight: "bold",
                                }}
                              >
                                ₿
                              </span>
                            </div>
                            <span
                              style={{
                                color: "white",
                                fontWeight: "500",
                                marginRight: "0.5rem",
                              }}
                            >
                              {sendCurrency}
                            </span>
                            <span
                              style={{
                                color: "red",
                                backgroundColor: "rgba(255, 0, 0, 0.25)",
                                fontSize: "0.75rem",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "0.375rem",
                                marginRight: "0.5rem",
                              }}
                            >
                              TRX
                            </span>
                            <FaChevronDown
                              style={{ color: "white", width: 16, height: 16 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Switch Button */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "white",
                          padding: "0.75rem",
                          borderRadius: "999px",
                          border: "none",
                        }}
                      >
                        <FaSyncAlt
                          style={{ color: "black", width: 20, height: 20 }}
                        />
                      </button>
                    </div>

                    {/* Receive Box */}
                    <div>
                      <div
                        style={{
                          borderRadius: "1rem",
                          padding: "1rem",
                          border: "1px solid #6c757d",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                color: "#6c757d",
                                fontSize: "0.875rem",
                                marginBottom: "0.5rem",
                              }}
                            >
                              You Receive:
                            </div>
                            <p
                              style={{
                                color: "white",
                                fontSize: "2rem",
                                fontWeight: "600",
                              }}
                            >
                              {receiveAmount}
                            </p>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "1rem",
                              backgroundColor: "#1B1A1A",
                              borderRadius: "10px",
                              padding: "0.25rem 1rem",
                            }}
                          >
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 30,
                              }}
                            >
                              ♦
                            </span>
                            <span
                              style={{
                                color: "white",
                                fontSize: "0.75rem",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "0.375rem",
                                marginRight: "0.5rem",
                              }}
                            >
                              {receiveCurrency}
                            </span>
                            <FaChevronDown
                              style={{ color: "white", width: 16, height: 16 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Info Rows */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginTop: "1rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#adb5bd",
                          fontSize: "0.875rem",
                        }}
                      >
                        <span style={{ color: "white", marginRight: "0.5rem" }}>
                          ♦
                        </span>
                        <span>Min • Amount: 0.0032427</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#ffc107",
                          fontSize: "0.875rem",
                        }}
                      >
                        <span
                          style={{ color: "#ffc107", marginRight: "0.5rem" }}
                        >
                          ♦
                        </span>
                        <span>Estimated • 1 BTC ~ 18.849695 ETH</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        padding: "1rem 0",
                        border: "none",
                        color: "black",
                        borderRadius: "1rem",
                        background:
                          "linear-gradient(to right, #F49F0A, #F36403)",
                        transition: "all 0.2s",
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
                      View Offers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {showCreateModal && (
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
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "1rem 1.5rem",
                width: "100%",
                maxWidth: "36rem",
                position: "relative",
              }}
            >
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  backgroundColor: "#000000",
                  border: "none",
                  borderRadius: "50%",
                  padding: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FaTimes
                  style={{ color: "white", width: "16px", height: "16px" }}
                />
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
                Create New Widget
              </h2>

              <div style={{ display: "grid", gap: "1.5rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        marginBottom: "0.5rem",
                        display: "block",
                      }}
                    >
                      Widget Name
                    </label>
                    <input
                      type="text"
                      value={widgetName}
                      onChange={(e) => setWidgetName(e.target.value)}
                      placeholder="Widget #2"
                      style={{
                        width: "100%",
                        padding: "0.6rem 1rem",
                        borderRadius: "999px",
                        backgroundColor: "#f5f5f5",
                        border: "none",
                        color: "#000",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        marginBottom: "0.5rem",
                        display: "block",
                      }}
                    >
                      Default Amount
                    </label>
                    <input
                      type="text"
                      value={defaultAmount}
                      onChange={(e) => setDefaultAmount(e.target.value)}
                      placeholder="01"
                      style={{
                        width: "100%",
                        padding: "0.6rem 1rem",
                        borderRadius: "999px",
                        backgroundColor: "#f5f5f5",
                        border: "none",
                        color: "#000",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        marginBottom: "0.5rem",
                        display: "block",
                      }}
                    >
                      Set Default Send Coin
                    </label>
                    <select
                      value={defaultSendCoin}
                      onChange={(e) => setDefaultSendCoin(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.6rem 1rem",
                        borderRadius: "999px",
                        backgroundColor: "#f5f5f5",
                        border: "none",
                        color: "#000",
                        outline: "none",
                      }}
                    >
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="USDT">USDT</option>
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        marginBottom: "0.5rem",
                        display: "block",
                      }}
                    >
                      Set Default Receive Coin
                    </label>
                    <select
                      value={defaultReceiveCoin}
                      onChange={(e) => setDefaultReceiveCoin(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.6rem 1rem",
                        borderRadius: "999px",
                        backgroundColor: "#f5f5f5",
                        border: "none",
                        color: "#000",
                        outline: "none",
                      }}
                    >
                      <option value="ETH">ETH</option>
                      <option value="BTC">BTC</option>
                      <option value="USDT">USDT</option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        marginBottom: "0.5rem",
                        display: "block",
                      }}
                    >
                      Choose Exchange Partners
                    </label>
                    <select
                      value={exchangePartners}
                      onChange={(e) => setExchangePartners(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.6rem 1rem",
                        borderRadius: "999px",
                        backgroundColor: "#f5f5f5",
                        border: "none",
                        color: "#000",
                        outline: "none",
                      }}
                    >
                      <option value="All">All</option>
                      <option value="Binance">Binance</option>
                      <option value="Coinbase">Coinbase</option>
                    </select>
                  </div>
                  <div>
                    <label
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        marginBottom: "0.5rem",
                        display: "block",
                      }}
                    >
                      Choose Color Theme
                    </label>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: "#000",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FaCheck
                          style={{ color: "#facc15", fontSize: "0.875rem" }}
                        />
                      </div>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          border: "1px solid #ccc",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                  }}
                >
                  {/* Toggle: Enable CoinSwap Logo */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <label
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "40px",
                        height: "20px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={enableLogo}
                        onChange={(e) => setEnableLogo(e.target.checked)}
                        style={{
                          opacity: 0,
                          width: 0,
                          height: 0,
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: enableLogo ? "#eda20b" : "#ccc",
                          transition: ".4s",
                          borderRadius: "999px",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          content: '""',
                          height: "14px",
                          width: "14px",
                          left: enableLogo ? "22px" : "4px",
                          bottom: "3px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          transition: ".4s",
                          zIndex: 2,
                        }}
                      />
                    </label>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        fontSize: "0.875rem",
                      }}
                    >
                      Enable CoinSwap Logo
                    </span>
                  </div>

                  {/* Toggle: Short Widget Format */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <label
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "40px",
                        height: "20px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={shortFormat}
                        onChange={(e) => setShortFormat(e.target.checked)}
                        style={{
                          opacity: 0,
                          width: 0,
                          height: 0,
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: shortFormat ? "black" : "#ccc",
                          transition: ".4s",
                          borderRadius: "999px",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          content: '""',
                          height: "14px",
                          width: "14px",
                          left: shortFormat ? "22px" : "4px",
                          bottom: "3px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          transition: ".4s",
                          zIndex: 2,
                        }}
                      />
                    </label>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        fontSize: "0.875rem",
                      }}
                    >
                      Short Widget Format
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    fontWeight: "600",
                    padding: "0.75rem",
                    borderRadius: "999px",
                    marginTop: "1rem",
                    width: "100%",
                    border: "none",
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
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 3,
              padding: "1rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
                padding: "1.5rem",
                width: "90%",
                maxWidth: "400px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "700",
                  marginBottom: "1.5rem",
                  color: "#000000",
                  paddingRight: "1rem",
                }}
              >
                Are You Sure You Want To Delete This Widget?
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.75rem",
                }}
              >
                <button
                  onClick={handleDelete}
                  style={{
                    backgroundColor: "#DC2626",
                    color: "#ffffff",
                    fontWeight: "600",
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
                  style={{
                    backgroundColor: "#E5E7EB",
                    color: "#000000",
                    fontWeight: "600",
                    width: "50%",
                    border: "none",
                    borderRadius: "20px",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#E5E7EB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#E5E7EB";
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
