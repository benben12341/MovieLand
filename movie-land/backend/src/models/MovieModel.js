import mongoose from 'mongoose';

import { ReviewSchema } from './ReviewModel.js';
import UserSchema from './UserModel.js';

const MovieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    director: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
    },
    reviewsAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [ReviewSchema],
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: UserSchema,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Movie', MovieSchema);
