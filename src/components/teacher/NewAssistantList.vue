<template>
  <v-container class="mt-8">
    <v-row
      class="d-flex"
      v-for="(assistant, index) in waitAssistants"
      :key="index"
    >
      <new-assistant-list-item :course="assistant"></new-assistant-list-item>
    </v-row>
  </v-container>
</template>

<script>
import NewAssistantListItem from "@/components/teacher/NewAssistantListItem";
import { mapState, mapActions } from "vuex";
const assistantStore = "assistantStore";
// const courseStore = "courseStore";
export default {
  name: "NewAssistantList",
  components: {
    NewAssistantListItem,
  },
  computed: {
    ...mapState(assistantStore, ["waitAssistants"]),
    // ...mapState(courseStore, ["courses"]),
  },
  data() {
    return {};
  },
  created() {
    console.log(this.waitAssistants);
  },
  methods: {
    ...mapActions(assistantStore, [
      "addHireInfo",
      "removeHireInfo",
      "setAssistantCourse",
      "getWaitAssistant",
    ]),
  },
};
</script>

<style scoped></style>
