import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  async function verifyAndCreateAccount(e) {
    e.preventDefault();

    console.log("Sending verify-otp request");

    const res = await fetch("http://localhost:5000/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: state.username,
        phone: state.phone,
        otp,
        password,
      }),
    });

    const data = await res.json();
    console.log("Verify OTP response:", res.status, data);

    if (!res.ok) {
      alert(data.message || "OTP verification failed");
      return;
    }

    alert("Account created successfully");
    navigate("/login");
  }

  if (!state) return <p>Invalid flow</p>;

  return (
    <div className="auth-container">
      <h2>Verify OTP</h2>

      <form onSubmit={verifyAndCreateAccount} className="auth-form">
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Set Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
