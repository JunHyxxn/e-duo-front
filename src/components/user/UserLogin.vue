<template>
  <v-container style="max-width: 450px" fill-height>
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <div class="pa-10">
            <h1 style="text-align: center" class="mb-10">Login</h1>
            <form>
              <v-text-field
                label="ID"
                prepend-inner-icon="mdi-account"
                v-model="user.userId"
              ></v-text-field>
              <v-text-field
                prepend-inner-icon="mdi-lock"
                type="password"
                label="Password"
                v-model="user.password"
              >
              </v-text-field>
              <v-btn
                @click="login"
                type="submit"
                color="#62929E"
                depressed
                large
                block
                dark
                class="mb-3"
              >
                로그인
              </v-btn>
              <v-btn
                type="submit"
                depressed
                large
                block
                class="d-flex justify-space-between mb-3"
                color="#FEE500"
                text-col
                @click="social"
              >
                <v-icon color="#000000" class="align-left">mdi-chat</v-icon>
                카카오 로그인
                <span></span>
              </v-btn>
              <div class="text-center">
                <v-chip class="ma-2" label> ID찾기 </v-chip>
                <v-chip class="ma-2" label>
                  <v-icon left> mdi-label </v-icon>
                  비번찾기
                </v-chip>
                <v-chip class="ma-2" label>
                  <v-icon left> mdi-account-circle-outline </v-icon>
                  <router-link to="/login/role">회원가입</router-link>
                </v-chip>
              </div>
            </form>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "TheLogin",
  data() {
    return {
      user: {
        userId: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState("userStore", ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions("userStore", ["socialLogin", "userConfirm"]),
    social() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, account_email",
        success: (authObj) => {
          let token = authObj["access_token"];
          console.log(token);
          this.gosocial(token);
          if (this.isLogin) {
            this.$router.push("/main"); // 메인 페이지로 이동
          } else {
            if (this.userInfo.userId != null) {
              this.$router.push("/login/role");
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
    },
    login() {
      this.userConfirm(this.user);
    },
  },
};
</script>

<style>
.social-login {
  border-radius: 4px;
}
</style>