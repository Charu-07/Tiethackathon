import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function login(e) {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: form.username,
      password: form.password,
    }),
  });

  console.log("Login response status:", res.status);

  const data = await res.json();
  console.log("Login response data:", data);

  if (!res.ok) {
    alert(data.message || "Login failed");
    return;
  }

  localStorage.setItem("token", data.token);
  navigate("/dashboard");
}


  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={login} className="auth-form">
        <input
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
