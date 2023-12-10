import express from "express";
import CocktailDBController from "./controllers/cocktaildb/cocktail-db-controller.js";
import UsersController from "./controllers/users/users-controller.js";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import BlogsController from "./controllers/blogs/blog-controller.js";
import LikesController from "./controllers/likes/likes-controller.js";
import ReviewsController from "./controllers/reviews/reviews-controller.js";
import SessionController from "./session-controller.js";
import FollowsController from "./controllers/follows/follows-controller.js";
import AdminController from "./controllers/admin/admin-controller.js";
import dotenv from "dotenv";

dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4,
};

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/project";
mongoose.connect(CONNECTION_STRING, options);

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://master--relaxed-bienenstitch-78fb1e.netlify.app'];
app.use(cors({
  credentials: true,
  origin: allowedOrigins
}))

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());

CocktailDBController(app);
BlogsController(app);
UsersController(app);
LikesController(app);
ReviewsController(app);
SessionController(app);
FollowsController(app);
AdminController(app);

app.listen(4000);
