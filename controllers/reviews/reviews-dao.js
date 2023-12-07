import reviewsModel from "./reviews-model.js";

export const createReview = (review) => reviewsModel.create(review);

export const updateReviewById = (reviewId, newReview) =>
  reviewsModel.updateOne({ _id: reviewId }, { $set: newReview });

export const findReviewsById = (idReview) =>
  reviewsModel.find({ _id: idReview }).sort("-time").populate("author").exec();

export const findReviewsByFood = (idDrink) =>
  reviewsModel.find({ idDrink }).sort("-time").populate("author").exec();

export const findReviewsByAuthor = (author) =>
  reviewsModel.find({ author }).sort("-time").populate("author").exec();

export const deleteReview = (reviewID) =>
  reviewsModel.deleteOne({ _id: reviewID });
