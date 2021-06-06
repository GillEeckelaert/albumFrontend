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
        persistent
        >
            <v-card
            class="bookCard"
            dark
            >
                <v-card-title style="background-color:rgba(0,0,0,0.2);" class="white--text">
                    <v-col cols="10">
                    VOEG EVENEMENT TOE
                    </v-col>
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
                    class="mt-8"
                    />
                </v-card-text>

                <v-card-text>
                    <v-select 
                    v-model="newEvent.type"
                    :items="categories"
                    label="Type evenement"
                    outlined
                    dense
                    background-color="rgba(255,255,255,0.1)"
                    class="mt-n6"
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
                        class="mt-n6"
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
                    <div v-if="showMoreOptions" class="mx-2">
                        <v-card-text>
                            <v-menu
                                ref="timePicker"
                                v-model="showTimePicker"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="newEvent.time"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="newEvent.time"
                                        label="Tijd"
                                        prepend-icon="mdi-clock-time-four-outline"
                                        readonly
                                        outlined
                                        dense
                                        background-color="rgba(255,255,255,0.1)"
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>

                                <v-time-picker
                                v-if="showTimePicker"
                                v-model="newEvent.time"
                                full-width
                                @click:minute="$refs.timePicker.save(newEvent.time)"
                                ></v-time-picker>
                            </v-menu>
                        </v-card-text>

                        <v-card-text>
                            <v-text-field 
                            v-model="newEvent.country"
                            label="Land"
                            outlined
                            dense
                            clearable
                            prepend-icon="mdi-earth"
                            background-color="rgba(255,255,255,0.1)"
                            class="mt-n8"
                            />
                        </v-card-text>

                        <v-card-text>
                            <v-text-field 
                            v-model="newEvent.city"
                            label="Stad"
                            outlined
                            dense
                            clearable
                            prepend-icon="mdi-city-variant-outline"
                            background-color="rgba(255,255,255,0.1)"
                            class="mt-n8"
                            />
                        </v-card-text>

                        <v-card-text>
                            <v-text-field 
                            v-model="newEvent.venue"
                            label="Locatie"
                            outlined
                            dense
                            clearable
                            prepend-icon="mdi-domain"
                            background-color="rgba(255,255,255,0.1)"
                            class="mt-n8"
                            />
                        </v-card-text>

                        <v-card-text>
                            <v-icon>mdi-ticket-outline</v-icon>
                        </v-card-text>
                        <v-divider />

                        <div
                        style="background-color:rgba(255,0,0,0.1)"
                        >
                            <v-card-text 
                            v-for="index in newEvent.ticketsAmount"
                            :key="index"
                            class=""
                            >
                                <v-row class="mt-3 mb-n16">
                                    <v-col cols="auto" class="mt-2">
                                        {{index}} |
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                        v-model="newEvent.seats[index]"
                                        label="Plaats"
                                        outlined
                                        dense
                                        prepend-icon="mdi-seat"
                                        background-color="rgba(255,255,255,0.1)"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-text class="mt-6">
                                <v-row>
                                    <v-spacer />
                                    <v-btn v-if="newEvent.ticketsAmount > 1" icon class="mr-4 mb-4" @click="newEvent.ticketsAmount -= 1">
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                    <v-btn icon class="mr-4 mb-4" @click="newEvent.ticketsAmount += 1">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-card-text>
                        </div>

                        <v-divider class="" />

                        <v-card-text>
                            <v-text-field 
                            v-model="newEvent.price"
                            label="Prijs"
                            outlined
                            dense
                            clearable
                            type="number"
                            prepend-icon="mdi-currency-eur"
                            background-color="rgba(255,255,255,0.1)"
                            class="mt-4"
                            />
                        </v-card-text>

                        <v-card-text>
                        </v-card-text>

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
                <span v-if="$vuetify.breakpoint.smAndUp">
                    FILTER
                </span>
                <v-icon v-else>mdi-filter-variant</v-icon>
                </v-btn>
            </v-col>

            <v-col cols="auto">
                <v-btn
                text
                @click="showFilter = false; showSearch = !showSearch"
                >
                <span v-if="$vuetify.breakpoint.smAndUp">
                    ZOEKEN
                </span>
                <v-icon v-else>mdi-magnify</v-icon>
                </v-btn>
            </v-col>

            <v-col cols="auto">
                <v-btn
                text
                @click="showView = !showView"
                >
                <span v-if="$vuetify.breakpoint.smAndUp">
                    VIEW
                </span>
                <v-icon v-else>mdi-view-dashboard-outline</v-icon>
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

    <!-- Show views -->
    <v-expand-transition>
        <div v-if="showView">
            <v-row>
                <v-spacer />
                <v-col cols="auto">
                    <v-btn
                    small
                    rounded
                    color="#46aef7"
                    :outlined="view != 'fancy'"
                    dark
                    depressed
                    @click="view == 'standard' ? view = 'fancy' : view = 'standard'"
                    >
                        FANCY
                    </v-btn>
                </v-col>
                <v-col cols="auto">
                    <v-btn
                    small
                    rounded
                    color="#46aef7"
                    :outlined="!viewPast"
                    dark
                    depressed
                    @click="viewPast = !viewPast"
                    >
                        VOORBIJE EVENEMENTEN
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
        <div v-if="events.length > 0">
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
            v-bind:class="['eventCard', 'eventCard'+upcomingEvent.type]"
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
                            <v-spacer />
                            <v-col cols="auto">
                                <v-chip
                                label
                                color="white"
                                class="mt-1"
                                >
                                <span v-bind:class="['eventCard'+upcomingEvent.type]">{{upcomingEvent.type}}</span>
                                </v-chip>
                            </v-col>
                        </v-row>
                        <v-row class="mt-n10">
                            <v-col cols="auto">
                                <h4>{{ upcomingEvent.date }}</h4>
                            </v-col>
                        </v-row>
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
                    Komende evenementen:
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
                v-bind:class="['eventCard', 'eventCard'+event.type]"
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
                                <v-col cols="auto" v-if="view == 'standard'">
                                    <h4>{{ event.date }}</h4>
                                </v-col>
                                <v-spacer />
                                <v-col cols="auto" v-if="view == 'fancy'">
                                    <h2 class="white--text">{{ event.date.substr(8,2) }}</h2>
                                </v-col>
                                <v-col cols="auto">
                                    <v-icon v-if="event.type == 'Concert'">mdi-microphone-variant</v-icon>
                                    <v-icon v-if="event.type == 'Musical'">mdi-drama-masks</v-icon>
                                    <v-icon v-if="event.type == 'Sport'">mdi-soccer</v-icon>
                                    <v-icon v-if="event.type == 'Evenement'">mdi-calendar</v-icon>
                                    <v-icon v-if="event.type == 'Pretpark'">mdi-ferris-wheel</v-icon>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-text>

                    <v-expand-transition>
                        <div v-if="showExpandedCard == i">
                            <v-card-text class="mt-n8">
                                <div>
                                    <v-row class="mt-n3">
                                        <v-col cols="auto" v-if="event.city || event.venue">
                                            <h4 v-if="event.city && event.venue">{{event.venue}}, {{event.city}}</h4>
                                            <h4 v-else-if="event.city">{{event.city}}</h4>
                                            <h4 v-else-if="event.venue">{{event.venue}}</h4>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-n7" v-if="event.time">
                                        <v-col cols="auto grey--text text--lighten-3">
                                            <h5>{{event.time.substr(0,5)}}</h5>
                                        </v-col>
                                    </v-row>
                                    <div v-if="event.seats != null" class="mt-4 text-center">
                                        <v-row 
                                        v-for="(ticket, l) in event.seats.split('|')"
                                        class="mt-n4"
                                        :key="l"
                                        >
                                            <v-col>
                                                <v-chip
                                                label 
                                                outlined
                                                color="white"
                                                class=""
                                                >
                                                <v-icon class="mr-2">mdi-seat</v-icon>
                                                {{ticket}}
                                                </v-chip>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <v-row class="mt-n3 mb-n11">
                                        <v-col cols="auto">
                                            <v-chip
                                            label
                                            color="white"
                                            class="mt-2"
                                            >
                                            <span v-bind:class="'eventCard'+event.type">{{event.type}}</span>
                                            </v-chip>
                                        </v-col>
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
                                color="white" 
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

            <div v-if="viewPast">
                <v-card 
                class="ma-2 mx-auto mb-n4" 
                max-width="500px" 
                width="90%"
                color="transparent"
                elevation="0"
                >
                    <v-card-title>
                        Voorbije evenementen:
                    </v-card-title>
                </v-card>

                <div
                v-for="(event,i) in passedEvents" 
                :key="'p'+i"
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
                    v-bind:class="['eventCard', 'eventCard'+event.type]"
                    max-width="500px" 
                    dark 
                    width="90%"
                    @click="showExpandedCard == 'p'+i ? showExpandedCard = null : showExpandedCard = 'p'+i"
                    >
                        <v-card-text>
                            <div>
                                <v-row>
                                    <v-col cols="auto" class="white--text">
                                        <h2>{{ event.title }}</h2>
                                    </v-col>
                                    <v-col cols="auto" v-if="view == 'standard'">
                                        <h4>{{ event.date }}</h4>
                                    </v-col>
                                    <v-spacer />
                                    <v-col cols="auto" v-if="view == 'fancy'">
                                        <h2 class="white--text">{{ event.date.substr(8,2) }}</h2>
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-icon v-if="event.type == 'Concert'">mdi-microphone-variant</v-icon>
                                        <v-icon v-if="event.type == 'Musical'">mdi-drama-masks</v-icon>
                                        <v-icon v-if="event.type == 'Sport'">mdi-soccer</v-icon>
                                        <v-icon v-if="event.type == 'Evenement'">mdi-calendar</v-icon>
                                        <v-icon v-if="event.type == 'Pretpark'">mdi-ferris-wheel</v-icon>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card-text>

                        <v-expand-transition>
                            <div v-if="showExpandedCard == 'p'+i">
                                <v-card-text class="mt-n8">
                                    <div>
                                        <v-row class="mt-n3">
                                            <v-col cols="auto" v-if="event.city || event.venue">
                                                <h4 v-if="event.city && event.venue">{{event.venue}}, {{event.city}}</h4>
                                                <h4 v-else-if="event.city">{{event.city}}</h4>
                                                <h4 v-else-if="event.venue">{{event.venue}}</h4>
                                            </v-col>
                                        </v-row>
                                        <v-row class="mt-n7" v-if="event.time">
                                            <v-col cols="auto grey--text text--lighten-3">
                                                <h5>{{event.time.substr(0,5)}}</h5>
                                            </v-col>
                                        </v-row>
                                        <div v-if="event.seats != null" class="mt-4 text-center">
                                            <v-row 
                                            v-for="(ticket, l) in event.seats.split('|')"
                                            class="mt-n4"
                                            :key="l"
                                            >
                                                <v-col>
                                                    <v-chip
                                                    label 
                                                    outlined
                                                    color="white"
                                                    class=""
                                                    >
                                                    <v-icon class="mr-2">mdi-seat</v-icon>
                                                    {{ticket}}
                                                    </v-chip>
                                                </v-col>
                                            </v-row>
                                        </div>
                                        <v-row class="mt-n3 mb-n11">
                                            <v-col cols="auto">
                                                <v-chip
                                                label
                                                color="white"
                                                class="mt-2"
                                                >
                                                <span v-bind:class="'eventCard'+event.type">{{event.type}}</span>
                                                </v-chip>
                                            </v-col>
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
                                    color="white" 
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

        <div v-else>
            <v-row>
                <v-col class="text-center mt-8">
                    <v-icon size="75">
                        mdi-calendar-remove
                    </v-icon>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-center mt-n4">
                    Je hebt nog geen evenementen toegevoegd.
                </v-col>
            </v-row>
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
            showView: false,
            showExpandedCard: null,
            showDatePicker: false,
            showTimePicker: false,
            showTimePicker2: false,

            filterRead: false,

            view: 'standard',
            viewPast: false,
            years: [],
            months: [],
            allMonths: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
            categories: ['Musical', 'Concert', 'Toneel', 'Festival', 'Evenement', 'Sport', 'Pretpark'],

            events: null,
            passedEvents: null,
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
                time: null,
                ticketsAmount: 1,
                eticket: null,
                price: null,
                confirmation: null,
                country: null,
                city: null,
                venue: null,
                seats: [],
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
            console.log('HIER')
            this.years = []
            this.months = []
            const response = await this.fetchUserAllEvents();
            if (response.error) {
                this.error.content = response.content;
                this.error.location = 'main';
                this.loading.location = null;
                return;
            }

            var app = this;

            this.events = response.content.filter(function(event) {
                return new Date(event.date) >= app.currentDate;
            });

            this.passedEvents = response.content.filter(function(event) {
                return new Date(event.date) < app.currentDate;
            });

            this.events.sort(function(a,b) {
                return new Date(a.date) - new Date(b.date)
            })

            this.passedEvents.sort(function(a,b) {
                return new Date(b.date) - new Date(a.date)
            })

            if (this.events.length > 0){
                this.upcomingEvent = this.events.find(function(event) {
                    return new Date (event.date) >= app.currentDate
                })


                console.log(this.upcomingEvent)
            }

            console.log(this.events)

            this.loading.location = null;
            console.log('DAAR')
            return;
        },

        async appendEvent() {
            this.error.location = null;
            if (this.newEvent.seats == null || this.newEvent.seats.length == 0) {
                this.newEvent.seats = null;
            } 
            else {
                let seats = ''
                for (var i = 1; i < this.newEvent.seats.length; i++) {
                    console.log(this.newEvent.seats[i])
                    if(seats == '') {
                        seats += this.newEvent.seats[i]
                    } else {
                        seats += '|'+this.newEvent.seats[i]
                    }
                }
                this.newEvent.seats = seats;
            }

            if (this.newEvent.title == null) {
                this.error.content = 'Je moet verplicht een titel opgeven.'
                this.error.location = 'addEvent'
                this.newEvent.seats = []
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
            this.newEvent.time = null;
            this.newEvent.country = null;
            this.newEvent.city = null;
            this.newEvent.venue = null;
            this.newEvent.seats = [];
            this.newEvent.ticketsAmount = 1;
            this.newEvent.price = null;
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
    margin-left: auto;
    margin-right: auto;
    margin-top: 8px;
    margin-bottom: 8px;
}

.eventCard{
    margin-left: auto;
    margin-right: auto;
    margin-top: 8px;
    margin-bottom: 8px;
}

.eventCardMusical {
    background-image: radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
}

span.eventCardMusical {
    background: transparent;
    color: rgb(0, 153, 255);
}

.eventCardConcert {
    background-image: radial-gradient(circle 248px at center, #e31616 0%, #ec3030 47%, #f74646 100%);
}

span.eventCardConcert {
    background: transparent;
    color: rgb(255, 0, 0);
}

.eventCardSport {
    background-image: radial-gradient(circle 248px at center, #8016e3 0%, #b030ec 47%, #a746f7 100%);
}

span.eventCardSport {
    background: transparent;
    color: rgb(183, 0, 255);
}

.eventCardPretpark {
    background-image: radial-gradient(circle 248px at center, #e39116 0%, #ecba30 47%, #f7ce46 100%);
}

span.eventCardPretpark {
    background: transparent;
    color: rgb(255, 166, 0);
}

</style>