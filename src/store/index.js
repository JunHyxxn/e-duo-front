import Vue from 'vue'
import Vuex from 'vuex'
import userStore from "@/store/modules/userStore";
import courseStore from "@/store/modules/courseStore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore,
    courseStore,
  }
})
