<template>
  <v-card outlined class="mb-3">
    <div class="d-flex mx-3 mt-3">
      <span class="mr-auto">{{ lecture.lectureOrder }}</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
        </template>
        <v-list>
          <v-list-item v-for="(menu, index) in menus" :key="index" link>
            <v-list-item-title v-text="menu"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-card-title>{{ lecture.lectureName }}</v-card-title>
    <v-card-subtitle
      >{{ lecture.lectureDate }} {{ lecture.startTime }}~{{
        lecture.endTime
      }}</v-card-subtitle
    >
    <v-card-actions class="justify-end">
      <v-btn outlined text>출석 관리</v-btn>
      <v-btn outlined text>과제 관리</v-btn>
      <v-btn outlined text>평가 관리</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LectureInfo",
  props: {
    lecture: Object,
  },
  data() {
    return {
      menus: ["수정", "삭제"],
    };
  },
};
</script>

<style>
.v-icon:hover {
  color: black;
}
</style>