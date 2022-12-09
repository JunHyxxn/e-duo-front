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
              <v-img
                src="@/assets/kakao_login_medium_wide.png"
                class="social-login mb-3"
                max-height="44px"
              ></v-img>
              <div class="text-center">
                <v-chip class="ma-2" label> ID찾기 </v-chip>
                <v-chip class="ma-2" label>
                  <v-icon left> mdi-label </v-icon>
                  비번찾기
                </v-chip>
                <v-chip class="ma-2" label>
                  <v-icon left> mdi-account-circle-outline </v-icon>
                  회원가입
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
import { mapActions } from "vuex";

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
  created() {},
  methods: {
    ...mapActions("userStore", ["userConfirm"]),
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