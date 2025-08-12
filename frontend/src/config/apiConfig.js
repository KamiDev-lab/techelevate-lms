// frontend/src/config/apiConfig.js

// Base API URL configuration

export const BASE_API_URL = "http://localhost:3000"
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || BASE_API_URL;

// Individual service URLs for RTK Query
export const API_ENDPOINTS = {
  USER: `${VITE_BACKEND_URL}/api/v1/user`,
  COURSE: `${VITE_BACKEND_URL}/api/v1/course`,
  PROGRESS: `${VITE_BACKEND_URL}/api/v1/progress`,
  PURCHASE: `${VITE_BACKEND_URL}/api/v1/purchase`,
  MEDIA: `${VITE_BACKEND_URL}/api/v1/media`,
};

// For direct axios calls (like in your LectureTab component)
export const MEDIA_API = API_ENDPOINTS.MEDIA;

export default API_ENDPOINTS;