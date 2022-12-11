<template>
  <div>회원가입 폼</div>
</template>

<script>
export default {
    
  created() {
    let type = this.$route.params.type;
    let role = this.$route.params.role;
    if (type == "social") {
      console.log("소셜 로그인.");
      console.log(role);
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email",
        success: (authObj) => {
          console.log(authObj["access_token"]);
        },
      });
    } else {
      console.log(role);
      console.log("일반 로그인.");
    }
  },
};
</script>

<style></style>
