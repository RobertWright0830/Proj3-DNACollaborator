const { Schema, model } = require("mongoose");

const ancestorSchema = new Schema(
  {
    ancestorWikitreeId: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dob: {
      type: String,
    },
    dod: {
      type: String,
    },
    birthPlace: {
      type: String,
    },
    deathPlace: {
      type: String,
    },
    sex: {
      type: String,
    },
  },
  { timestamps: true }
);

const Ancestor = model("Ancestor", ancestorSchema);

module.exports = Ancestor;
