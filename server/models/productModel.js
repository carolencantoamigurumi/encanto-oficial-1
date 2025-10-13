import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true }
}, { _id: true });

const reviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  review: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: [{ type: String, required: true }],
  ebookFile: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  discount: { type: Number, required: true, min:0, max:100},
  ebookRatings: [ratingSchema],
  ebookReviews: [reviewSchema],
  date: { type: Date, default: Date.now, required: true },
}, {minimize:false});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
