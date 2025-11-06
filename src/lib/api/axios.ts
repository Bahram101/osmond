import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000/api");

export const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
