import { getApiInstance } from "./index.js";

const api = getApiInstance();

async function getWaitAssistant(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.post("/api/wait-assistant", payload).then(success).catch(fail);
}

async function acceptHire(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.post("/api/accept-assistant", payload).then(success).catch(fail);
}

async function rejectHire(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.delete("/api/reject-assistant", payload).then(success).catch(fail);
}

async function getCourseAssistants(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.post("/api/course-assistants", payload).then(success).catch(fail);
}
async function getCourseAssistant(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.post("/api/course-assistant", payload).then(success).catch(fail);
}
async function registerAssistant(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.post("/api/register-assistant", payload).then(success).catch(fail);
}

async function deleteAssistant(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.delete("/api/delete-assistant", payload).then(success).catch(fail);
}

export {
  getWaitAssistant,
  acceptHire,
  rejectHire,
  getCourseAssistants,
  getCourseAssistant,
  registerAssistant,
  deleteAssistant,
};
