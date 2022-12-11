import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpBasicTeacher from '../views/SignUpBasicTeacher.vue'
import SignUpBasicStudent from '../views/SignUpBasicStudent.vue'
import SchoolSearch from '../components/SchoolSearch'

Vue.use(VueRouter)

const routes = [
    {
        path: '/SignUpBasicTeacher',
        name: 'SignUpBasicTeacher',
        component : SignUpBasicTeacher
    },
    {
        path: '/SignUpBasicStudent',
        name: 'SignUpBasicStudent',
        component : SignUpBasicStudent
    },
    {
        path: '/SchoolSearch',
        name: 'SchoolSearch',
        component : SchoolSearch
    }
];

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router