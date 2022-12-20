<template>
  <v-container>
    <div class="d-flex justify-center my-4">
      <h1>강의 목록</h1>
    </div>
    <v-container>
      <lecture-info
        v-for="(item, index) in lectures"
        :key="index"
        :lecture="item"
        @updateLectures="loadLectureList"
      ></lecture-info>
    </v-container>
    <div class="d-flex justify-center my-4">
      <v-icon large @click="moveAddLecture">mdi-plus-circle-outline</v-icon>
    </div>
  </v-container>
</template>

<script>
import LectureInfo from "@/components/lecture/LectureInfo.vue";
// import { loadCourseLectures } from "@/api/lecture";

export default {
  name: "ManageLecture",
  components: {
    LectureInfo,
  },
  data() {
    return {
      lectures: [
        {
          lectureId: "550e8400-e29b-41d4-a716-446655440000_1",
          coureseId: "550e8400-e29b-41d4-a716-446655440000",
          lectureName: "미분 적분의 이해 1",
          lectureDate: "강의 날짜",
          startTime: "강의시작시간",
          endTime: "강의끝나는시간",
          description: "미분 적분의 기초적인 이해 1",
          lectureOrder: "1-1",
        },
        {
          lectureId: "550e8400-e29b-41d4-a716-446655440000_2",
          coureseId: "550e8400-e29b-41d4-a716-446655440000",
          lectureName: "미분 적분의 이해 2",
          lectureDate: "강의 날짜",
          startTime: "강의시작시간",
          endTime: "강의끝나는시간",
          description: "미분 적분의 기초적인 이해 2",
          lectureOrder: "1-2",
        },
      ],
    };
  },
  // created() {
  //  this.loadLectureList();
  // },
  methods: {
    loadLectureList() {
      //   let courseId = this.$route.params.coureseId;
      //   this.lectures = loadCourseLectures(
      //     courseId,
      //     ({ data }) => {
      //       console.log(data);
      //       this.lectures = data;
      //     },
      //     (err) => {
      //       console.log(err);
      //     }
      //   );
    },
    moveAddLecture() {
      // 강의 추가 페이지로 이동
    },
  },
};
</script>

<style>
</style>