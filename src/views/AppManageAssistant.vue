<template>
  <v-container class="mt-8" style="width: 70%">
    <v-row>
      <v-col cols="10"></v-col>
      <v-col cols="1">
        <v-tooltip bottom :color="$vuetify.theme.themes.light.anchor">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="$vuetify.theme.themes.light.anchor"
              icon
              elevation="2"
              x-large
              v-bind="attrs"
              v-on="on"
              @click="goNewAssistant"
            >
              <font-awesome-icon icon="fa-solid fa-user-plus" />
            </v-btn>
          </template>
          <span>신규 조교 관리</span>
        </v-tooltip>
      </v-col>
      <v-col cols="1">
        <v-tooltip bottom :color="$vuetify.theme.themes.light.anchor">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="$vuetify.theme.themes.light.anchor"
              icon
              elevation="2"
              x-large
              v-bind="attrs"
              v-on="on"
              @click="goManageAssistant"
            >
              <font-awesome-icon icon="fa-solid fa-people-line" />
            </v-btn>
          </template>
          <span>기존 조교 관리</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: "AppManageAssistant",
  methods: {
    goNewAssistant() {
      this.$router.push({ name: "newAssistant" });
    },
    goManageAssistant() {
      this.$router.push({ name: "originAssistant" });
    },
  },
};
</script>

<style scoped></style>
