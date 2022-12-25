<template>
  <v-container>
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
};
</script>
<style lang=""></style>
