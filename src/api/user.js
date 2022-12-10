import { getApiInstance } from "@/api";

const api = getApiInstance();

async function socialLogin(accessToken, success, fail) {
  await api.post(`/auth/oauthlogin`, {accessToken : accessToken}).then(success).catch(fail);
}

export {
  socialLogin,
}