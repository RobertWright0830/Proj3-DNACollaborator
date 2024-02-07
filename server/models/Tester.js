const { Schema, model } = require("mongoose");

const testerSchema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    siteName: {
      type: String,
      required: true,
      trim: true,
    },
    testSite: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Tester = model("Tester", testerSchema);

module.exports = Tester;
