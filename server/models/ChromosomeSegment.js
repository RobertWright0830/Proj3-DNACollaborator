const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chromosomeSegmentSchema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: false,
    },
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
      required: true,
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
  },
  { timestamps: true }
);

const ChromosomeSegment =
  mongoose.models.ChromosomeSegment ||
  mongoose.model("ChromosomeSegment", chromosomeSegmentSchema);

module.exports = ChromosomeSegment;
