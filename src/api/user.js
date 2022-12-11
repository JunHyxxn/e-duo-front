import { getApiInstance } from "@/api";

const api = getApiInstance();

async function socialLogin(config, success, fail) {
  await api.post(`/auth/oauthlogin`, config).then(success).catch(fail);
}

export {
  socialLogin,
}