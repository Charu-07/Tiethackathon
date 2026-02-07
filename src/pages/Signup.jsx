import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    phone: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function sendOtp(e) {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/auth/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: form.phone,
    }),
  });

  const data = await res.json();
  console.log("Send OTP response:", data);

  navigate("/verify-otp", {
    state: { username: form.username, phone: form.phone },
  });
}


  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={sendOtp} className="auth-form">
        <input
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone number"
          required
          onChange={handleChange}
        />

        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}
