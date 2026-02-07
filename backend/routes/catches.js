const express = require("express");
const Catch = require("../models/Catch");
const auth = require("../middleware/auth");

const router = express.Router();

/* ===== ADD CATCH ===== */
router.post("/", auth, async (req, res) => {
  const { species, weight, routeId, location } = req.body;

  const newCatch = await Catch.create({
    userId: req.user.id,
    species,
    weight,
    routeId,
    location,
  });

  res.json(newCatch);
});

/* ===== GET USER CATCHES ===== */
router.get("/", auth, async (req, res) => {
  const catches = await Catch.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(catches);
});

module.exports = router;
