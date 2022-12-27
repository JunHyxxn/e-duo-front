import Vue from "vue";
import Vuex from "vuex";
import userStore from "@/store/modules/userStore";
import courseStore from "@/store/modules/courseStore";
import teacherStore from "@/store/modules/teacherStore";
import studentStore from "@/store/modules/studentStore";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
    courseStore,
    teacherStore,
    studentStore,
  },
});
