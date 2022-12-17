<template>
  <v-footer dark padless color="c">
    <v-card
      flat
      tile
      color="#C6C5B9"
      class="lighten-1 white--text text-center"
      width="100%"
    >
      <v-card-text>
        <!-- <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn> -->
      </v-card-text>

      <v-card-text class="white--text pt-0">
        <p>
          <strong>E-Duo -</strong> Helfing Both of teacher and student <br />
          서울특별시 강남구 언주로 508(역삼동 701번지) 서울상록빌딩 5층
        </p>
        <span></span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>E-Duo</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {};
</script>

<style></style>
