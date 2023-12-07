import * as dao from "./reviews-dao.js";

const ReviewsController = (app) => {
  const createReview = async (req, res) => {
    const currentUser = req.session["currentUser"];
    let review = req.body;
    review = {
      ...review,
      author: currentUser._id,
      time: Date.now(),
    };
    console.log(review);
    const actualReview = await dao.createReview(review);
    res.json(actualReview);
  };

  const updateReview = async (req, res) => {
    const newReview = req.body;
    const review = await dao.updateReviewById(newReview._id, newReview);
    console.log(newReview);
    res.json(newReview);
  };

  const deleteReview = async (req, res) => {
    const reviewID = req.params.idDrink;
    const response = await dao.deleteReview(reviewID);
    res.json({ reviewID });
  };

  const findReviewsByFood = async (req, res) => {
    const idDrink = req.params.idDrink;
    const reviews = await dao.findReviewsByFood(idDrink);
    res.send(reviews);
  };
  const findReviewsByAuthor = async (req, res) => {
    const author = req.params.author;
    const reviews = await dao.findReviewsByAuthor(author);
    res.json(reviews);
  };
  app.post("/api/reviews/drink/:idDrink", createReview);
  app.put("/api/reviews/drink/:idDrink", updateReview);
  app.delete("/api/reviews/drink/:idDrink", deleteReview);
  app.get("/api/reviews/drink/:idDrink", findReviewsByFood);
  app.get("/api/users/:author/reviews", findReviewsByAuthor);
};
export default ReviewsController;
