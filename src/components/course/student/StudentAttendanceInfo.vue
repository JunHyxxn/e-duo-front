<template lang="">
  <v-container class="mt-8">
    <v-chip class="mb-5" large> 출석 정보 </v-chip>
    <v-card elevation="4" class="col-12 mt-3 pa-0 ma-0">
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                Today
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              총 출석률 : {{ getTotalAttendanceRate }} %
              <v-spacer></v-spacer>
              <div v-if="$refs.calendar">
                {{ $refs.calendar.lastEnd.month }}월 출석률 :
                {{
                  getThisMonthAttendanceRate({
                    startDate: $refs.calendar.lastStart.date,
                    endDate: $refs.calendar.lastEnd.date,
                  })
                }}%
              </div>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="450">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="getEvents"
              :type="type"
              @click:event="showEvent"
              @click:date="viewDay"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="200px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
const studentStore = "studentStore";
export default {
  name: "StudentAttendanceInfo",
  data() {
    return {
      focus: "",
      type: "month",
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
    };
  },
  created() {
    // this.getAttendanceList({
    //   userId: "학생Id",
    //   courseId: "courseId"
    // });
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.focus = new Date();
  },
  computed: {
    ...mapGetters(studentStore, [
      "getEvents",
      "getTotalAttendanceRate",
      "getThisMonthAttendanceRate",
    ]),
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>
<style lang=""></style>
