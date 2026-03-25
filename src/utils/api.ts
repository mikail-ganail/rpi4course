// utils/api.ts
const BACKEND_URL = "http://localhost:5000";

export const getImageUrl = (path: string | undefined): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // Если путь начинается с /, добавляем базовый URL
  return `${BACKEND_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
