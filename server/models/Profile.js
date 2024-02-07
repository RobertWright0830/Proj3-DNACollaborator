const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
  }, { timestamps: true });
//   // firstName: {
//   //   type: String,
//   // },
//   // lastName: {
//   //   type: String,
//   // },
//   // isSubscribed: {
//   //   type: Boolean,
//   //   default: false,
//   // },
//   // testers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tester" }],
//   // status: {
//   //   type: String,
//   //   required: true,
//   //   default: "active",
//   // },
//   // failedLoginAttempts: {
//   //   type: Number,
//   //   required: true,
//   //   default: 0,
//   // },
//   // lastLogin: { type: Date },
//   // profilePicUrl: { type: String },
//   // passwordResetToken: { type: String },
//   // passwordResetExpires: { type: Date },
//   // emailVerified: { type: Boolean },
//   // signupDate: { type: Date, default: Date.now },
//   // isLocked: { type: Boolean, default: false },
//   // { timestamps: true }

// set up pre-save middleware to create password
profileSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model("Profile", profileSchema);

module.exports = Profile;
