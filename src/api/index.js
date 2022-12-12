import axios from "axios";

function getApiInstance() {
  const instance = axios.create({
    baseURL: "http://localhost/eduo",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  return instance;
}

export {getApiInstance};