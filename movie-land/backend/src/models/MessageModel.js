import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Message', messageSchema);
