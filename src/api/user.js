import axios from "@/api/util/httpUtil";

async function socialLogin(config, success, fail) {
  await axios.post(`/auth/oauthlogin`, config).then(success).catch(fail);
}

export {
  socialLogin,
}