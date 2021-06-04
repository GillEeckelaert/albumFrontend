<template>
<div class="events">

    <!-- Show AddBook Dialog -->
    <div>
        <v-dialog
        v-model="showAddEvent"
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
                    VOEG EVENEMENT TOE
                    <v-spacer />
                    <v-btn icon dark @click="closeAddEvent()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <v-text-field 
                    v-model="newEvent.title"
                    label="Titel"
                    outlined
                    dense
                    clearable
                    background-color="rgba(255,255,255,0.1)"
                    class="mt-4"
                    />
                </v-card-text>

                <v-card-text>
                    <v-text-field 
                    v-model="newEvent.type"
                    label="Type evenement"
                    outlined
                    dense
                    clearable
                    background-color="rgba(255,255,255,0.1)"
                    class="mt-4"
                    />
                </v-card-text>

                <v-card-text>
                    <v-menu
                    ref="showDatePicker"
                    v-model="showDatePicker"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="newEvent.date"
                        label="Datum"
                        prepend-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        background-color="rgba(255,255,255,0.1)"
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="newEvent.date"
                        no-title
                        @input="showDatePicker = false"
                    ></v-date-picker>
                    </v-menu>
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
                        MEER OPTIES
                    </div>
                </v-expand-transition>

                <v-card-text class="red--text" v-if="error.location == 'addEvent'">
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
                    <v-btn text dark @click="appendEvent()">VOEG TOE</v-btn>
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
                ZOEKEN
                </v-btn>
            </v-col>

            <v-col cols="auto">
                <v-btn
                text
                :color="view == 'standard' ? 'black' : '#46aef7'"
                @click="view == 'standard' ? view = 'fancy' : view = 'standard'"
                >
                VIEW
                </v-btn>
            </v-col>

            <v-spacer />

            <v-col cols="auto">
                <v-btn
                text
                :disabled="loading.location == 'main'"
                @click="showAddEvent = true"
                >
                <span v-if="$vuetify.breakpoint.smAndUp">
                    VOEG EVENEMENT TOE
                </span>
                <v-icon v-else>mdi-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </div>

    <!-- Show filters -->
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

    <!-- Show search bar -->
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

    <!-- Loading of page -->
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

    <!-- Error of page -->
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

    <!-- Page content -->
    <div v-else>

        <v-card 
        class="ma-2 mx-auto mb-n4" 
        max-width="500px" 
        width="90%"
        color="transparent"
        elevation="0"
        >
            <v-card-title>
                Volgende evenement:
                <v-spacer />
                {{Math.ceil((new Date(upcomingEvent.date) - currentDate)/ (1000 * 60 * 60 * 24))}} dagen
            </v-card-title>
        </v-card>

        <v-card 
        class="ma-2 mx-auto bookCard" 
        max-width="500px" 
        width="90%"
        dark 
        >
            <v-card-text>
                <div>
                    <v-row>
                        <v-col cols="auto" class="white--text">
                            <h2>{{ upcomingEvent.title }}</h2>
                        </v-col>
                    </v-row>
                    <v-expand-transition>
                        <div>
                            <v-row class="mt-n5">
                                <v-col cols="auto">
                                    <h4>{{ upcomingEvent.date }}</h4>
                                </v-col>
                            </v-row>
                            <v-row class="ma-2" v-if="upcomingEvent.type">
                                <v-chip
                                label
                                outlined
                                >
                                {{upcomingEvent.type}}
                                </v-chip>
                            </v-row>
                        </div>
                    </v-expand-transition>
                </div>
            </v-card-text>
        </v-card>

        <v-card 
        class="ma-2 mx-auto mb-n4" 
        max-width="500px" 
        width="90%"
        color="transparent"
        elevation="0"
        >
            <v-card-title>
                Alle evenementen:
            </v-card-title>
        </v-card>

        <div
        v-for="(event,i) in filteredEvents" 
        :key="i"
        >
            <div v-if="view == 'fancy'">
                <v-card
                class="ma-4 mx-auto" 
                max-width="500px" 
                dark 
                v-if="fancyView(event.date.substr(0,4),i)"
                width="90%"
                >
                    <v-row>
                        <span class="font-weight-bold ml-6">
                        {{fancyView(event.date.substr(0,4),i)}}
                        </span>
                    </v-row>
                </v-card>

                <v-card
                class="ma-4 mx-auto" 
                max-width="500px" 
                dark 
                v-if="fancyView(event.date.substr(5,2),i)"
                width="90%"
                >
                    <v-row>
                        <span class="font-weight-bold ml-6">
                        {{fancyView(event.date.substr(5,2),i)}}
                        </span>
                    </v-row>
                </v-card>
            </div>

            <v-card 
            class="ma-2 mx-auto bookCard" 
            max-width="500px" 
            dark 
            width="90%"
            @click="showExpandedCard == i ? showExpandedCard = null : showExpandedCard = i"
            >
                <v-card-text>
                    <div>
                        <v-row>
                            <v-col cols="auto" class="white--text">
                                <h2>{{ event.title }}</h2>
                            </v-col>
                            <v-col cols="auto" v-if="view == 'standard' && showExpandedCard != i">
                                <h4>{{ event.date }}</h4>
                            </v-col>
                            <v-spacer />
                            <v-col cols="auto" v-if="view == 'fancy'">
                                <h2 class="white--text">{{ event.date.substr(8,2) }}</h2>
                            </v-col>
                        </v-row>
                    </div>
                </v-card-text>

                <v-expand-transition>
                    <div v-if="showExpandedCard == i">
                        <v-card-text class="mt-n8">
                            <div>
                                <v-row class="mt-n3">
                                    <v-col cols="auto">
                                        <h4>{{ event.date }}</h4>
                                    </v-col>
                                </v-row>
                                <v-row class="ma-2" v-if="event.type">
                                    <v-chip
                                    label
                                    outlined
                                    >
                                    {{event.type}}
                                    </v-chip>
                                </v-row>
                            </div>
                        </v-card-text>

                        <v-card-actions class="mt-n6">
                            <v-spacer />
                            <v-btn 
                            text 
                            color="white"
                            :disabled="loading.location == 'removeEvent'"
                            >
                                Update
                            </v-btn>
                            <v-btn 
                            text 
                            color="red" 
                            :loading="loading.location == 'removeEvent'"
                            @click="removeEvent(event)"
                            >
                                Delete
                            </v-btn>
                        </v-card-actions>
                    </div>
                </v-expand-transition>
            </v-card>
        </div>
    </div>
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
            showAddEvent: false,
            showMoreOptions: false,
            showSearch: false,
            showFilter: false,
            showExpandedCard: null,
            showDatePicker: false,

            filterRead: false,

            view: 'standard',
            years: [],
            months: [],
            allMonths: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],

            events: null,
            upcomingEvent: null,
            search: '',

            currentDate: new Date(),

            error: {
                location: null,
                content: null,
            },

            loading: {
                location: null,
            },

            newEvent: {
                title: null,
                type: null,
                date: null,
            }
        }
    },
    async created() {
        this.loading.location = 'main';
        await this.findCorrectEvents();
    },
    computed: {
        filteredEvents: function () {
            //var app = this;
            if (this.search != null) {
            return this.events.filter(function() {
                //let bool = false;
                //const regex = new RegExp(`(${app.search})`, 'i');
                return (
                    true
                );
            })
            } else {
                return this.events;
            }
        },
    },
    methods: {
        /* async findAuthorsUser() {
            const response = await this.fetchUserAllAuthors();
            this.authors = response.content;
            console.log(this.authors)
        }, */

        fancyView(arg, i) {
            if(arg.length == 4) {
                for(var j in this.years) {
                    if (this.years[j].year == arg) {
                        if (this.years[j].key == i) {
                            return arg
                        }
                        else {
                            return null
                        }
                    }
                }
                this.years.push({year:arg, key:i})
            }
            else {
                for(var k in this.months) {
                    if (this.months[k].month == arg) {
                        if (this.months[k].key == i) {
                            const index = parseInt(arg)
                            return this.allMonths[index-1]
                        }
                        else {
                            return null
                        }
                    }
                }
                this.months.push({month:arg, key:i})
            }
            return arg;
        }, 

        async findCorrectEvents() {
            this.years = []
            this.months = []
            const response = await this.fetchUserAllEvents();
            if (response.error) {
                this.error.content = response.content;
                this.error.location = 'main';
                this.loading.location = null;
                return;
            }

            this.events = response.content;
            console.log(this.events);

            this.events.sort(function(a,b) {
                return new Date(a.date) - new Date(b.date)
            })

            var app = this;

            this.upcomingEvent = this.events.find(function(event) {
                return new Date (event.date) >= app.currentDate
            })

            console.log(this.upcomingEvent)

            console.log(this.events)

            this.loading.location = null;
            return;
        },

        async appendEvent() {
            this.error.location = null;
            if (this.newEvent.title == null) {
                this.error.content = 'Je moet verplicht een titel opgeven.'
                this.error.location = 'addEvent'
                return;
            }
            const response = await this.addEventToUser(this.newEvent);
            console.log(response);
            await this.findCorrectEvents()
            this.closeAddEvent();
        }, 

        async removeEvent(event) {
            this.loading.location = 'removeEvent'
            this.error.location = null;
            if (event.title == null) {
                this.error.content = 'Evenement kan niet verwijderd worden. Probeer later opnieuw.'
                this.error.location = 'removeEvent'
                this.loading.location = null
                return;
            }
            const response = await this.deleteEventFromUser(event.title);
            if (response.error) {
                this.error.content = 'Evenement kan niet verwijderd worden. Probeer later opnieuw.'
                this.error.location = 'removeEvent'
                this.loading.location = null
                return;
            }

            console.log(response);
            await this.findCorrectEvents();
            this.loading.location = null
        },

        closeAddEvent() {
            this.showAddEvent = false;
            this.newEvent.title = null;
            this.newEvent.type = null;
            this.newEvent.date = null;
        }, 

        ...mapActions([
            'fetchAllUsers',
            'fetchUserAllEvents',
            'addEventToUser',
            'deleteEventFromUser'
        ]),
        ...mapGetters(['getAllUsers'])

    }
}
</script>

<style>

.events {
    width: 100%;
}

.addBook {
    background-image: linear-gradient(#00ecde, #00a79b);
}

.bookCard {
    background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
}

</style>