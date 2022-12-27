<template lang="">
  <v-card elevation="4" class="col-12 mt-8 pa-0 ma-0">
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
            총 출석률 : 98%
            <v-spacer></v-spacer>
            이번 달 출석률 : 79%
          </v-toolbar>
        </v-sheet>
        <v-sheet height="450">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
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
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
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
</template>
<script>
export default {
  name: "StudentAttendanceInfo",
  data() {
    return {
      focus: "",
      type: "month",
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [
        // events => getters 로 만들어줘야한다.
        {
          name: "출석",
          start: new Date("2022-12-24"),
          end: new Date("2022-12-24"),
          color: "green",
          timed: false,
        },
        {
          name: "결석",
          start: new Date("2022-12-22"),
          end: new Date("2022-12-22"),
          color: "red",
          timed: false,
        },
        {
          name: "과제 제출",
          start: new Date("2022-12-22"),
          end: new Date("2022-12-22"),
          color: "blue",
          timed: false,
        },
        {
          name: "과제 없음",
          start: new Date("2022-12-25"),
          end: new Date("2022-12-25"),
          color: "brown",
          timed: false,
        },
        {
          name: "과제 미제출",
          start: new Date("2022-12-15"),
          end: new Date("2022-12-15"),
          color: "pink",
          timed: false,
        },
      ],
      // colors: [
      //   "blue",
      //   "indigo",
      //   "deep-purple",
      //   "cyan",
      //   "green",
      //   "orange",
      //   "grey darken-1",
      // ],
      // names: ["출석", "결석", "과제 완료", "과제 없음", "과제 미완료"],
    };
  },
  mounted() {
    this.$refs.calendar.checkChange();
    this.focus = new Date();
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
