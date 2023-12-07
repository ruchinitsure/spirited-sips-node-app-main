import mongoose from "mongoose";

const likesSchema = mongoose.Schema(
  {
    idDrink: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    liked: { type: Boolean, default: true },
  },
  { collection: "likes" }
);

export default likesSchema;
