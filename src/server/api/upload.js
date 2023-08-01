import aws from "aws-sdk";
import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import cors from "cors";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";

const app = express();

const s3 = new S3Client({
  credentials: {
    accessKeyId: "DO00FNPPZNQR6YNVTXUE",
    secretAccessKey: "K6YAHLX2JcexeS3AFMRzeF6dlj0Cf2SiviqBFzY9BDA",
  },
  region: "fra1",
  endpoint: "https://fra1.digitaloceanspaces.com",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const s3Storage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "salon.images",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now().toString()}${ext}`);
    },
  }),
});

app.post("/api/upload", s3Storage.single("file"), (req, res) => {
  res.json({ fileUrl: req.file.location });
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
