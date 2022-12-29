<template lang="">
  <v-container class="mt-8">
    <v-row>
      <v-chip class="mb-5" large> 성적 조회 </v-chip>
      <v-spacer></v-spacer>
      <v-select
        v-model="selected"
        :items="types"
        label="시험 종류 선택"
        item-value="examType"
        dense
        solo
        @change="changeExam"
      >
        <template v-slot:selection="{ item }">
          <span>{{ item.examName }}</span>
        </template>
        <template v-slot:item="data">
          <template>
            <v-list-item-content>
              <v-list-item-title
                v-html="data.item.examName"
              ></v-list-item-title>
            </v-list-item-content>
          </template>
        </template>
      </v-select>
    </v-row>

    <v-card
      v-if="chartData === null"
      elevation="4"
      class="col-12 pa-0 ma-0 mt-5"
    >
      <v-card-text>
        <v-row justify="center">
          <div>🔥 현재 성적이 존재하지 않습니다</div>
        </v-row>
      </v-card-text>
    </v-card>
    <line-chart v-else :chartData="chartData"></line-chart>
  </v-container>
</template>

<script>
import LineChart from "@/components/chart/LineChart.vue";
import { mapState, mapGetters, mapActions } from "vuex";

let studentStore = "studentStore";

export default {
  name: "StudentExamInfo",
  created() {
    // 교육청과 평가원을 합쳐도 될 듯?
    this.types = [
      {
        examName: "교육청 모의고사",
        examType: "MOCK",
      },
      {
        examName: "평가원 모의고사",
        examType: "SAT",
      },
      {
        examName: "중간고사",
        examType: "MIDTERM",
      },
      {
        examName: "기말고사",
        examType: "FINAL",
      },
      {
        examName: "주-월간 테스트",
        examType: "TEST",
      },
    ];
  },
  components: {
    LineChart,
  },
  computed: {
    ...mapState(studentStore, ["studentInfo"]),
    ...mapGetters(studentStore, ["examData", "testData"]),
  },
  data() {
    return {
      selected: "",
      types: [],
      chartData: null,
    };
  },
  methods: {
    ...mapActions(studentStore, ["getScoreList"]),
    changeExam() {
      if (this.selected === "TEST") {
        this.chartData = this.testData;
      } else {
        this.getScoreList({
          userId: this.studentInfo.userId,
          type: this.selected,
        });
        this.chartData = this.examData;
      }
    },
  },
};
</script>
<style lang=""></style>
