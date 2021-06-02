<template>
<div class="home">

  <!-- If logged in -->
  <div v-if="getUserID() != null">
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

  <!-- If not logged in -->
  <div v-else>
    <v-overlay>
      <v-card 
      class="mx-auto mx-2"
      width="90%"
      max-width="300px"
      @keypress.enter="userLogin()"
      >
        <v-row class="mx-2">
          <v-col>
            <v-text-field 
            label="Username"
            outlined
            dense
            class="mt-4 mb-n4"
            v-model="TFUsername"
            />
          </v-col>
        </v-row>

        <v-row v-if="error.location == 'login'" class="mx-2">
          <v-col class="text-center red--text errorClass">
            {{ error.content }}
            <v-icon small @click="error.location = null">mdi-close</v-icon>
          </v-col>
        </v-row>

        <v-row class="mx-2">
          <v-col class="text-center">
            <v-btn 
            outlined
            :loading="loading.location=='login'"
            @click="userLogin()"
            >
            Log in
            </v-btn>
          </v-col>
        </v-row>
      </v-card> 
    </v-overlay>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Home',
    components: {
    },
    data() {
      return {
        categories: ['Books', 'Movies', 'Theatre'],
        TFUsername: null,

        error: {
          location: null,
          content: null,
        },

        loading: {
          location: null
        }
      }
    },
    methods: {
      goToPage(page) {
        if (page == 'Books') {
          this.$router.push({path:'/books'});
        }
        else if (page == 'Movies') {
          console.log(this.getUserID());
          console.log(this.getAllUsers())
        }
      },

      async userLogin() {
        this.loading.location = 'login'
        this.error.location = null

        const response = await this.logIn(this.TFUsername)
        if (response.error) {
          this.error.location = 'login';
          this.error.content = response.content;
          this.loading.location = null;
          return;
        }

        this.loading.location = null;
      },

      ...mapActions([
        'logIn'
      ]),

      ...mapGetters([
        'getUserID',
        'getAllUsers',
        ]),

    },
  }
</script>

<style>

.home {

}

.errorClass {
  overflow-wrap: anywhere;
}

</style>

