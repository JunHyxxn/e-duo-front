import {
  getWaitAssistant,
  acceptHire,
  rejectHire,
  getCourseAssistants,
  getCourseAssistant,
  registerAssistant,
  deleteAssistant,
} from "@/api/teacher";
const teacherStore = {
  namespaced: true,
  state: {
    waitAssistants: [
      {
        userId: "sbd@eduo.com",
        name: "스토어",
        phone: "01011112222",
      },
      {
        userId: "inaa@eduo.com",
        name: "더미",
        phone: "01033334444",
      },
      {
        userId: "dummy@eduo.com",
        name: "데이터",
        phone: "01055556666",
      },
    ],
    hireInfos: {},
    courseAssistants: [
      {
        courseId: "M8Yj-qkg-LnG3",
        courseName: "2024 수능 대비 Debut 수학Ⅱ",
        academyName: "대치명인학원 대치캠퍼스",
        startDate: "2022-12-26",
        endDate: "2023-03-13",
        manageAssistants: [
          {
            userId: "inaa@eduo.com",
            name: "더미",
            phone: "01033334444",
          },
          {
            userId: "ihrug000@gmail.com",
            name: "김갑룡",
            phone: "01044441111",
          },
        ],
        possibleAssistants: [
          {
            userId: "sbd@eduo.com",
            name: "스토어",
            phone: "01011112222",
          },
          {
            userId: "inaa@eduo.com",
            name: "더미",
            phone: "01033334444",
          },
          {
            userId: "dummy@eduo.com",
            name: "데이터",
            phone: "01055556666",
          },
        ],
      },
      {
        courseId: "M6Gq-qkg-DnM2",
        courseName: "2024 수능 대비 Debut 미적분",
        academyName: "대치명인학원 대치캠퍼스",
        startDate: "2022-12-26",
        endDate: "2023-03-27",
        manageAssistants: [
          {
            userId: "sbd@eduo.com",
            name: "스토어",
            phone: "01011112222",
          },
          {
            userId: "inaa@eduo.com",
            name: "더미",
            phone: "01033334444",
          },
          {
            userId: "dummy@eduo.com",
            name: "데이터",
            phone: "01055556666",
          },
        ],
        possibleAssistants: [
          {
            userId: "inaa@eduo.com",
            name: "더미",
            phone: "01033334444",
          },
          {
            userId: "ihrug000@gmail.com",
            name: "김갑룡",
            phone: "01044441111",
          },
        ],
      },
    ],
  },
  getters: {},

  mutations: {
    SET_WAIT_ASSISTANTS: (state, data) => {
      state.waitAssistants = data;
    },
    SET_HIRE_INFO: (state, data) => {
      state.hireInfos = data;
    },
    ADD_HIRE_INFO: (state, assistantId) => {
      state.hireInfos[assistantId] = [];
    },
    REMOVE_HIRE_INFO: (state, assistantId) => {
      delete state.hireInfos[assistantId];
    },
    SET_ASSISTANT_COURSE: (state, data) => {
      state.hireInfos[data.assistantId] = data.courses;
    },
    SET_COURSES_ASSISTANTS: (state, data) => {
      state.courseAssistants = data;
    },
    SET_COURSE_ASSISTANT: (state, data) => {
      console.log(data);
      console.log(state.courseAssistants);
      let temp = state.courseAssistants;
      temp[data.index] = data.data;
      state.courseAssistants = [...temp];
      console.log(state.courseAssistants);
    },
  },

  actions: {
    // not use axios
    setHireInfo: ({ commit }, payload) => {
      commit("SET_HIRE_INFO", payload);
    },
    addHireInfo: ({ commit }, payload) => {
      commit("ADD_HIRE_INFO", payload);
    },
    removeHireInfo: ({ commit }, payload) => {
      commit("REMOVE_HIRE_INFO", payload);
    },
    setAssistantCourse: ({ commit }, payload) => {
      commit("SET_ASSISTANT_COURSE", payload);
    },

    // use axios
    // not apply 401 & 403
    getWaitAssistant: async ({ commit }, payload) => {
      console.log("Action getWatiAssistants : {}", payload);
      await getWaitAssistant(
        payload,
        (response) => {
          if (response.status === 200) {
            console.log("신규 조교 리스트");
            commit("SET_WAIT_ASSISTANTS", response.data);
          }
        },
        (error) => console.log(error)
      );
    },

    acceptHire: async ({ dispatch }, payload) => {
      console.log("Actions acceptHire : {}", payload);
      await acceptHire(
        payload,
        (response) => {
          console.log(response);
          if (response.status === 200) {
            dispatch("getWaitAssistant", {
              userId: payload[0].teacherUserId,
            });
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
          await acceptHire(
            payload,
            (response) => {
              console.log(response);
              if (response.status === 200) {
                dispatch("getWaitAssistant", {
                  userId: payload[0].teacherUserId,
                });
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

    rejectHire: async ({ dispatch }, payload) => {
      console.log(payload);
      await rejectHire(
        payload,
        (response) => {
          console.log(response);
          if (response.status === 200) {
            dispatch("getWaitAssistant", {
              userId: payload.teacherUserId,
            });
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
          await rejectHire(
            payload,
            (response) => {
              console.log(response);
              if (response.status === 200) {
                dispatch("getWaitAssistant", {
                  userId: payload.teacherUserId,
                });
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

    // 강사가 진행하는 모든 강좌에 대한 조교 현황
    getCourseAssistants: async (context, payload) => {
      console.log(payload);
      await getCourseAssistants(
        payload,
        (response) => {
          console.log(response);
          if (response.status === 200) {
            context.commit("SET_COURSES_ASSISTANTS", response.data);
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
          await getCourseAssistants(
            payload,
            (response) => {
              console.log(response);
              if (response.status === 200) {
                context.commit("SET_COURSES_ASSISTANTS", response.data);
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

    // 강사가 진행하는 특정 강좌에 대한 조교 현황
    getCourseAssistant: async ({ commit }, payload) => {
      console.log(payload);
      let data = {
        userId: payload.userId,
        courseId: payload.courseId,
      };
      await getCourseAssistant(
        data,
        (response) => {
          console.log(response);
          if (response.status === 200) {
            commit("SET_COURSE_ASSISTANT", {
              data: response.data,
              index: payload.index,
            });
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
          await getCourseAssistant(
            data,
            (response) => {
              console.log(response);
              if (response.status === 200) {
                commit("SET_COURSE_ASSISTANT", {
                  data: response.data,
                  index: payload.index,
                });
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

    registerAssistant: async ({ dispatch }, payload) => {
      console.log(payload);
      /*
      payload => {
        index: "index", // courseAssistants에서 해당되는 강좌 index
        teacherUserId: "teacherId",
        assistantUserID: "assistantId",
        courseId: "courseId",
      }
      */
      let data = {
        userId: payload.assistantUserId,
        courseId: payload.courseId,
      };
      await registerAssistant(
        data,
        (response) => {
          console.log(response);
          if (response.status === 200) {
            dispatch("getCourseAssistant", {
              index: payload.index,
              userId: payload.teacherUserId,
              courseId: payload.courseId,
            });
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
          await registerAssistant(
            data,
            (response) => {
              console.log(response);
              if (response.status === 200) {
                dispatch("getCourseAssistant", {
                  index: payload.index,
                  userId: payload.teacherUserId,
                  courseId: payload.courseId,
                });
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

    deleteAssistant: async ({ dispatch }, payload) => {
      let data = {
        userId: payload.assistantUserId,
        courseId: payload.courseId,
      };
      await deleteAssistant(
        data,
        (response) => {
          console.log(response);
          if (response.status === 200) {
            dispatch("getCourseAssistant", {
              index: payload.index,
              userId: payload.teacherUserId,
              courseId: payload.courseId,
            });
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
          await deleteAssistant(
            data,
            (response) => {
              console.log(response);
              if (response.status === 200) {
                dispatch("getCourseAssistant", {
                  index: payload.index,
                  userId: payload.teacherUserId,
                  courseId: payload.courseId,
                });
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

export default teacherStore;
