import multer from "multer";

// Multer Storage Configuration (In-Memory)
const storage = multer.memoryStorage();

const upload = multer({
  storage});

export default upload;
