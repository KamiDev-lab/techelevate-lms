// api/middleware/upload.js (or wherever your multer config is)
import multer from "multer";
import { uploadMedia } from "../utils/cloudinary.js"; // Your existing cloudinary functions

// Use memory storage instead of disk storage for Vercel compatibility
export const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow both images and videos
    if (file.mimetype.startsWith('video/') || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video and image files are allowed!'), false);
    }
  }
});

// Helper function to convert buffer to base64 data URL for Cloudinary
export const bufferToDataURL = (buffer, mimetype) => {
  const base64 = buffer.toString('base64');
  return `data:${mimetype};base64,${base64}`;
};

// Updated upload handler that works with your existing uploadMedia function
export const handleFileUpload = async (file) => {
  try {
    // Convert buffer to data URL
    const dataURL = bufferToDataURL(file.buffer, file.mimetype);
    
    // Use your existing uploadMedia function
    const result = await uploadMedia(dataURL);
    
    return {
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        duration: result.duration,
        format: result.format
      }
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Upload failed");
  }
};