// Import mongoose to define a model with schema for storing genetic segment data
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for Segment including tester and match details, genetic information, and related profile
const segmentSchema = new Schema(
  {
    // Fields include identifiers for tester and match, genetic segment details (chromosome, start, end, segmentCm, snp), and associated profile
    // Optional fields for additional match information and genetic data flexibility
    testerId: {
      type: String,
      required: true,
      trim: true,
    },
    testerName: {
      type: String,
      required: false,
    },
    matchId: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    matchName: {
      type: String,
      required: false,
    },
    matchEmail: {
      type: String,
      trim: true,
      lowercase: true,
      required: false,
    },
    sex: {
      type: String,
      required: false,
    },
    field1: {
      type: String,
      required: false,
    },
    field2: {
      type: String,
      required: false,
    },
    field3: {
      type: String,
      required: false,
    },
    field4: {
      type: String,
      required: false,
    },
    field5: {
      type: String,
      required: false,
    },
    wikitreeIds: [
      {
        type: String,
        required: false,
      },
    ],
    chromosome: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
    segmentCm: {
      type: Number,
      required: false,
    },
    snp: {
      type: Number,
      required: false,
    },
    profile: {
      type: Schema.Types.ObjectId,
      Ref: "Profile",
      required: false,
    },
  },
  // Enable automatic creation of createdAt and updatedAt timestamps for tracking data changes
  { timestamps: true }
);

const Segment =
  mongoose.models.Segment || mongoose.model("Segment", segmentSchema);
  
// Create or retrieve the Segment model to avoid recompilation errors; export for database operations
module.exports = Segment;
