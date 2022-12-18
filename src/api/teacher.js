import { getApiInstance } from "./index.js";

const api = getApiInstance();

async function getWaitAssistant(payload, success, fail) {
  api.default.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  await api.post("/api/wait-assistant", payload).then(success).catch(fail);
}

export { getWaitAssistant };
