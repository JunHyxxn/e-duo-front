<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 12 : 4" class="col-12 pa-0 ma-0">
      <v-card-text>
        <v-row align-content="center" justify="center">
          <v-col cols="1" align-self="center" style="text-align: center">
            <v-btn
              v-if="!checked"
              :color="$vuetify.theme.themes.light.anchor"
              icon
              elevation="2"
              large
              @click="selectAssistant(assistant.userId)"
            >
              <font-awesome-icon icon="fa-regular fa-circle-check" />
            </v-btn>
            <v-btn
              v-else
              :color="$vuetify.theme.themes.light.anchor"
              icon
              elevation="2"
              large
              @click="removeAssistant(assistant.userId)"
            >
              <font-awesome-icon icon="fa-solid fa-circle-check" />
            </v-btn>
          </v-col>
          <v-col cols="3" align-self="center" style="text-align: center">
            <v-row>
              <div class="text-h6 font-weight-medium mb-2">
                {{ assistant.name }}
              </div>
            </v-row>
            <v-row>
              <div class="grey--text text-subtitle-2">
                {{ assistant.userId }}
              </div>
            </v-row>
          </v-col>
          <v-col cols="3" align-self="center" style="text-align: center">
            <div class="text-h6 font-weight-medium">
              {{ assistant.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") }}
            </div>
          </v-col>
          <v-col cols="5" align-self="center" style="text-align: center">
            <v-autocomplete
              v-model="selected"
              :disabled="!checked"
              :items="courses"
              label="강좌선택"
              item-value="courseId"
              multiple
              @change="changeCourses"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item.courseName }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption">
                  (+{{ selected.length - 1 }} others)
                </span>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.courseName"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.academyName"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState, mapActions } from "vuex";
const courseStore = "courseStore";
const teacherStore = "teacherStore";
export default {
  name: "NewAssistantListItem",
  props: {
    assistant: Object,
  },
  data() {
    return {
      checked: false,
      selected: [],
      // courseInfo: [],
    };
  },
  created() {
    // this.courseInfo = this.courses;
    // console.log(this.courseInfo);
  },
  computed: {
    ...mapState(courseStore, ["courses"]),
    ...mapState(teacherStore, ["hireInfos"]),
  },
  methods: {
    ...mapActions(teacherStore, [
      "addHireInfo",
      "removeHireInfo",
      "setAssistantCourse",
    ]),
    selectAssistant(assistantId) {
      this.checked = true;
      this.addHireInfo(assistantId);
    },
    removeAssistant(assistantId) {
      this.checked = false;
      this.removeHireInfo(assistantId);
      this.selected = [];
    },
    changeCourses() {
      let payload = {
        assistantId: this.assistant.userId,
        courses: this.selected,
      };
      this.setAssistantCourse(payload);
    },
  },
};
</script>

<style scoped></style>
