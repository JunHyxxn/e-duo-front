<template>
    <v-hover v-slot="{ hover }">
        <v-card :elevation="hover ? 12 : 4"
                class="col-12 pa-0 ma-0"
        >
            <v-card-text class="text-left">
                <v-row class="d-flex pa-0 ma-0 ms-4 anchor--text">
                    <v-col class="col-auto pa-0 ma-0 me-2 align-self-end">{{ course.academyName }}</v-col>
                    <v-spacer class="col-auto pa-0 ma-0"></v-spacer>
                    <v-col class="col-auto pa-0 ma-0">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn x-small plain fab>
                                    <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item link
                                             dense
                                             class="text-button">강좌 수정
                                </v-list-item>
                                <v-list-item link
                                             dense
                                             class="text-button">강좌 삭제
                                </v-list-item>
                            </v-list>
                        </v-menu>

                    </v-col>
                </v-row>
                <v-row class="pa-0 ma-0 ms-4 mt-2">
                    <v-col class="col-auto pa-0 ma-0 me-2 success--text font-weight-bold">{{ course.courseName }}</v-col>
                </v-row>
                <v-row class="pa-0 ma-0 ms-4">
                    <v-col class="col-auto pa-0 ma-0 text-caption">개강 {{ course.startDate }} ~ 종강 {{ course.endDate }}</v-col>
                </v-row>
                <v-row class="pa-0 ma-0 ms-4">
                    <v-col class="col-auto pa-0 ma-0 text-caption">{{ course.schedule | printSchedule }}</v-col>
                </v-row>
                <v-row class="pa-0 ma-0">
                    <v-col class="col-auto pa-0 ma-0">
                        <router-link :to="{ name: 'courseDetail', params: { courseName: course.courseName } }">
                            <v-btn plain class="pa-0 ma-0 primary--text">상세</v-btn>
                        </router-link>
                    </v-col>
                    <v-col class="col-auto pa-0 ma-0">
                        <router-link :to="{ name: 'notice' }">
                            <v-btn plain class="pa-0 ma-0 primary--text">공지</v-btn>
                        </router-link>
                    </v-col>
                    <v-col class="col-auto pa-0 ma-0">
                        <router-link :to="{ name: 'video' }">
                            <v-btn plain class="pa-0 ma-0 primary--text">영상</v-btn>
                        </router-link>
                    </v-col>
                    <v-col class="col-auto pa-0 ma-0">
                        <router-link :to="{ name: 'attendance' }">
                            <v-btn plain class="pa-0 ma-0 primary--text">출결</v-btn>
                        </router-link>
                    </v-col>
                    <v-col class="col-auto pa-0 ma-0">
                        <router-link :to="{ name: 'assignment' }">
                            <v-btn plain class="pa-0 ma-0 primary--text">과제</v-btn>
                        </router-link>
                    </v-col>
                    <v-col class="col-auto pa-0 ma-0">
                        <router-link :to="{ name: 'test' }">
                            <v-btn plain class="pa-0 ma-0 primary--text">평가</v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    name: "CourseListItem",
    props: {
        course: Object
    },
    methods: {},
    filters: {
        printSchedule(schedule) {
            const dayOfWeek = [ '일', '월', '화', '수', '목', '금', '토', '일' ]

            let string = "";
            for (let i = 0; i < schedule.length; i++) {
                const cur = schedule[i];
                string += ` ${ dayOfWeek[cur.day] } `;
                string += `${ cur.startTime } ~ ${ cur.endTime }`;

                if (i !== schedule.length - 1) {
                    string += " |";
                }
            }

            return string;
        },
    }
}
</script>

<style scoped>

</style>