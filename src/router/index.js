import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainView",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("@/views/LoginView.vue"),
    children: [
      {
        path: "",
        name: "UserLogin",
        component: () => import("@/components/user/UserLogin.vue"),
      },
      {
        path: "role",
        name: "UserRole",
        component: () => import("@/components/user/UserRole.vue"),
      },
    ],
  },
  {
    path: "/lecture",
    name: "lecture",
    component: () => import("@/views/LectureView.vue"),
    redirect: "",
    children: [
      {
        path: "manage/:courseId",
        name: "manageLecture",
        component: () => import("@/components/lecture/ManageLecture.vue")
      },
    ]
  },
  {
    path: "/signupteacher",
    name: "SignUpBasicTeacher",
    component: () => import("@/components/user/SignUpBasicTeacher.vue"),
  },
  {
    path: "/signupassistant",
    name: "SignUpBasicAssistant",
    component: () => import("@/components/user/SignUpBasicAssistant.vue"),
  },
  {
    path: "/signupstudent",
    name: "SignUpBasicStudent",
    component: () => import("@/components/user/SignUpBasicStudent.vue"),
  },
  {
    path: "/course",
    name: "course",
    component: () => import("@/views/AppCourse.vue"),
    redirect: "/course/list",
    children: [
      {
        path: "list",
        name: "courseList",
        component: () => import("@/components/course/CourseList.vue"),
      },
      {
        path: "add",
        name: "addCourse",
        component: () => import("@/components/course/AddCourse.vue"),
      }, // 이후 추가할 강좌관련 컴포넌트는 여기에 추가
    ],
  },
  {
    path: "/notice",
    name: "notice",
    component: () => import("@/views/AppNotice.vue"),
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "noticeList",
        component: () => import("@/components/notice/NoticeList.vue"),
      },
      {
        path: "detail/:courseName",
        name: "courseDetail",
        component: () => import("@/components/course/CourseDetail"),
      },
    ],
  },
  {
    path: "/video",
    name: "video",
    component: () => import("@/views/AppVideo.vue"),
  },
  {
    path: "/attendance",
    name: "attendance",
    component: () => import("@/views/AppAttendance.vue"),
  },
  {
    path: "/assignment",
    name: "assignment",
    component: () => import("@/views/AppAssignment.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/AppTest.vue"),
  },
  {
    path: "/manage-assistant",
    name: "manageAssistant",
    component: () => import("@/views/AppManageAssistant.vue"),
    redirect: "/manage-assistant/new",
    children: [
      {
        path: "new",
        name: "newAssistant",
        component: () => import("@/components/teacher/NewAssistantList.vue"),
      },
      {
        path: "manage",
        name: "originAssistant",
        component: () => import("@/components/teacher/ManageAssistantList.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
