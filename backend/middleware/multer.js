const express = require("express");
const multer = require("multer");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/public", upload.single(image), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const imageUrl = req.file.path;
  res.send({ imageUrl });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
