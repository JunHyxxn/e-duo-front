import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "http://localhost/eduo",
  headers: {
    "Content-Type": "text/plain;charset=utf-8",
  },
});
