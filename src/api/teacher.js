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
  await api.post("/api/accept", payload).then(success).catch(fail);
}

async function rejectHire(payload, success, fail) {
  api.defaults.headers["Authorization"] =
    "Bearer " + localStorage.getItem("access-token");
  await api.delete("/api/reject", payload).then(success).catch(fail);
}

export { getWaitAssistant, acceptHire, rejectHire };
