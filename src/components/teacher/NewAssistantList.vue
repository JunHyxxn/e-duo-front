<template>
  <v-container class="mt-8">
    <div v-if="waitAssistants != null && waitAssistants.length != 0">
      <v-row class="text-h5">🎊 신규 조교 관리 </v-row>
      <v-row
        class="d-flex"
        v-for="(assistant, index) in waitAssistants"
        :key="index"
      >
        <new-assistant-list-item
          class="mt-8"
          :assistant="assistant"
        ></new-assistant-list-item>
      </v-row>
      <v-row class="mt-8" justify="center">
        <v-col class="me-3" cols="1">
          <v-btn elevation="4" rounded @click="acceptAssistant">승인</v-btn>
        </v-col>
        <!-- <v-col cols="1"></v-col> -->

        <v-col class="ms-3" cols="1">
          <v-btn elevation="4" rounded @click="rejcetAssistant">거부</v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <no-content></no-content>
    </div>
  </v-container>
</template>

<script>
import NewAssistantListItem from "@/components/teacher/NewAssistantListItem";
import NoContent from "@/components/teacher/NoContent.vue";

import { mapState, mapActions } from "vuex";
const teacherStore = "teacherStore";
const userStore = "userStore";
export default {
  name: "NewAssistantList",
  components: {
    NewAssistantListItem,
    NoContent,
  },
  computed: {
    ...mapState(teacherStore, ["waitAssistants", "hireInfos"]),
    ...mapState(userStore, ["userInfo"]),
  },
  data() {
    return {};
  },
  created() {
    console.log(this.waitAssistants);
    this.setHireInfo({});
  },
  methods: {
    ...mapActions(teacherStore, [
      "setHireInfo",
      "getWaitAssistant",
      "acceptHire",
      "rejectHire",
    ]),
    selectedCheck() {
      return Object.keys(this.hireInfos).length != 0;
    },
    acceptAssistant() {
      // object length => Object.keys(obj).length
      console.log("승인 버튼 클릭!!");
      console.log(this.hireInfos);
      if (!confirm("📔 선택한 조교를 승인하시겠습니까?")) {
        return;
      }
      if (!this.selectedCheck()) {
        alert("😃 조교를 선택해주세요.");
        return;
      }
      let payload = [];
      for (let [key, value] of Object.entries(this.hireInfos)) {
        console.log(key);
        console.log(value);
        if (value.length == 0) {
          alert("😉 강좌를 채워주세요.");
          return;
        }
        payload.push({
          teacherUserId: this.userInfo.userId,
          assistantUserId: key,
          courses: value,
        });
      }
      this.acceptHire(payload);
    },
    rejcetAssistant() {
      console.log("거부 버튼 클릭!!");
      console.log(this.hireInfos);
      if (!confirm("📔 선택한 조교를 거부 하시겠습니까?")) {
        return;
      }
      if (!this.selectedCheck()) {
        alert("😃 조교를 선택해주세요.");
        return;
      }
      let payload = {
        teacherUserId: this.userInfo.userId,
        assistants: Object.keys(this.hireInfos),
      };
      this.rejectHire(payload);
    },
  },
};
</script>

<style scoped></style>
