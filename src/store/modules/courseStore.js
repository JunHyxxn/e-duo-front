import { listCourses } from "@/api/course";

const courseStore = {
  namespaced: true,
  state: {
    courses: [
      {
        courseId: "M8Yj-qkg-LnG3",
        courseName: "2024 수능 대비 Debut 수학Ⅱ",
        academyName: "대치명인학원 대치캠퍼스",
        academyAddress: "서울 강남구 도곡로 408 디마크 빌딩 2층",
        startDate: "2022-12-26",
        endDate: "2023-03-13",
        schedule: [
          {
            day: 1,
            startTime: "19:00",
            endTime: "22:00",
          },
          {
            day: 3,
            startTime: "19:00",
            endTime: "22:00",
          },
        ],
      },
      {
        courseId: "M6Gq-qkg-DnM2",
        courseName: "2024 수능 대비 Debut 미적분",
        academyName: "대치명인학원 대치캠퍼스",
        academyAddress: "서울 강남구 도곡로 408 디마크 빌딩 2층",
        startDate: "2022-12-26",
        endDate: "2023-03-27",
        schedule: [
          {
            day: 4,
            startTime: "19:00",
            endTime: "22:00",
          },
          {
            day: 7,
            startTime: "09:00",
            endTime: "12:00",
          },
        ],
      },
    ],
  },
  getters: {},

  mutations: {
    SET_COURSES: (state, courses) => {
      state.courses = courses;
    },
  },

  actions: {
    listCourses: (context, payload) => {
      listCourses(
        payload,
        (response) => {
          if (response.status === 200) {
            console.log("강좌 목록 불러오기 성공");
            context.commit(response.data);
          }
        },
        (error) => console.log(error)
      );
    },
  },
};

export default courseStore;
