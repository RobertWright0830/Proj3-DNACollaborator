const { Schema, model } = require("mongoose");

const ancestorSchema = new Schema(
  {
    wikitreeId: {
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
    birthYear: {
      type: Number,
    },
    deathYear: {
      type: Number,
    },
    birthplace: {
      type: String,
    },
    deathplace: {
      type: String,
    },
  },
  { timestamps: true }
);

const Ancestor = model("Ancestor", ancestorSchema);

module.exports = Ancestor;
