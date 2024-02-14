// Import Schema and model from Mongoose to define data structure and create model
const { Schema, model } = require("mongoose");

// Define schema for Ancestor with structure and field validation rules
const ancestorSchema = new Schema(
  // Ancestor model fields including identifiers, names, dates, locations, and additional metadata
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
    // Enable automatic creation of createdAt and updatedAt fields
    timestamps: true,
  }
);

const Ancestor = model("Ancestor", ancestorSchema);
// Export Ancestor model for use in database operations
module.exports = Ancestor;
