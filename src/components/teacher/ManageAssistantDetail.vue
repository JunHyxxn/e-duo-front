<template>
  <v-expansion-panel-content>
    <v-divider class="mb-8"></v-divider>
    <v-row class="text-subtitle-1 font-weight-bold" justify="start" no-gutters>
      {{ academyName }}
    </v-row>
    <v-row justify="center">
      <v-col align-self="center"> 조교 추가 : </v-col>
      <v-col cols="6" align-self="center">
        <v-autocomplete
          v-model="selected"
          :items="possibleAssistants"
          label="관리 조교"
          no-data-text="🤔 추가할 조교가 존재하지 않습니다"
          item-value="userId"
        >
          <template v-slot:selection="{ item }">
            <v-chip>
              <span>{{ item.name }}</span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <template>
              <v-list-item-content>
                <v-list-item-title v-html="item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.userId"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col style="text-align: end" align-self="center">
        <v-tooltip bottom :color="$vuetify.theme.themes.light.anchor">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="$vuetify.theme.themes.light.anchor"
              icon
              elevation="2"
              large
              v-bind="attrs"
              v-on="on"
              @click="addManageAssistants"
            >
              <font-awesome-icon icon="fa-solid fa-circle-plus" />
            </v-btn>
          </template>
          <span>조교 추가</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <!-- <v-row class="mt-5"> -->
    <v-data-table
      class="elevation-2 mt-8"
      :items="manageAssistants"
      :headers="headers"
      :items-per-page="itemPerPage"
      :page.sync="page"
      no-data-text="🤔 현재 조교가 없습니다"
      hide-default-footer
    >
      <template v-slot:item="{ item }">
        <tr>
          <td align="center" justify="center">{{ item.name }}</td>
          <td align="center" justify="center">{{ item.userId }}</td>
          <td align="center" justify="center">
            {{ item.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") }}
          </td>
          <td align="center" justify="center">
            <v-tooltip right :color="$vuetify.theme.themes.light.anchor">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  elevation="2"
                  v-bind="attrs"
                  v-on="on"
                  @click="removeManageAssistant(item.userId)"
                >
                  <font-awesome-icon
                    :color="$vuetify.theme.themes.light.error"
                    icon="fa-solid fa-trash-can"
                  />
                </v-btn>
              </template>
              <span>조교 삭제</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- </v-row> -->
  </v-expansion-panel-content>
</template>
<script>
import { mapState, mapActions } from "vuex";
const teacherStore = "teacherStore";
const userStore = "userStore";
export default {
  name: "ManageAssistantDetail",
  created() {},
  props: {
    index: Number,
    courseId: String,
    academyName: String,
    manageAssistants: Array,
    possibleAssistants: Array,
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  data() {
    return {
      selected: null,
      page: 1,
      pageCount: 0,
      itemPerPage: 10,
      headers: [
        {
          text: "이름",
          value: "name",
          sortable: false,
          width: "25%",
          align: "center",
        },

        {
          text: "이메일",
          value: "userId",
          sortable: false,
          width: "30%",
          align: "center",
        },
        {
          text: "번호",
          value: "phone",
          sortable: false,
          width: "40%",
          align: "center",
        },
        {
          text: "삭제",
          sortable: false,
          width: "10%",
          align: "center",
        },
      ],
    };
  },
  methods: {
    ...mapActions(teacherStore, ["registerAssistant", "deleteAssistant"]),
    addManageAssistants() {
      /*
      payload => {
        index: "index", // courseAssistants에서 해당되는 강좌 index
        teacherUserId: "teacherId",
        assistantUserID: "assistantId",
        courseId: "courseId",
      }
      */
      this.registerAssistant({
        index: this.index,
        teacherUserId: this.userInfo.userId,
        assistantUserId: this.selected,
        courseId: this.courseId,
      });
    },
    removeManageAssistant(userId) {
      /*
      payload => {
        index: "index", // courseAssistants에서 해당되는 강좌 index
        teacherUserId: "teacherId",
        assistantUserID: "assistantId",
        courseId: "courseId",
      }
      */
      this.deleteAssistant({
        index: this.index,
        teacherUserId: this.userInfo.userId,
        assistantUserId: userId,
        courseId: this.courseId,
      });
    },
  },
};
</script>
<style lang=""></style>
