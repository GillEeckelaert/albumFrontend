import graphqlClient from '../../utils/graphql'
import { gql } from 'graphql-tag'

export const testQuery = gql`
    query($id: ID!) {
        user(id: $id) {
            id
            events{
                id
                title
                date
                type
                seats
                time
                venue
                city
                country
                price
                ticketsAmount
            }
        }
    }
`;

const actions = {

    async fetchUserAllEvents({rootState}) {

        let response;

        try {
            response = await graphqlClient.query({
                query: testQuery,
                variables: {
                    id: rootState.user.userID,
                }
            });
        } catch(e) {
            console.log(e)
            return {error:true, content:'Events could not be fetched. Please try again later.'}
        } 

        return {error:false, content:response.data.user.events}
        
    },

    async addEventToUser({rootState}, event) {
        
        console.log(event);

        let response;

        try {
            response = await graphqlClient.mutate({
                mutation: gql`
                    mutation (
                    $title: String!, 
                    $users: String!, 
                    $type: String!, 
                    $date: Date!, 
                    $time: Time,
                    $country: String,
                    $city: String,
                    $venue: String,
                    $seats: String,
                    $price: Float,
                    $ticketsAmount: Int,
                    ){
                        addEvent(
                        title: $title,
                        users: $users,
                        type: $type,
                        time: $time,
                        country: $country,
                        city: $city,
                        venue: $venue,
                        seats: $seats,
                        price: $price,
                        ticketsAmount: $ticketsAmount,
                        date: $date){
                            event{
                                id
                                title
                                date
                                type
                            }
                        }
                    },
                `,
                variables: {
                    users: rootState.user.userName,
                    title: event.title,
                    type: event.type,
                    date: event.date,
                    time: event.time,
                    country: event.country,
                    city: event.city,
                    venue: event.venue,
                    seats: event.seats,
                    price: event.price,
                    ticketsAmount: event.ticketsAmount,
                },
                update: (store, {data: { addEvent }}) => {
                    const data = store.readQuery({
                        query: testQuery,
                        variables: { id: rootState.user.userID }
                    })
                    data.user.events.push(addEvent.event)
                    store.writeQuery({query: testQuery, data})
                }
            });
        } catch(e) {
            return {error: true, content:'Event could not be added. Please try again.'}
        }
        console.log(response);

        return {error:false, content: null}
    },

    async deleteEventFromUser({rootState}, title) {
        
        console.log(title);

        let response;

        try {
            response = await graphqlClient.mutate({
                mutation: gql`
                    mutation (
                    $title: String!, 
                    $username: String!, 
                    ){
                        deleteEvent(
                        title: $title,
                        username: $username){
                            event{
                                id
                                title
                            }
                        }
                    },
                `,
                variables: {
                    username: rootState.user.userName,
                    title: title,
                },
                update: (store, {data: { deleteEvent }}) => {
                    const data = store.readQuery({
                        query: testQuery,
                        variables: { id: rootState.user.userID }
                    })
                    console.log(deleteEvent)
                    console.log(data)
                    const tempEvent = data.user.events.find(event => event.id === deleteEvent.event.id)
                    const index = data.user.events.indexOf(tempEvent)
                    data.user.events.splice(index, 1)
                    store.writeQuery({query: testQuery, data})
                }
            });
        } catch(e) {
            return {error: true, content:'Event could not be deleted. Please try again.'}
        }
        console.log(response);

        return {error:false, content: null}
    },

};

const getters = {
};

const mutations = {
};

const state = {

};

export default {
    state,
    getters,
    mutations,
    actions,
};