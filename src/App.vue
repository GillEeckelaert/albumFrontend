<template>
  <v-app>
    <v-main style="background-color: #ffffff;">
      <Header />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  data: () => ({
    //
  }),

  async created() {

  },

  methods: {
    ...mapGetters([
    ]),
    ...mapActions([
    ]),
  },
};
</script>

<style>
:root {
  /* --primary: #08415e; */
  --primary: #00ecde;
  --secondary: #c1c8e4;
  --tertiary: #84ceeb;
  --accent: #8860d0;
  --subheader: black;
  --error: #781212;
  --yvision-gray: #eeeeeeff;
}
html {
  overflow-y: auto ;
  font-family: "Lato", "Arial", sans-serif;
  text-rendering: optimizeLegibility;
}
body {
  height: 100vh;
}
</style>