import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    review: String,
    idDrink: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    time: Date,
  },
  { collection: "reviews" }
);
export default reviewsSchema;
