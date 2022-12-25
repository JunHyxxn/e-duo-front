<template>
  <v-container class="mt-8">
    <v-row class="text-h5">📔 나의 조교 관리 </v-row>
    <v-expansion-panels
      v-for="(courseAssistant, index) in courseAssistants"
      :key="index"
    >
      <manage-assistant-list-item
        class="mt-8"
        :courseAssistant="courseAssistant"
        :index="index"
      ></manage-assistant-list-item>
    </v-expansion-panels>

    <v-row class="mt-8" justify="center">
      <v-col class="me-3" cols="1">
        <v-btn elevation="4" rounded @click="updateClick">승인</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ManageAssistantListItem from "@/components/teacher/ManageAssistantListItem.vue";
import { mapState, mapActions } from "vuex";
const teacherStore = "teacherStore";
const userStore = "userStore";
export default {
  name: "ManageAssistantList",
  components: {
    ManageAssistantListItem,
  },
  created() {
    // this.getCourseAssistants({
    //   userId: this.userInfo.userId,
    // });
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    ...mapState(teacherStore, ["courseAssistants"]),
  },
  methods: {
    ...mapActions(teacherStore, ["getCourseAssistants"]),
    updateClick() {},
  },
};
</script>

<style scoped></style>
