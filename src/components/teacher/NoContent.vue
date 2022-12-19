<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 12 : 4">
      <v-container pa-1>
        <v-layout row>
          <v-flex xs7>
            <v-card-title primary-title>
              <div class="ms-8">
                <div class="grey--text">신규 조교</div>
                <h3 class="headline">0</h3>
              </div>
            </v-card-title>
          </v-flex>
          <v-flex>
            <v-card-title>
              <v-avatar rounded="0">
                <font-awesome-icon icon="fa-solid fa-user-group" />
              </v-avatar>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-text>
          <v-row class="mt-8 mb-8">
            <span class="grey--text caption text-h5">
              😎 해당 회원이 존재하지 않습니다.</span
            >
          </v-row>
          <v-spacer></v-spacer>
        </v-card-text>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState } from "vuex";
const teacherStore = "teacherStore";
export default {
  name: "NoContent",
  computed: {
    ...mapState(teacherStore, ["waitAssistants"]),
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
