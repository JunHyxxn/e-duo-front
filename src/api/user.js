import axios from "@/api/util/httpUtil";

async function socialLogin(config, success, fail) {
  await axios.post(`/auth/oauthlogin`, config).then(success).catch(fail);
}

async function login(user, success, fail) {
  await axios.post("/auth/login", user).then(success).catch(fail);
}

export {
  socialLogin,
  login,
}