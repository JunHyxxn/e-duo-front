<template>
  <v-toolbar id="main-container" class="flex-grow-0" color="#C6C5B9" dark>
    <router-link to="/"> 로고 들어갈 거에요 </router-link>
    <router-link to="/">
      <v-toolbar-title class="mx-right-2">E-Duo</v-toolbar-title>
    </router-link>
    <v-toolbar-items>
      <router-link to="/student">
        <v-btn plain height="100%"> 학생관리 </v-btn>
      </router-link>
      <router-link to="/notice">
        <v-btn plain height="100%"> 공지사항 </v-btn>
      </router-link>
      <router-link
        v-if="userInfo != null && userInfo.role === 'ROLE_TEACHER'"
        to="/manage-assistant"
      >
        <v-btn plain height="100%"> 조교관리 </v-btn>
      </router-link>
      <router-link to="/video">
        <v-btn plain height="100%"> 영상관리 </v-btn>
      </router-link>
      <router-link to="/qna">
        <v-btn plain height="100%"> Q&A </v-btn>
      </router-link>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <router-link to="/user" v-if="true">
      <v-btn color="#7A7067">시작하기</v-btn>
    </router-link>
    <router-link v-else to="/userMain">
      <v-btn v-if="true" color="#7A7067"> 이름이 들어갈 예정 님 </v-btn>
    </router-link>
    <v-btn v-if="true"> 로그아웃 </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
const userStore = "userStore";
export default {
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
};
</script>

<style>
.v-application a {
  text-decoration: inherit;
  color: inherit;
}
</style>
