// import { getToken } from "@firebase/messaging";
import axios from "axios";

// import { messaging } from "@/firebase";

export const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (config) => {
  // const token = await getToken(messaging);
  // config.headers.Authorization = `Bearer ${token}`;

  return config;
});
