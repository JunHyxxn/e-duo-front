import { getStudentDetail, getAttendanceList } from "@/api/student";

const studentStore = {
  namespaced: true,
  state: {
    studentInfo: {
      userId: "student123@eduo.com",
      name: "김아무개",
      phone: "01012345678",
      birthDate: "2005-07-25",
      schoolName: "싸피고등학교",
      grade: "2",
      parent: "부",
      parentPhone: "01098765432",
      startDate: "2020-12-25",
    },
    attendanceList: [
      {
        attendamceId: 1,
        lectureId: 5,
        studentId: "student123@eduo.com",
        assignment: 1,
        doneDate: "2022-12-12 23:45:42",
        checkIn: 0,
        lectureDate: "2022-12-12 23:45:42",
      },
      {
        attendamceId: 2,
        lectureId: 6,
        studentId: "student123@eduo.com",
        assignment: 2,
        doneDate: "2022-11-13 23:45:42",
        checkIn: 1,
        lectureDate: "2022-11-13 23:45:42",
      },
      {
        attendamceId: 3,
        lectureId: 7,
        studentId: "student123@eduo.com",
        assignment: 0,
        doneDate: "2022-12-14 23:42:12",
        checkIn: 1,
        lectureDate: "2022-12-14 23:42:12",
      },
      {
        attendamceId: 5,
        lectureId: 8,
        studentId: "student123@eduo.com",
        assignment: 1,
        doneDate: "2022-12-21 23:42:12",
        checkIn: 0,
        lectureDate: "2022-12-21 23:42:12",
      },
      {
        attendamceId: 6,
        lectureId: 9,
        studentId: "student123@eduo.com",
        assignment: 2,
        doneDate: "2022-12-24 23:42:12",
        checkIn: 1,
        lectureDate: "2022-12-24 23:42:12",
      },
    ],
  },
  getters: {
    getEvents(state) {
      let events = [];
      let eventToColor = ["red", "green", "brown", "pink", "blue"];
      let eventToName = [
        "결석",
        "출석",
        "과제 없음",
        "과제 미제출",
        "과제 제출",
      ];
      for (let attendance of state.attendanceList) {
        let checkIn = attendance.checkIn;
        let assignment = attendance.assignment + 2;
        let date = new Date(attendance.lectureDate.substr(0, 10));
        events.push({
          name: eventToName[checkIn],
          start: date,
          end: date,
          color: eventToColor[checkIn],
          timed: false,
        });
        events.push({
          name: eventToName[assignment],
          start: date,
          end: date,
          color: eventToColor[assignment],
          timed: false,
        });
      }
      return events;
    },

    getTotalAttendanceRate(state) {
      let count = state.attendanceList.filter(
        (attendance) => attendance.checkIn === 1
      ).length;
      return ((count / state.attendanceList.length) * 100).toFixed(1);
    },
    getThisMonthAttendanceRate: (state) => (param) => {
      // const filtered = state.students.filter(student => student.state === "ACCEPTED");
      //   let today = new Date();

      let firstDate = new Date(param.startDate);

      let lastDate = new Date(param.endDate);

      let thisMonth = state.attendanceList.filter(
        (attendance) =>
          firstDate <= new Date(attendance.lectureDate.substr(0, 10)) &&
          new Date(attendance.lectureDate.substr(0, 10)) <= lastDate
      );
      if (thisMonth.length === 0) return 0;
      let count = thisMonth.filter((date) => date.checkIn === 1).length;
      return ((count / thisMonth.length) * 100).toFixed(1);
    },
  },

  mutations: {
    SET_STUDENT_INFO: (state, data) => {
      state.studentInfo = data;
    },
    SET_ATTENDANCE_LIST: (state, data) => {
      state.attendanceList = data;
    },
  },

  actions: {
    getStudentDetail: async ({ commit }, payload) => {
      await getStudentDetail(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            commit("SET_STUDENT_INFO", response.data);
          }
        },
        async (error) => {
          console.log(error);
          if (error.response.status === 401) {
            // regenerate accessToken by refreshToken
          } else if (error.response.status === 400) {
            // 실패
            return;
          } else if (error.response.status === 403) {
            // 권한 X
            return;
          } else if (error.response.status === 500) {
            // 서버 에러
            return;
          }
          await getStudentDetail(
            payload,
            (response) => {
              console.log(response);
              if (response.status === 200) {
                commit("SET_STUDENT_INFO", response.data);
              }
            },
            (error) => {
              if (error.response.status === 400) {
                // 실패
                return;
              } else if (error.response.status === 403) {
                // 권한 X
                return;
              } else if (error.response.status === 500) {
                // 서버 에러
                return;
              }
            }
          );
        }
      );
    },

    getAttendanceList: async ({ commit }, payload) => {
      await getAttendanceList(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            commit("SET_ATTENDANCE_LIST", response.data);
          }
        },
        async (error) => {
          console.log(error);
          if (error.response.status === 401) {
            // regenerate accessToken by refreshToken
          } else if (error.response.status === 400) {
            // 실패
            return;
          } else if (error.response.status === 403) {
            // 권한 X
            return;
          } else if (error.response.status === 500) {
            // 서버 에러
            return;
          }
          await getAttendanceList(
            payload,
            (response) => {
              console.log(response);
              if (response.status === 200) {
                commit("SET_ATTENDANCE_LIST", response.data);
              }
            },
            (error) => {
              if (error.response.status === 400) {
                // 실패
                return;
              } else if (error.response.status === 403) {
                // 권한 X
                return;
              } else if (error.response.status === 500) {
                // 서버 에러
                return;
              }
            }
          );
        }
      );
    },
  },
};

export default studentStore;
