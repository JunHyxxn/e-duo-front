<template>
  <v-expansion-panel>
    <v-expansion-panel-header v-slot="{ open }">
      <v-row no-gutters>
        <v-col cols="8">
          <template>
            <v-list-item-content>
              <v-list-item-title
                class="text-h6"
                v-html="courseAssistant.courseName"
              ></v-list-item-title>
              <v-list-item-subtitle class="grey--text text-caption">
                {{
                  `${courseAssistant.startDate} ~ ${courseAssistant.endDate}`
                }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-col>
        <v-col cols="4" class="text--secondary" align-self="center">
          <v-fade-transition leave-absolute>
            <v-row v-if="open" no-gutters style="width: 100%">
              <v-col
                >현재 조교 :
                {{ courseAssistant.manageAssistants.length }}</v-col
              >
            </v-row>
            <v-row v-else no-gutters style="width: 100%">
              <v-col> {{ courseAssistant.academyName }}</v-col>
            </v-row>
          </v-fade-transition>
        </v-col>
      </v-row>
    </v-expansion-panel-header>
    <manage-assistant-detail
      ref="detail"
      :index="index"
      :courseId="courseAssistant.courseId"
      :academyName="courseAssistant.academyName"
      :manageAssistants="courseAssistant.manageAssistants"
      :possibleAssistants="courseAssistant.possibleAssistants"
    ></manage-assistant-detail>
  </v-expansion-panel>
</template>

<script>
import ManageAssistantDetail from "@/components/teacher/ManageAssistantDetail.vue";
export default {
  name: "ManageAssistantListItem",
  props: {
    courseAssistant: Object,
    index: Number,
  },
  components: {
    ManageAssistantDetail,
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
};
</script>

<style scoped></style>
