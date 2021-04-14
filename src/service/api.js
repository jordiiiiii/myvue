import axios from "axios";

export default () => {
  return axios.create({
    // baseURL: "http://127.0.0.1:8000",
    baseURL: "http://cryptic-springs-68672.herokuapp.com",
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
