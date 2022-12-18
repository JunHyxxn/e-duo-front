<template>
  <v-container class="mt-8">
    <div v-if="waitAssistants != null && waitAssistants.length != 0">
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
const assistantStore = "assistantStore";
// const courseStore = "courseStore";
export default {
  name: "NewAssistantList",
  components: {
    NewAssistantListItem,
    NoContent,
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
