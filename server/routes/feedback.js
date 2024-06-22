import express from 'express';
import multer from 'multer';
import Feedback from '../models/Feedback.js'; // Make sure the path is correct

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('screenshot'), async (req, res) => {
  try {
    const feedback = new Feedback({
      feedback: req.body.feedback,
      screenshot: req.file ? req.file.path : null
    });
    await feedback.save();
    res.status(201).send(feedback);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
