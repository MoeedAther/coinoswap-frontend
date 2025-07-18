import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("Navigate to login");
    navigate("/login");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and privacy policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = { email, password };

      localStorage.setItem("user", JSON.stringify(userData));

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgreeToTerms(false);
      setErrors({});

      navigate("/login");
    }
  };

  return (
    <>
      <div className="w-100 bg-black">
        {/* <CustomNavbar /> */}
        <div
          className="d-flex align-items-start justify-content-center pt-5 px-3"
          style={{ minHeight: "calc(100vh - 80px)" }}
        >
          <div className="w-100">
            <div className="text-center mb-4">
              <h1 className="text-white fw-bold fs-1 mb-2">
                Affiliate <span style={{ color: "#F4A70B" }}>Program</span>
              </h1>
              <p className="text-light fs-6">
                Earn Profits From Each Exchange Through The CoinoSwap Affiliate
                Program
              </p>
            </div>

            <div
              className="bg-white rounded-4 shadow-lg p-3 mx-auto"
              style={{ maxWidth: "500px", borderRadius: "20px" }}
            >
              <div className="d-flex gap-2 mb-4" style={{ gap: "8px" }}>
                <button
                  onClick={handleLoginClick}
                  className="flex-fill py-2 px-4 fw-medium border-0 text-black"
                  style={{
                    borderRadius: "40px",
                    backgroundColor:
                      activeTab === "login" ? "#F4A70B" : "#e5e7eb",
                  }}
                >
                  Log In
                </button>
                <button
                  onClick={() => setActiveTab("signup")}
                  className="flex-fill py-2 px-4 fw-medium border-0 text-black"
                  style={{
                    borderRadius: "40px",
                    backgroundColor:
                      activeTab === "signup" ? "#F4A70B" : "#e5e7eb",
                  }}
                >
                  Sign Up
                </button>
              </div>

              <div>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control py-3 rounded-pill text-black"
                    style={{
                      borderColor: errors.email ? "#ef4444" : "#000",
                      borderWidth: "1px",
                    }}
                    required
                  />
                  {errors.email && (
                    <p className="text-danger small mt-1 ms-3">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid black",
                    borderRadius: "50px",
                    paddingRight: "5px",
                    position: "relative",
                    width: "100%",
                    maxWidth: "500px",
                    marginBottom: "16px",
                  }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      color: "#000",
                      background: "transparent",
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "#666",
                    }}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid black",
                    borderRadius: "50px",
                    paddingRight: "5px",
                    position: "relative",
                    width: "100%",
                    maxWidth: "500px",
                    marginBottom: "16px",
                  }}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-Enter Your Password"
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      color: "#000",
                      background: "transparent",
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "#666",
                    }}
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>

                <div className="mb-4 text-start" style={{ marginLeft: "20px" }}>
                  <label className="d-flex align-items-start gap-2 small text-secondary">
                    <input
                      type="checkbox"
                      className="form-check-input mt-1"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                    />
                    <span style={{ fontSize: "12px" }}>
                      I Have Read And Agree To The CoinoSwap{" "}
                      <button
                        type="button"
                        onClick={() => console.log("Open affiliate terms")}
                        style={{
                          color: "#F4A70B",
                          textDecoration: "underline",
                          background: "none",
                          border: "none",
                        }}
                      >
                        Affiliate Terms
                      </button>{" "}
                      And{" "}
                      <button
                        type="button"
                        onClick={() => console.log("Open privacy policy")}
                        style={{
                          color: "#F4A70B",
                          textDecoration: "underline",
                          background: "none",
                          border: "none",
                        }}
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-danger small mt-1 ms-4">
                      {errors.terms}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-100 bg-black text-white py-2 px-4 rounded-pill fw-medium fs-5 border-0 mb-3"
                  style={{ backgroundColor: "black" }}
                >
                  Sign Up
                </button>

                <div className="text-center">
                  <span className="text-secondary small">
                    Already Have An Account?{" "}
                    <button
                      type="button"
                      onClick={handleLoginClick}
                      style={{
                        color: "#F4A70B",
                        textDecoration: "underline",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Log In
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
