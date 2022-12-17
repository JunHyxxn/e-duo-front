import { getWaitAssistant } from "@/api/assistant";

const assistantStore = {
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
    getWaitAssistant: ({ commit }, payload) => {
      console.log("Action getWatiAssistants : {}", payload);
      getWaitAssistant(
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
  },
};

export default assistantStore;
