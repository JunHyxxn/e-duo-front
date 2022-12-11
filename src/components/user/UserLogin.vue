<template>
  <div>
    <router-link to="/login/role">회원가입</router-link>
    <v-btn @click="social">소셜로그인</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState('userStore', ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions('userStore', ["socialLogin", "userConfirm"]),
    social() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email",
        success: (authObj) => {
          let token = authObj["access_token"];
          console.log(token);
          this.gosocial(token);
          if(this.isLogin) {
            this.$router.push("/main"); // 메인 페이지로 이동
          } else {
            if(this.userInfo.userId != null) {
              this.$router.push("/login/role")
            } else {
              alert("카카오톡과 통신 중 오류가 발생했습니다!");
            }
          }
        },
      });
    },
    async gosocial(token) {
      console.log("여기로 오니?");
      await this.socialLogin(token);
    }
  },
}
</script>

<style>

</style>