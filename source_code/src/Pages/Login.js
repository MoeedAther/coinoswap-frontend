import React, { useState } from "react";
// import CustomNavbar from "../components/Navbar";
// import { Link } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    console.log("Navigate to login");
    navigate("/register");
  };
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      email === storedUser.email &&
      password === storedUser.password
    ) {
      navigate("/header");
    } else {
      alert("Invalid email or password.");
    }
  };
  return (
    <>
      <div className="w-100 bg-black">
        {/* <CustomNavbar /> */}
        <div
          className="d-flex align-items-start justify-content-center pt-5 px-2"
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
              className="bg-white shadow-lg p-3 mx-auto"
              style={{ maxWidth: "500px", borderRadius: "20px" }}
            >
              <div className="d-flex gap-2 mb-4" style={{gap:'8px'}}>
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-fill py-2 px-3 fw-medium border-0 ${
                    activeTab === "login"
                      ? "bg-warning text-black"
                      : "bg-secondary text-black"
                  }`}
                  style={{ borderRadius: "40px" }}
                >
                  Log In
                </button>
                <button
                  onClick={handleRegisterClick}
                  className={`flex-fill py-2 px-3 fw-medium border-0 ${
                    activeTab === "signup"
                      ? "bg-[#F4A70B] text-black"
                      : "bg-[#E2E2E2] text-black"
                  }`}
                  style={{ borderRadius: "40px" }}
                >
                  Sign Up
                </button>
              </div>

              <div>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="coinoswap@proton.me"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control py-3 rounded-pill border-2 border-dark placeholder-dark text-black"
                    required
                  />
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
                  }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••••••••••"
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

                <div className="text-start mb-4 ms-2">
                  <button
                    type="button"
                    className="btn p-0 text-secondary small"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-100 bg-black text-white py-2 px-4 rounded-pill fw-medium fs-5 mb-3 border-0"
                  style={{backgroundColor:'black'}}
                >
                  Log In
                </button>

                <div className="text-center">
                  <span className="text-secondary small">
                    Don't Have An Account?{" "}
                    <button
                      type="button"
                      onClick={handleRegisterClick}
                      className="text-warning text-decoration-underline fw-medium border-0 bg-transparent"
                    >
                      Sign Up
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
