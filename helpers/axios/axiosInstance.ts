import { authKey } from "@/utils/storageKey";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create({
  headers: {
    withCredentials: false,
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Headers":
    // "Content-Type, X-Amz-Date, Authorization, X-Api-KeyboardEvent, X-Amz-Security-Token",
  },
});

// for post
instance.defaults.headers.post["Content-Type"] = "application/json";
// receive type
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // you can write or call a function here to add auth header
    // example below
    // const accessToken = localStorage.getItem('token');
     const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiQ1VTVE9NRVIiLCJ1c2VySWQiOjgsInVzZXJuYW1lIjoiMDE3OTc5OTMxMzEiLCJzdWIiOiIwMTc5Nzk5MzEzMSIsImlhdCI6MTc3MTczMDUzNCwiZXhwIjoxNzcxODE2OTM0fQ.SgOvXlo6RmqEUxqDmmhedTnGwwJnsStCM8hO5pAbeHs";

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  // if any error while make request return error
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
    // return Promise.resolve(responseObject);
  },
  function (error) {
    // return error;
    return Promise.reject(error);
  }
);

export { instance };  
