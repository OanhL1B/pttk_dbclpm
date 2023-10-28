import axios from "axios";

// api public
export const APIPUBLIC = axios.create({
  baseURL: "http://localhost:5000/",
});

// api admin
export const APIV1 = axios.create({ baseURL: "http://localhost:5000/" });

APIV1.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).accessToken
    }`;
  }
  return req;
});
