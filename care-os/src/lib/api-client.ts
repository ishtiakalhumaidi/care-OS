import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

// 1. Public API (for login, register, etc.)
export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 2. Protected Server API (for data management)
export const serverApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor to automatically attach the Bearer token on the server
serverApi.interceptors.request.use(async (config) => {
  // Ensure this only runs on the Next.js server context
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    
    const cookieStore = await cookies(); 
    const token = cookieStore.get("accessToken")?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});