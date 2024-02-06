import path from 'path';
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type. Only JPEG, PNG, and GIF images are allowed.'
      )
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post('/', upload.single('image'), (req, res) => {
  const uploadedFile = req.file;
  console.log('Uploaded image:', uploadedFile);
  const { path } = req.file;
  const resultSlice = path.slice(path.indexOf('/uploads/'));

  res.send(resultSlice);
});

export default router;
