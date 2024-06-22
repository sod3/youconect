// models/videoModel.js
import { Schema, model } from 'mongoose';

const shortvideoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
});

const shortVideo = model('shortVideo', shortvideoSchema);

export default shortVideo;
