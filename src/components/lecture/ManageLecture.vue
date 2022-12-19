<template>
  <v-container style="max-width: 450px" fill-height>
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card class="pt-3 mb-5">
          <v-list-item-title class="text-h4 mb-2 ms-3">
            강의 목록
          </v-list-item-title>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>
              <lecture-info
                v-for="(item, index) in lectures"
                :key="index"
                :lecture="item"
              ></lecture-info>
              <v-icon large>mdi-plus-circle-outline</v-icon>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
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
  // },
};
</script>

<style>
</style>