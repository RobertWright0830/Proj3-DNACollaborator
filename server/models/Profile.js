// Import Schema and model from Mongoose for schema definition, and bcrypt for password hashing
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Define schema for Profile including user details and authentication information
const profileSchema = new Schema(
  {
    // Fields include name, email with validation, and password with minimum length requirement
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
  },
  // Enable automatic creation of createdAt and updatedAt fields for each profile document
  { timestamps: true }
);

// Hash password before saving the profile document, applying salt for additional security
profileSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Method to compare provided password with stored hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model("Profile", profileSchema);
// Export Profile model for database interactions
module.exports = Profile;
