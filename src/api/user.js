import { getApiInstance } from "@/api";

const api = getApiInstance();

async function socialLogin(accessToken, success, fail) {
  api.defaults.headers["Authorization"] = "Bearer " + accessToken;
  await api.post(`/auth/oauthlogin`).then(success).catch(fail);
}

async function login(user, success, fail) {
  await api.post("/auth/login", user).then(success).catch(fail);
}

export {
  socialLogin,
  login,
}