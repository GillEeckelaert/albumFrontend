<template>
<div class="books">
  <v-card class="ma-10" dark>
      <v-card-title>
          GRAPHQL TEST
      </v-card-title>

      <v-card-text v-if="result">
          <div v-for="(data, i) in result.allUsers.edges" :key="i">
              <h2>{{ data.node.username }}</h2>
              {{ data.node.id}}
              <v-row v-for="(book, j) in data.node.books" :key="j" class="ml-5">
                  <v-col>
                    <h3 class="primary--text">{{ book.book.title }}</h3>
                  </v-col>
                  <v-col>
                    <v-icon color="green" v-if="book.read>0">mdi-check-circle-outline</v-icon>
                    <v-icon color="red" v-else>mdi-close-circle-outline</v-icon>
                  </v-col>
              </v-row>
          </div>
      </v-card-text>
  </v-card>
</div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'

export default {
    setup() {
        return {
        }
    },
    data() {
        return {

        }
    },
    async created() {
        await this.testfunction();
    },
    computed: {
        result: function () {
            return this.getAllUsers()
        }
    },
    methods: {
        async testfunction() {
            await this.fetchAllUsers();
        },
        ...mapActions(['fetchAllUsers']),
        ...mapGetters(['getAllUsers'])

    }
}
</script>

<style>

.books {

}

</style>