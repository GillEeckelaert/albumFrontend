<template>
<div class="home">
  <v-card color="album" elevation="0">
    <div class="text-center justify-center py-6 header mx-4">
      <v-icon
      class="headerFirst"
      >
      mdi-account-circle-outline
      </v-icon>

      <v-img 
        contain 
        max-width="200px" 
        class="title"
        src="../assets/logoFC.png"
        @click="$router.push({path:'/'})"
        >
      </v-img>

      <div class="headerLast">
        <v-icon medium> mdi-account-circle-outline </v-icon>
        {{ getUserName() }}
      </div>
    </div>

    <v-tabs
      v-if="currentPageName != 'Home'"
      v-model="tab"
      background-color="transparent"
      color="album"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item.text"
        :to="'/'+item.text"
      >
        <span v-if="$vuetify.breakpoint.smAndUp">
          {{ item.text }}
        </span>
        <v-icon v-else>{{item.icon}}</v-icon>
      </v-tab>
    </v-tabs>
  </v-card>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    name: 'Header',

    components: {
    },

    data() {
      return {
        tab: null,
        items: [
          {text: 'books', icon: 'mdi-book-open-page-variant-outline'},
          {text: 'movies', icon:'mdi-movie-open-outline'},
          {text: 'tickets', icon:'mdi-ticket-outline'}
        ],
      }
    },

    computed: {
      currentPageName() {
        return this.$route.name;
      }
    },

    methods: {
      ...mapGetters([
        'getUserName'
      ])
    }
  }
</script>

<style>
.album {
  background-color: #FFFF !important;
}
.album--text {
  color: #00ecde !important;
}

.header {
  display: flex;
}

.headerFirst {
  margin-right: auto;
  visibility: hidden;
}

.headerLast {
  margin-left: auto;
}

</style>