<template>
<div class="header" v-if="getUserName() != null">
  <div style="position:absolute; left: 50%" class="mt-2">
    <div style="position: relative; left: -50%;">
      <v-img 
        contain 
        max-width="200px" 
        src="../assets/logoFC.png"
        @click="$router.push({path:'/'})"
        >
      </v-img>
    </div>
  </div>

  <div style="position:absolute; right: 5%" class="mt-5">
    <v-menu
      v-model="menu"
      bottom
      right
      offset-y
      :close-on-content-click="false"
      close-on-click
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        fab
        x-small
        color="black"
        outlined
        v-bind="attrs"
        v-on="on"
        >
          {{ getUserName().substr(0,1) }}
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ getUserName() }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch
                inset
                color="purple"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>Setting Test</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="menu = false; userLogout()"
          >
            Log Out
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>

  <div style="position: absolute; top: 70px; left:50%">
    <div style="position: relative; left: -50%;">
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
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Header',

    components: {
    },

    data() {
      return {
        tab: null,
        menu: false,
        items: [
          {text: 'books', icon: 'mdi-book-open-page-variant-outline'},
          {text: 'movies', icon:'mdi-movie-open-outline'},
          {text: 'events', icon:'mdi-ticket-outline'}
        ],
      }
    },

    computed: {
      currentPageName() {
        return this.$route.name;
      }
    },

    methods: {

      userLogout() {
        this.logOut();
        this.$router.push({path:'/'});
      },

      ...mapGetters([
        'getUserName',
        'getUserID',
      ]),
      ...mapActions([
        'logOut'
      ])
    }
  }
</script>

<style>
.header {
  height: 130px;
}
.album {
  background-color: #FFFF !important;
}
.album--text {
  color: #00ecde !important;
}


</style>