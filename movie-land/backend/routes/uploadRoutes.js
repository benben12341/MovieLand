const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
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

  res.send(`/${req.file.path}`);
});

module.exports = router;
