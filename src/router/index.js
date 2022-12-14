import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
    ]
  },
  {
    path: "/signup",
    name: "SignUpForm",
    component: () => import("@/components/user/SignUpForm.vue")
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
        component: () => import("@/components/course/CourseList.vue")
      },
      {
        path: "add",
        name: "addCourse",
        component: () => import("@/components/course/AddCourse.vue")
      },  // 이후 추가할 강좌관련 컴포넌트는 여기에 추가
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
