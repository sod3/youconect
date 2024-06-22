import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
  screenshot: { type: String }
});

export default mongoose.model('Feedback', FeedbackSchema);
