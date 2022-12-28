<template lang="">
  <v-container class="mt-8">
    <v-chip class="mb-5" large> 기본 정보 </v-chip>
    <v-card elevation="4" class="col-12 pa-0 ma-0">
      <v-card-text>
        <v-row align-content="center" justify="center">
          <v-col align-self="center" style="text-align: center">
            <v-row>
              <div class="text-h6 font-weight-medium mb-2">
                {{ studentInfo.name }}
              </div>
            </v-row>
            <v-row>
              <div class="grey--text text-caption">
                {{ studentInfo.birthDate }}
              </div>
            </v-row>
          </v-col>
          <v-col align-self="center" style="text-align: center">
            <div class="text-h6 font-weight-medium">
              {{ studentInfo.schoolName }} {{ studentInfo.grade }}학년
            </div>
          </v-col>
          <v-col align-self="center" style="text-align: center">
            {{ studentInfo.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") }}
          </v-col>
        </v-row>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-row>
          <v-col align-self="center" style="text-align: center">
            함께한 기간 : {{ calcDiff() }}
          </v-col>
          <v-col align-self="center" style="text-align: center">
            <div class="text-h6 font-weight-medium">
              {{ studentInfo.parent }}
            </div>
          </v-col>
          <v-col align-self="center" style="text-align: center">
            {{
              studentInfo.parentPhone.replace(
                /(\d{3})(\d{4})(\d{4})/,
                "$1-$2-$3"
              )
            }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
let studentStore = "studentStore";
export default {
  name: "StudentBasicInfo",
  created() {
    // this.getStudentDetail({
    //   userId: "studentId",
    //   courseId: "courseId"
    // });
  },
  computed: {
    ...mapState(studentStore, ["studentInfo"]),
  },
  methods: {
    calcDiff() {
      let today = new Date();
      let from = new Date(this.studentInfo.startDate);
      var elapsed = today.getTime() - from.getTime();
      var elapsedDay = elapsed / 1000 / 60 / 60 / 24; // 두날짜의 차이 일수

      var year;
      var month;
      var day;

      if (elapsedDay < 30) {
        day = elapsedDay;
        return Math.trunc(day) + "일";
      } else if (elapsedDay < 365) {
        month = Math.floor(elapsedDay / 30);
        day = elapsedDay - month * 30;
        return month + "개월 " + Math.trunc(day) + "일";
      } else {
        year = Math.floor(elapsedDay / 365);
        month = Math.floor((elapsedDay - year * 365) / 30);
        day = elapsedDay - year * 365 - month * 30;
        return year + "년 " + month + "개월 " + Math.trunc(day) + "일";
      }
    },
  },
};
</script>
<style lang=""></style>
