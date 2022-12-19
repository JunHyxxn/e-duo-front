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
    redirect: "",
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

]

const router = new VueRouter({
  routes
})

export default router
