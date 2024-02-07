const { Schema, model } = require("mongoose");

const segmentSchema = new Schema(
  {
    testerId: {
      type: Schema.Types.ObjectId,
      ref: "Tester",
      required: true,
    },
    matchId: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    ancestorId: {
      type: Schema.Types.ObjectId,
      ref: "Ancestor",
      required: false,
    },
    chromosomeNumber: {
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
    totalSharedCm: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Segment = model("Segment", segmentSchema);

module.exports = Segment;
