<template>
<div class="books">

    <div>
        <v-dialog
        v-model="showAddBook"
        width="90%"
        max-width="500px"
        overlay-opacity="0.8"
        overlay-color="white"
        >
            <v-card
            class="bookCard"
            dark
            >
                <v-card-title style="background-color:rgba(0,0,0,0.2);" class="white--text">
                    ADD BOOK
                    <v-spacer />
                    <v-btn icon dark @click="closeAddBook()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <v-text-field 
                    v-model="newBook.title"
                    label="Titel"
                    outlined
                    dense
                    clearable
                    background-color="rgba(255,255,255,0.1)"
                    class="mt-4"
                    />
                </v-card-text>

                <v-card-text>
                    <v-combobox
                    v-model="newBook.authors"
                    :items="authors"
                    label="Authors"
                    multiple
                    outlined
                    dense
                    small-chips
                    hide-selected
                    background-color="rgba(255,255,255,0.1)"
                    class="mt-n6"
                    ></v-combobox>
                </v-card-text>

                <v-card-text>
                    <v-btn
                    text
                    plain
                    @click="showMoreOptions = !showMoreOptions"
                    >
                        MEER OPTIES
                        <v-icon v-if="!showMoreOptions">mdi-chevron-right</v-icon>
                        <v-icon v-else>mdi-chevron-down</v-icon>
                    </v-btn>
                </v-card-text>

                <v-expand-transition>
                    <div v-if="showMoreOptions" class="mx-2 mt-n8">
                        <v-card-text>
                            <v-textarea 
                            v-model="newBook.description"
                            label="Description"
                            outlined
                            dense
                            background-color="rgba(255,255,255,0.1)"
                            class="mt-4 mb-n4"
                            />
                        </v-card-text>

                        <v-card-text>
                            <v-text-field 
                            v-model="newBook.category"
                            label="Category"
                            outlined
                            dense
                            clearable
                            background-color="rgba(255,255,255,0.1)"
                            class="mt-n4"
                            />
                        </v-card-text>

                        <v-card-text class="mt-n14">
                            <v-checkbox 
                            v-model="newBook.read"
                            label="Gelezen?"
                            />
                        </v-card-text>

                        <v-card-text class="mt-n10">
                            <v-rating
                            empty-icon="mdi-star-outline"
                            full-icon="mdi-star"
                            half-icon="mdi-star-half-full"
                            hover
                            half-increments
                            length="5"
                            size="20"
                            color="white"
                            background-color="white"
                            v-model="newBook.rating"
                            ></v-rating>
                        </v-card-text>
                    </div>
                </v-expand-transition>

                <v-card-text class="red--text" v-if="error.location == 'addBook'">
                    <span class="font-weight-bold">
                        ERROR
                    </span>
                    <span class="white--text">
                        {{ error.content }}
                    </span>
                    <v-btn icon @click="error.location = null">
                        <v-icon small color="white">mdi-close</v-icon>
                    </v-btn>
                </v-card-text>

                <v-divider />

                <v-card-actions style="background-color:rgba(0,0,0,0.2);">
                    <v-spacer />
                    <v-btn text dark @click="appendBook()">VOEG TOE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

    <!-- Sub Header -->
    <div>
        <v-row class="mx-2">
            <v-col cols="auto">
                <v-btn
                text
                @click="showSearch = false; showFilter = !showFilter"
                >
                FILTER
                </v-btn>
            </v-col>

            <v-col cols="auto">
                <v-btn
                text
                @click="showFilter = false; showSearch = !showSearch"
                >
                SEARCH
                </v-btn>
            </v-col>

            <v-spacer />

            <v-col cols="auto">
                <v-btn
                text
                :disabled="loading.location == 'main'"
                @click="showAddBook = true"
                >
                ADD BOOK
                </v-btn>
            </v-col>
        </v-row>
    </div>

    <v-expand-transition>
        <div v-if="showFilter">
            <v-row>
                <v-spacer />
                <v-col cols="auto">
                    <v-btn
                    small
                    rounded
                    color="#46aef7"
                    :outlined="!filterRead"
                    dark
                    depressed
                    @click="filterRead = !filterRead"
                    >
                        ONGELEZEN
                    </v-btn>
                </v-col>
                <v-spacer />
            </v-row>
        </div>
    </v-expand-transition>

    <v-expand-transition>
        <div v-if="showSearch">
            <v-row>
                <v-spacer />
                <v-col cols="6">
                    <v-text-field 
                    v-model="search"
                    rounded 
                    outlined 
                    dense
                    prepend-inner-icon="mdi-magnify"
                    clearable
                    />
                </v-col>
                <v-spacer />
            </v-row>
        </div>
    </v-expand-transition>

    <div class="mt-8" v-if="loading.location == 'main'">
        <v-row>
            <v-col class="text-center">
                <span>
                    We halen alle data op.
                </span>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <v-progress-circular indeterminate/>
            </v-col>
        </v-row>
    </div>

    <v-card color="red" width="90%" class="mx-auto white--text mt-4" v-else-if="error.location == 'main'">
        <v-card-title>
            <span class="subtitle-2 black--text">
                ERROR 
            </span>
            <span class="subtitle-2 white--text ml-1">
                {{ error.content }}
            </span>
            <v-spacer />
            <v-btn icon @click="error.location = null">
                <v-icon color="white">
                    mdi-close
                </v-icon>
            </v-btn>
        </v-card-title>
    </v-card>

  <v-card 
  class="ma-2 mx-auto bookCard" 
  max-width="500px" 
  width="90%"
  dark 
  v-for="(book,i) in filteredBooks" 
  :key="i" v-else
  @click="showExpandedCard == i ? showExpandedCard = null : showExpandedCard = i"
  >
      <v-card-text>
          <div>
              <v-row>
                  <v-col cols="auto" class="white--text">
                    <h2>{{ book.book.title }}</h2>
                  </v-col>
                  <v-col cols="auto" v-if="showExpandedCard != i">
                    <h4>{{ book.book.authors[0].name }}</h4>
                  </v-col>
                  <v-spacer />
                  <v-col cols="auto">
                    <v-icon color="green" v-if="book.read>0">mdi-check-circle-outline</v-icon>
                    <v-icon color="red" v-else>mdi-close-circle-outline</v-icon>
                  </v-col>
              </v-row>
              <v-expand-transition>
                  <div v-if="showExpandedCard == i">
                    <v-row class="mt-n6">
                        <v-col cols="auto" v-for="(author, j) in book.book.authors" :key="j">
                            <h4>{{ author.name }}</h4>
                        </v-col>
                    </v-row>
                    <v-row class="my-n4">
                        <v-col>
                            <p>{{book.book.description}}</p>
                        </v-col>
                    </v-row>
                    <v-row class="ma-2" v-if="book.book.category">
                        <v-chip
                        label
                        outlined
                        >
                        {{book.book.category}}
                        </v-chip>
                    </v-row>
                  </div>
              </v-expand-transition>
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
            showAddBook: false,
            showMoreOptions: false,
            showSearch: false,
            showFilter: false,
            showExpandedCard: null,

            filterRead: false,

            authors: null,
            books: null,
            search: '',

            error: {
                location: null,
                content: null,
            },

            loading: {
                location: null,
            },

            newBook: {
                title:null, 
                description:null, 
                rating:null, 
                category:null, 
                price:null, 
                purchaseDate:null, 
                edition:null, 
                type:null, 
                language:null, 
                pages:null, 
                authors:null, 
                serie:null, 
                collection:null,
                read:null,
            }
        }
    },
    async created() {
        this.loading.location = 'main';
        await this.findAuthorsUser();
        await this.findCorrectBooks();
    },
    computed: {
        filteredBooks: function () {
            var app = this;
            if (this.search != null) {
            return this.books.filter(function(book) {
                let bool = false;
                const regex = new RegExp(`(${app.search})`, 'i');
                if (book.book.category != null) {
                    bool += book.book.category.match(regex)
                }
                if (book.book.authors != null) {
                    book.book.authors.forEach(author => {
                        bool += author.name.match(regex)
                    });
                }
                return (
                    !(book.read * app.filterRead > 0) &&
                    (book.book.title.match(regex) || bool)
                );
            })
            } else {
                return this.books;
            }
        },
    },
    methods: {
        async findAuthorsUser() {
            const response = await this.fetchUserAllAuthors();
            this.authors = response.content;
            console.log(this.authors)
        },

        async findCorrectBooks() {
            const response = await this.fetchUserAllBooks();
            if (response.error) {
                this.error.content = response.content;
                this.error.location = 'main';
                this.loading.location = null;
                return;
            }

            this.books = response.content;
            console.log(this.books);
            this.loading.location = null;
            return;
        },

        async appendBook() {
            this.error.location = null;
            if (this.newBook.title == null) {
                this.error.content = 'Je moet verplicht een titel opgeven.'
                this.error.location = 'addBook'
                return;
            }
            const response = await this.addBookToUser(this.newBook);
            console.log(response);
            this.closeAddBook();
        },

        closeAddBook() {
            this.showAddBook = false;
            this.newBook.title = null;
            this.newBook.description = null;
            this.newBook.rating = null;
            this.newBook.category = null;
            this.newBook.price = null;
            this.newBook.purchaseData = null;
            this.newBook.edition = null;
            this.newBook.type = null;
            this.newBook.language = null;
            this.newBook.pages = null;
            this.newBook.authors = null;
            this.newBook.serie = null;
            this.newBook.collection = null;
            this.newBook.read = null;
        },

        ...mapActions([
            'fetchAllUsers',
            'fetchUserAllBooks',
            'fetchUserAllAuthors',
            'addBookToUser',
        ]),
        ...mapGetters(['getAllUsers'])

    }
}
</script>

<style>

.books {

}

.addBook {
    background-image: linear-gradient(#00ecde, #00a79b);
}

.bookCard {
    background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
}

</style>