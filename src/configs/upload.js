const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

const TPM_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOAD_FOLDER = path.resolve(TPM_FOLDER, "uploads");

const MULTER = {
  storage: multer.diskStorage({
    destination: TPM_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex")  // (formato hexadecimal);
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName);
    }
  })
}

module.exports = {
  TPM_FOLDER,
  UPLOAD_FOLDER,
  MULTER
}