// controllers/videoController.js
import Video from '../models/videoModel.js';

export async function uploadVideo(req, res) {
  try {
    const newVideo = new Video({
      url: req.file.path,
      channelName: req.body.channelName,
      description: req.body.description,
    });
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload video' });
  }
}

export async function getVideos(req, res) {
  try {
    const videos = await find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
}

export async function updateVideoStats(req, res) {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedVideo = await findByIdAndUpdate(id, update, { new: true });
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video' });
  }
}
