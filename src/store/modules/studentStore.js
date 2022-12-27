import { getStudentDetail } from "@/api/student";

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
  },
  getters: {},

  mutations: {
    SET_STUDENT_INFO: (state, data) => {
      state.studentInfo = data;
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
  },
};

export default studentStore;
