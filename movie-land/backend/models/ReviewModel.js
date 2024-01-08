const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const Review = mongoose.model("Review", reviewSchema)

module.exports = { Review }