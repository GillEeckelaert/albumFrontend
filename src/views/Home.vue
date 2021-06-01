<template>
<div class="home">
  <v-row justify="center" class="mb-10">
    <v-img 
      contain 
      max-width="200px" 
      class="justify-center" 
      position="center"
      src="../assets/logoFC.png">
    </v-img>
  </v-row>
  <div 
    v-for="(category, i) in categories" 
    :key="i"
    class="ma-4 text-center"
  >
    <v-btn text outlined x-large color="#00ecde" @click="goToPage(category)">
      {{category}}
    </v-btn>
  </div>
</div>
</template>

<script>

  export default {
    name: 'Home',

    components: {
    },

    data() {
      return {
        categories: ['Books', 'Movies', 'Theatre'],
      }
    },
    methods: {
      goToPage(page) {
        if (page == 'Movies') {
          this.$router.push({path:'/movies'});
        }
      }
    },
  }
</script>

<style>

.home {
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 100%;
}

</style>

