import mongoose from "mongoose";

const usersSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String },
    role: {
      type: String,
      enum: ["BLOGGER", "CRITIC", "ADMIN"],
      required: true,
    },
  },
  { collection: "users", timestamps: true }
);

export default usersSchema;
