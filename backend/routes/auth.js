const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");

const router = express.Router();

/* ===== SEND OTP ===== */
router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  console.log("SEND OTP HIT WITH PHONE:", phone);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ phone });

  await Otp.create({
    phone,
    otp,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  });

  console.log("OTP (dev only):", otp);

  res.json({ message: "OTP sent" });
});


/* ===== VERIFY OTP & CREATE ACCOUNT ===== */
router.post("/verify-otp", async (req, res) => {
  try {
    const { username, phone, otp, password } = req.body;

    if (!username || !phone || !otp || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const record = await Otp.findOne({ phone, otp });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      phone,
      passwordHash,
    });

    await Otp.deleteMany({ phone });

    console.log("User created:", user.username);

    res.json({ message: "Account created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ===== LOGIN ===== */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;
