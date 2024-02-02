import axios from "axios";

export const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `key=${process.env.FIREBASE_CLOUD_MESSAGING_SERVER_KEY}`,
  },
});

// instance.interceptors.request.use(async (config) => {
//   const token = await getAccessToken();
//   config.headers.Authorization = `Bearer ${token}`;

//   return config;
// });
