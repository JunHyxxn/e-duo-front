import {
  getStudentDetail,
  getAttendanceList,
  // getScoreList,
} from "@/api/student";

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
        testType: "REVIEW",
        testScore: 95,
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
        testType: "SUMMARY",
        testScore: 98,
      },
      {
        attendamceId: 5,
        lectureId: 8,
        studentId: "student123@eduo.com",
        assignment: 1,
        doneDate: "2022-12-21 23:42:12",
        checkIn: 0,
        lectureDate: "2022-12-21 23:42:12",
        testType: "REVIEW",
        testScore: "79",
      },
      {
        attendamceId: 6,
        lectureId: 9,
        studentId: "student123@eduo.com",
        assignment: 2,
        doneDate: "2022-12-24 23:42:12",
        checkIn: 1,
        lectureDate: "2022-12-24 23:42:12",
        testType: "REVIEW",
        testScore: 75,
      },
    ],
    scoreList: [],
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
    examData: (state) => {
      let labels = [];
      let data = [];
      let label = "";
      let borderColor = "";
      let backgroundColor = "";
      if (state.scoreList == null || state.scoreList.length == 0) return null;
      let type = state.scoreList[0].type;
      if (type === "MOCK") {
        label = "교육청 모의고사";
        backgroundColor = "rgb(186,205,232, .5)";
        borderColor = "rgb(186,205,232)";
      } else if (type === "MIDTERM") {
        label = "중간고사";
        backgroundColor = "rgb(183,227,171, .5)";
        borderColor = "rgb(183,227,171)";
      } else if (type === "FINAL") {
        label = "기말고사";
        backgroundColor = "rgb(212,138,125, .5)";
        borderColor = "rgb(212,138,125)";
      } else if (type === "SAT") {
        label = "평가원 모의고사";
        backgroundColor = "rgb(113,208,202, .5)";
        borderColor = "rgb(113,208,202)";
      }
      state.scoreList.forEach((info) => {
        labels.push(
          info.examDate.substr(0, 4) +
            "년 " +
            info.examDate.substr(5, 2) +
            "월 " +
            info.examName
        );

        data.push(info.score);
      });

      return {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            fill: true,
            pointBorderWidth: 2,
            pointRadius: 8,
            tension: 0.25,
          },
        ],
      };
    },
    testData: (state) => {
      let labels = [];
      let data = [];
      for (let info of state.attendanceList) {
        if (!info.testType) continue;
        labels.push(
          info.lectureDate.substr(0, 10) +
            " " +
            (info.testType === "REVIEW" ? "리뷰 테스트" : "종합 평가")
        );
        data.push(info.testScore);
      }
      if (data.length === 0) return null;
      return {
        labels: labels,
        datasets: [
          {
            label: "주-월간 테스트",
            data: data,
            borderColor: "rgb(56,84,168)",
            backgroundColor: "rgb(56,84,168, .5)",
            fill: true,
            pointBorderWidth: 2,
            pointRadius: 8,
            tension: 0.25,
          },
        ],
      };
    },
  },

  mutations: {
    SET_STUDENT_INFO: (state, data) => {
      state.studentInfo = data;
    },
    SET_ATTENDANCE_LIST: (state, data) => {
      state.attendanceList = data;
    },
    SET_SCORE_LIST: (state, data) => {
      state.scoreList = data;
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
        payload,
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

    getScoreList: async ({ commit }, payload) => {
      console.log(payload);
      commit("SET_SCORE_LIST", [
        {
          examId: 1,
          type: payload.type,
          examName: "교육청 모의고사",
          examDate: "2021-09",
          score: Math.floor(Math.random() * 101),
        },
        {
          examId: 2,
          type: payload.type,
          examName: "교육청 모의고사",
          examDate: "2021-11",
          score: Math.floor(Math.random() * 101),
        },
        {
          examId: 3,
          type: payload.type,
          examName: "교육청 모의고사",
          examDate: "2021-12",
          score: Math.floor(Math.random() * 101),
        },
        {
          examId: 4,
          type: payload.type,
          examName: "교육청 모의고사",
          examDate: "2022-03",
          score: Math.floor(Math.random() * 101),
        },
        {
          examId: 5,
          type: payload.type,
          examName: "교육청 모의고사",
          examDate: "2022-04",
          score: Math.floor(Math.random() * 101),
        },
        {
          examId: 6,
          type: payload.type,
          examName: "교육청 모의고사",
          examDate: "2022-06",
          score: Math.floor(Math.random() * 101),
        },
        {
          examId: 7,
          type: payload.type,
          examName: "교육청 모의고사",
          examDate: "2022-08",
          score: Math.floor(Math.random() * 101),
        },
        {
          examId: 8,
          type: payload.type,
          examName: "교육청 모의고사",
          examDate: "2022-10",
          score: Math.floor(Math.random() * 101),
        },
        {
          examId: 9,
          type: payload.type,
          examName: "교육청 모의고사",
          examDate: "2022-11",
          score: Math.floor(Math.random() * 101),
        },
        {
          examId: 10,
          type: payload.type,
          examName: "교육청 모의고사",
          examDate: "2022-12",
          score: Math.floor(Math.random() * 101),
        },
      ]);

      // // use api 통신
      // await getScoreList(
      //   payload,
      //   (response) => {
      //     console.log(response);
      //     if (response.status === 200) {
      //       commit("SET_SCORE_LIST", response.data);
      //     }
      //   },
      //   async (error) => {
      //     console.log(error);
      //     if (error.response.status === 401) {
      //       // regenerate accessToken by refreshToken
      //     } else if (error.response.status === 400) {
      //       // 실패
      //       return;
      //     } else if (error.response.status === 403) {
      //       // 권한 X
      //       return;
      //     } else if (error.response.status === 500) {
      //       // 서버 에러
      //       return;
      //     }
      //     await getScoreList(
      //       payload,
      //       (response) => {
      //         console.log(response);
      //         if (response.status === 200) {
      //           commit("SET_SCORE_LIST", response.data);
      //         }
      //       },
      //       (error) => {
      //         if (error.response.status === 400) {
      //           // 실패
      //           return;
      //         } else if (error.response.status === 403) {
      //           // 권한 X
      //           return;
      //         } else if (error.response.status === 500) {
      //           // 서버 에러
      //           return;
      //         }
      //       }
      //     );
      //   }
      // );
    },
  },
};

export default studentStore;
