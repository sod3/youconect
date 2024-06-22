import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const getProfile = async (req, res, next) => {
  try {
    // Fetch user data
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));

    // Fetch user's videos
    const videos = await Video.find({ userId: req.params.id });

    // Construct the profile response
    const profile = {
      avatar: user.img,
      channelName: user.name,
      videos: videos,
    };

    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};
