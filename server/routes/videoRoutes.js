// routes/videoRoutes.js
import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import { uploadVideo, getVideos, updateVideoStats } from '../controllers/videoController.js';

const router = Router();

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/api/upload', upload.single('video'), uploadVideo);
router.get('/videos', getVideos);
router.patch('/videos/:id', updateVideoStats);

export default router;
