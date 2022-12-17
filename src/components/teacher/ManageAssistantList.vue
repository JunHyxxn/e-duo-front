<template>
  <v-container class="mt-8">
    <v-row class="d-flex" v-for="(num, index) in [1, 2, 3, 4, 5]" :key="index">
      <manage-assistant-list-item :num="num"></manage-assistant-list-item>
    </v-row>
  </v-container>
</template>

<script>
import ManageAssistantListItem from "@/components/teacher/ManageAssistantListItem.vue";

export default {
  name: "ManageAssistantList",
  components: {
    ManageAssistantListItem,
  },
};
</script>

<style scoped></style>
