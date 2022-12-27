<template lang="">
  <v-card elevation="4" class="col-12 mt-8 pa-0 ma-0">
    <v-card-text>
      <v-row align-content="center" justify="center">
        <v-col align-self="center" style="text-align: center">
          <v-row>
            <div class="text-h6 font-weight-medium mb-2">김똥깡</div>
          </v-row>
          <v-row>
            <div class="grey--text text-caption">1999.12.27</div>
          </v-row>
        </v-col>
        <v-col align-self="center" style="text-align: center">
          <div class="text-h6 font-weight-medium">싸피고등학교 n학년</div>
        </v-col>
        <v-col align-self="center" style="text-align: center">
          {{ "01051642183".replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") }}
        </v-col>
      </v-row>
      <v-divider class="mt-5 mb-5"></v-divider>
      <v-row>
        <v-col align-self="center" style="text-align: center">
          <div class="text-h6 font-weight-medium">부 :</div>
        </v-col>
        <v-col align-self="center" style="text-align: center">
          <!-- <div class="text-h6 font-weight-medium">싸피고등학교</div> -->
        </v-col>
        <v-col align-self="center" style="text-align: center">
          {{ "01051642183".replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "StudentBasicInfo",
};
</script>
<style lang=""></style>
