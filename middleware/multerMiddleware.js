import multer from "multer";

// Multer Storage Configuration (In-Memory)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 40 * 1024 * 1024 }, // 40MB max file size
});

export default upload;
