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
    <v-overlay
    opacity="1"
    color="gradient"
    >
      <v-card 
      class="mx-auto mx-2 mt-4"
      width="90%"
      max-width="300px"
      @keypress.enter="userAuthentication()"
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

        <v-row class="mx-2" v-if="register">
          <v-col>
            <v-text-field 
            label="Email"
            outlined
            dense
            class="mb-n4 mt-n4"
            v-model="TFEmail"
            />
          </v-col>
        </v-row>

        <v-row v-if="error.location == 'authentication'" class="mx-2">
          <v-col class="text-center red--text errorClass">
            {{ error.content }}
            <v-icon small @click="error.location = null">mdi-close</v-icon>
          </v-col>
        </v-row>

        <v-row class="mx-2">
          <v-col class="text-center">
            <v-btn 
            outlined
            :loading="loading.location=='authentication'"
            @click="userAuthentication()"
            >
            <span v-if="!register">
              Log in
            </span>
            <span v-else>
              Registreer
            </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card> 

      <v-card class="mt-8 text-center transparent" elevation="0">
        <div class="black--text">
          <span v-if="!register">
            Nog geen account?
          </span>
          <span v-else>
            Al een account?
          </span>
        </div>
        <v-btn 
        small 
        depressed 
        text 
        color="primary" 
        @click="register = !register"
        >
        <span v-if="!register">
          Registreer hier
        </span>
        <span v-else>
          Login hier
        </span>
        </v-btn>
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
        categories: ['Books', 'Movies', 'Tickets'],

        register: false,

        TFUsername: null,
        TFEmail: null,

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

      async userAuthentication() {
        this.loading.location = 'authentication'
        this.error.location = null

        if (this.register) {
          const response = await this.registerUser([this.TFUsername, this.TFEmail]);
          if (response.error) {
            this.error.location = 'authentication';
            this.error.content = response.content;
            this.loading.location = null;
            return;
          }
        } 
        else {
          const response = await this.logIn(this.TFUsername)
          if (response.error) {
            this.error.location = 'authentication';
            this.error.content = response.content;
            this.loading.location = null;
            return;
          }
        }

        this.loading.location = null;
        this.TFUsername = null;
        this.TFEmail = null;
      },

      ...mapActions([
        'logIn',
        'registerUser',
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

.overlay {
  color: linear-gradient(#00ecde, #00a79b);
}

.errorClass {
  overflow-wrap: anywhere;
}

.transparent {
  background-color: rgba(255, 255, 255, 0) !important;
}

</style>

