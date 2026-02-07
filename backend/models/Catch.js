const mongoose = require("mongoose");

const CatchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    species: {
      type: String,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    routeId: {
      type: Number,
    },

    location: {
      lat: Number,
      lon: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catch", CatchSchema);
