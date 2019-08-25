const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 10
    },
    desc: { type: String, required: true },
    proLink: {
      type: String,
      required: true
    },
    grades: {
      got: Number,
      total: Number
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = schema;
