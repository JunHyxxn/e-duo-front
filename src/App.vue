<template>
  <v-app>
    <the-header></the-header>
    <v-main>
      <router-view />
    </v-main>
    <the-footer></the-footer>
  </v-app>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
export default {
  name: "App",
  components: { TheFooter, TheHeader },
  data: () => ({
    //
  }),
};
</script>
