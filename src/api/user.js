import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post("/auth/login", user).then(success).catch(fail);
}

export { login };