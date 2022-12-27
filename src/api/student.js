import { getApiInstance } from "./index.js";

const api = getApiInstance();

async function getStudentDetail(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.post("/api/students/detail", payload).then(success).catch(fail);
}

// method & url 변경 예정
async function getAttendanceList(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.get("/api/sugang", payload).then(success).catch(fail);
}

export { getStudentDetail, getAttendanceList };
