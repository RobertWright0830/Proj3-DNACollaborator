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
    middleName: {
      type: String,
    },
    lastNameAtBirth: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    deathDate: {
      type: String,
    },
    birthLocation: {
      type: String,
    },
    deathLocation: {
      type: String,
    },
    sex: {
      type: String,
    },
    wikitreePicUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Ancestor = model("Ancestor", ancestorSchema);

module.exports = Ancestor;
