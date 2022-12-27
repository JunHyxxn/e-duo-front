import { getApiInstance } from "./index.js";

const api = getApiInstance();

async function getStudentDetail(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.post("/api/students/detail", payload).then(success).catch(fail);
}

// async function getWaitAssistant(payload, success, fail) {
//   api.defaults.headers["Authorization"] =
//     "Bearer " + localStorage.getItem("access-token");
//   await api.post("/api/wait-assistant", payload).then(success).catch(fail);
// }

export { getStudentDetail };
