import { getWaitAssistant, acceptHire, rejectHire } from "@/api/teacher";

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
  },
};

export default teacherStore;
