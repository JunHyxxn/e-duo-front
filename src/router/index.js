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
    path: "/signup",
    name: "SignUpForm",
    component: () => import("@/components/user/SignUpForm.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
