<template>
    <v-container>
        <v-row class="d-flex" v-for="(course, index) in courses" :key="index">
            <v-col v-if="isMinus"
                   class="col-auto align-self-center">
                <v-checkbox v-model="selected"
                            :value="course.courseId"></v-checkbox>
            </v-col>
            <v-col>
                <course-list-item :course="course"></course-list-item>
            </v-col>
        </v-row>
        <v-row v-if="isMinus"
               class="d-flex justify-center mt-4">
            <v-col class="col-auto">
                <v-btn outlined
                       class="primary--text"
                       @click="checkAllCourses">전체 선택
                </v-btn>
            </v-col>
            <v-col class="col-auto">
                <v-btn outlined
                       class="error--text"
                @click="removeCourses">선택 삭제
                </v-btn>
            </v-col>
        </v-row>
        <v-row v-else
               class="d-flex justify-center mt-4">
            <v-col class="col-auto text-center">
                <router-link :to="{ name: 'addCourse' }">
                    <v-btn elevation="2"
                           raised
                           icon
                           class="accent--text">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                    </v-btn>
                </router-link>
            </v-col>
            <v-col class="col-auto text-center">
                <v-btn elevation="2"
                       raised
                       icon
                       class="accent--text"
                       @click="toggleMinus">
                    <font-awesome-icon icon="fa-solid fa-minus" />
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CourseListItem from "@/components/course/CourseListItem";
import { mapActions, mapState } from "vuex";

export default {
    name: "CourseList",
    components: {
        CourseListItem,
    },
    data() {
        return {
            isMinus: false,
            selected: [ ],
        };
    },
    computed: {
        ...mapState("userStore", [ "userInfo" ]),
        ...mapState("courseStore", [ "courses" ]),
    },

    methods: {
        ...mapActions("courseStore", [ "listCourses" ]),
        toggleMinus() {
            this.isMinus = !this.isMinus;
        },

        checkAllCourses() {
            if (this.selected.length === this.courses.length) {
                this.selected = [ ];
                return;
            }

            for (let course of this.courses) {
                this.selected.push(course.courseId);
            }
        },

        removeCourses() {
            this.toggleMinus();
        },
    },

    // created() {
    //     const payload = {
    //         accessToken: localStorage.getItem("accessToken"),
    //         userId: this.userInfo.userId,
    //         role: this.userInfo.role,
    //     };
    //
    //     this.listCourses(payload);
    // }
}
</script>

<style scoped>

</style>