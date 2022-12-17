<template>
  <v-container> {{ num }} </v-container>
</template>

<script>
export default {
  name: "ManageAssistantListItem",
  props: {
    num: Number,
  },
  created() {
    console.log(this.num);
  },
  methods: {},
};
</script>

<style scoped></style>
