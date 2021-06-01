<template>
  <div>
    <transition name="slide-x-transition">
      <div
        v-if="menu_bool && $vuetify.breakpoint.width < 1000"
        class="pop_up_menu"
        transition="expand"
      >
        <div class="close_pop_up_menu">
          <v-btn
            dark
            icon
            @click="menu_bool = !menu_bool"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div
          v-if="!loggedin"
          class="menu_items"
        >
          <div>
            <v-btn
              dark
              plain
              @click="goHome"
            >
              Home
            </v-btn>
          </div>
        </div>

        <div
          v-else
          class="menu_items"
        >
          <div>
            <v-btn
              text
              rounded
              dark
              @click="goHome"
            >
              Home
            </v-btn>
            <v-btn
              text
              rounded
              dark
              @click="goDataset"
            >
              DATASETS
            </v-btn>
            <v-btn
              text
              rounded
              dark
              @click="goModels"
            >
              MODELS
            </v-btn>
            <v-btn
              text
              rounded
              dark
              @click="goVis"
            >
              VISUALISATION
            </v-btn>
            <v-btn
              text
              rounded
              dark
              @click="goMarketplace"
            >
              MARKETPLACE
            </v-btn>
          </div>
        </div>
      </div>
    </transition>

    <div
      class="navigation"
      :style="background"
    >
      <v-container fluid>
        <v-layout>
          <v-row class="d-flex justify-space-between align-center flex-nowrap">
            <v-btn
              v-if="$vuetify.breakpoint.width < 1000"
              :dark="homepage"
              icon
              class="my-2 ml-2"
              text
              @click="menu_bool = !menu_bool"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>

            <div
              v-if="$vuetify.breakpoint.width >= 1000"
              class="mx-2 my-2"
            >
              <v-img
                v-if="homepage"
                class="logoMouse"
                width="130px"
                max-height="40px"
                src="../assets/logoFC.png"
                @click="goHome"
              />
              <v-img
                v-else
                class="logoMouse"
                width="130px"
                max-height="40"
                src="../assets/logoFC.png.png"
                @click="goHome"
              />
            </div>

            <div
              v-if="$vuetify.breakpoint.width >= 1000"
              class="d-flex my-2"
            >
              <div
                v-if="!loggedin"
              >
              </div>

              <div
                v-if="loggedin"
                :class="homepage? 'white--text' : 'black--text'"
              >
                <v-btn
                  class="button"
                  text
                  rounded
                  :dark="homepage"
                  @click="goHome"
                >
                  HOME
                </v-btn>
                |
                <v-btn
                  class="button"
                  text
                  rounded
                  :dark="homepage"
                  @click="goDataset"
                >
                  DATASETS
                </v-btn>
                <v-btn
                  class="button"
                  text
                  rounded
                  :dark="homepage"
                  @click="goModels"
                >
                  MODELS
                </v-btn>
                <v-btn
                  class="button"
                  text
                  rounded
                  :dark="homepage"
                  @click="goVis"
                >
                  VISUALISATION
                </v-btn>
                |
                <v-btn
                  class="button"
                  text
                  rounded
                  :dark="homepage"
                  @click="goMarketplace"
                >
                  MARKETPLACE
                </v-btn>
              </div>
            </div>

            <div
              v-if="!loggedin"
              class="ml-auto mr-4 my-2"
            >
              <v-btn
                class="mx-2"
                outlined
                rounded
                :dark="homepage"
                @click="goRegister"
              >
                REGISTER
              </v-btn>
              <v-btn
                outlined
                rounded
                :dark="homepage"
                @click="goLogin"
              >
                LOGIN
              </v-btn>
            </div>

            <div>
              <v-menu
                v-if="loggedin"
                open-on-hover
                bottom
                offset-y
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    text
                    :dark="homepage"
                    class="my-2 mr-4"
                    v-on="on"
                  >
                    <router-link
                      to="/profile"
                    >
                      <v-icon :color="homepage? 'white' : 'black'">
                        mdi-account-outline
                      </v-icon>
                    </router-link>
                  </v-btn>
                </template>

                <v-card
                  width="256"
                  tile
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="../assets/profile_pic.png" />
                      </v-list-item-avatar>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="title">
                          {{ firstname }} {{ lastname }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-divider />
                  <v-list
                    nav
                    dense
                  >
                    <v-list-item-group color="primary">
                      <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        @click="menuActionClick(item.function)"
                      >
                        <v-list-item-icon>
                          <v-icon v-text="item.icon" />
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.text"
                          />
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </v-row>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  // mdi-icons: https://materialdesignicons.com/
  name: 'ContentHeader',
  data: () => ({
    menu_bool: false,
    showAmount: 2,
    notifications: 0,
    allNotifications: [{
      groupId: 0, type: 'GENERAL', message: 'Welcom to Yvision!', source: 'GENERAL', seen: true,
    },
    {
      groupId: 0, type: 'GENERAL', message: 'New features are available. To see what has been added/changed, go to the changelog on this platform.', source: 'GENERAL', seen: false,
    },
    {
      groupId: 0, type: 'UPDATE', message: 'Your modeljob is done running.', source: 'MODELS', seen: false,
    },
    {
      groupId: 0, type: 'GENERAL', message: 'New features are available. To see what has been added/changed, go to the changelog on this platform.', source: 'GENERAL', seen: false,
    },
    {
      groupId: 0, type: 'GENERAL', message: 'New features are available. To see what has been added/changed, go to the changelog on this platform.', source: 'GENERAL', seen: false,
    },
    {
      groupId: 0, type: 'GENERAL', message: 'New features are available. To see what has been added/changed, go to the changelog on this platform.', source: 'GENERAL', seen: false,
    },
    {
      groupId: 0, type: 'GENERAL', message: 'New features are available. To see what has been added/changed, go to the changelog on this platform.', source: 'GENERAL', seen: false,
    }],
    items: [
      { text: 'Profile', icon: 'mdi-account', function: 'profile' },
      { text: 'Groups & Organizations', icon: 'mdi-account-group', function: 'groups' },
      { text: 'Tutorial', icon: 'mdi-school-outline', function: 'tutorial' },
      { text: 'Settings', icon: 'mdi-cog-outline', function: 'settings' },
      { text: 'Logout', icon: 'mdi-logout', function: 'logout' },
    ],
  }),
  computed: {
    loggedin: {
      get() {
        return true;
      },
    },
    firstname: {
      get() {
        return this.getFirstname();
      },
    },
    lastname: {
      get() {
        return this.getLastname();
      },
    },
    email: {
      get() {
        return this.getEmail();
      },
    },
    button_name() {
      /*
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm': return this.getFirstname().charAt(0)
        case 'md':
        case 'lg':
        case 'xl': return this.getFirstname()+" "+this.getLastname()
      } */
      return this.getFirstname().charAt(0);
    },
    notificationsNotSeen: {
      get() {
        return this.allNotifications.filter((el) => !el.seen).length;
      },
    },
  },
  methods: {
    log_out() {
      this.logout();
      this.$router.push({ path: '/' });
      this.menu_bool = false;
    },
    goHome() {
      this.$router.push({ path: '/' });
      this.menu_bool = false;
    },
    goAbout() {
      this.$router.push({ path: '/about' });
      this.menu_bool = false;
    },
    goVis() {
      this.$router.push({ path: '/visualisation' });
      this.menu_bool = false;
    },
    goLogin() {
      this.$router.push({
        name: 'Login',
      });
      this.menu_bool = false;
    },
    goRegister() {
      this.$router.push({ path: '/register' });
      this.menu_bool = false;
    },
    goDataset() {
      this.$router.push({ path: '/dataset' });
      this.menu_bool = false;
    },
    goModels() {
      this.$router.push({ path: '/models' });
      this.menu_bool = false;
    },
    goMarketplace() {
      this.$router.push({ path: '/marketplace' });
      this.menu_bool = false;
    },
    menuActionClick(action) {
      if (action === 'logout') {
        this.log_out();
      } else if (action === 'profile') {
        this.$router.push({ path: '/profile' });
        this.menu_bool = false;
      } else if (action === 'groups') {
        this.$router.push({ path: '/groups' });
        this.menu_bool = false;
      } else if (action === 'settings') {
        this.$router.push({ path: '/settings' });
        this.menu_bool = false;
      } else if (action === 'tutorial') {
        this.changeTutorial(true);
        this.$router.push({ path: '/' });
        this.menu_bool = false;
      } else if (action === 'a') {
        console.log('Item clicked');
      }
    },
    notificationClick(action) {
      if (action === 'MODELS') {
        this.$router.push({ path: '/models' });
      } else if (action === 'DATASETS') {
        this.$router.push({ path: '/dataset' });
      } else if (action === 'GENERAL') {
        // Maybe seperate page showing general notifications in more detail
      } else if (action === 'MODELJOBS') {
        this.$router.push({ path: '/models' });
      } else if (action === 'VISUALISATIONS') {
        this.$router.push({ path: '/visualisations' });
      } else if (action === 'MARKETPLACE') {
        this.$router.push({ path: '/marketplace' });
      } else if (action === 'OTHER') {
        // Same as general
      } else if (action === 'ADMIN') {
        // Message from admin of one of your groups. Can be about model updates etc.
        // Same as general
      } else {
        console.log('Item clicked');
      }
    },
    showLimitedNotifications() {
      return this.allNotifications.slice(0, this.showAmount);
    },
    ...mapGetters(['getLoggedin', 'getFirstname', 'getLastname', 'getEmail', 'getDevMode']),
    ...mapActions(['logout', 'changeTutorial']),
  },
};
</script>

<style scoped>
.navigation {
  width: 100%;
  height: 52px;
  position: fixed;
  top: 0;
  z-index: 100 !important;
  /* background-image: linear-gradient(rgb(0, 0, 0, 1),rgb(255, 255, 255, 0)); */
  /* background-color: black; /* var(--primary);*/
  color: white;
  text-transform: uppercase;
  justify-content: center;
  overflow: auto;
}
.navigation a {
  text-decoration: none;
  color: white;
  padding: 4%;
}
.navigation a:hover {
  color: gray;
}
.logoMouse >>> :hover {
  cursor: pointer;
}
.vertical-center {
  margin-right: 10px;
  position: absolute;
  top: 50%;
  text-align: right;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.button {
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
  position: relative;
}
.coming_soon {
  position: absolute;
  z-index: 1;
  top: 0;
  margin-top: 18px;
  margin-left: 25px;
  font-size: 0.7em;
  transform: rotate(-20deg);
}
.coming_soon:hover{
  transform: rotate(20deg);
}
.coming_soon_right {
  position: absolute;
  z-index: 1;
  top: 0;
  margin-top: 18px;
  margin-left: 575px;
  font-size: 0.7em;
  transform: rotate(-20deg);
}
.coming_soon_right:hover{
  transform: rotate(20deg);
}
.menu {
  color: black;
  font-weight: bold;
  height: 50vh;
}
.pop_up_menu {
  top: 0px !important;
  width: 20%;
  height: 100%;
  min-width: 160px;
  position: fixed;
  z-index: 110 !important;
  background-color: rgba(0, 0, 0, 0.849);
  background-image: linear-gradient(
    to right,
    rgb(0, 0, 0, 0.5),
    rgb(255, 255, 255, 0)
  );
  /* background-color: rgb(0, 0, 0, 0.5); */
  color: white;
  text-transform: uppercase;
  justify-content: center;
  overflow: auto;
}
.close_pop_up_menu {
  position: absolute;
  top: 5px;
  left: 5px;
}
.menu_items {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  color: white;
}
.menu_items div {
  margin-top: 5%;
  margin-bottom: 5%;
}
.notSeen {
  background-color: rgba(0, 183, 255, 0.103);
}
</style>