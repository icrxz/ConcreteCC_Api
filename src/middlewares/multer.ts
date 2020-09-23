import path from 'path';
import aws from 'aws-sdk';
import bcrypt from 'bcrypt';
import multer from 'multer';
import multerS3 from 'multer-s3';

aws.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ID || '',
    secretAccessKey: process.env.AWS_SECRET || '',
  },
  region: process.env.AWS_REGION || '',
})

const storageType = multerS3({
    s3: new aws.S3(),
    bucket: process.env.AWS_BUCKET_NAME || '',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      bcrypt.genSalt(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString()}-${file.originalname}`;

        cb(null, fileName);
      });
    }
  })
;

module.exports = multer({
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageType,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
});
