<template>
  <v-container class="mt-8" style="width: 80%">
    <v-row>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h4">
            Spring Boot & React 강좌</v-list-item-title
          >
          <v-list-item-subtitle class="text-h5"> SSAFY</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-row>
    <student-basic-info></student-basic-info>
    <student-attendance-info></student-attendance-info>
    <student-exam-info></student-exam-info>
    <student-video-info></student-video-info>
    <student-issue-info></student-issue-info>
  </v-container>
</template>
<script>
import StudentBasicInfo from "@/components/course/student/StudentBasicInfo";
import StudentAttendanceInfo from "@/components/course/student/StudentAttendanceInfo.vue";
import StudentExamInfo from "@/components/course/student/StudentExamInfo.vue";
import StudentVideoInfo from "@/components/course/student/StudentVideoInfo.vue";
import StudentIssueInfo from "@/components/course/student/StudentIssueInfo.vue";
export default {
  name: "CourseStudentDetail",
  components: {
    StudentBasicInfo,
    StudentAttendanceInfo,
    StudentExamInfo,
    StudentVideoInfo,
    StudentIssueInfo,
  },
  props: {
    courseId: String,
    studentId: String,
  },
};
</script>
<style lang=""></style>
