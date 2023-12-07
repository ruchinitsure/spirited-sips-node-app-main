import mongoose from "mongoose";
import blogsSchema from "./blogs-schema.js";

const blogsModel = mongoose.model("BlogsModel", blogsSchema);

export default blogsModel;
