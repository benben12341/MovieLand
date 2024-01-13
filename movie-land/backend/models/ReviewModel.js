const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = { Review, ReviewSchema };
