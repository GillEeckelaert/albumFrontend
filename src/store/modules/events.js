import graphqlClient from '../../utils/graphql'
import { gql } from 'graphql-tag'

const actions = {

    async fetchUserAllEvents({rootState}) {

        let response;

        try {
            response = await graphqlClient.query({
                query: gql`
                    query($id: ID!) {
                        user(id: $id) {
                            id
                            events{
                                title
                                date
                                type
                            }
                        }
                    }
                `,
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
                    ){
                        addEvent(
                        title: $title,
                        users: $users,
                        type: $type,
                        date: $date){
                            event{
                                title
                            }
                        }
                    },
                `,
                variables: {
                    users: rootState.user.userName,
                    title: event.title,
                    type: event.type,
                    date: event.date,
                }
            });
        } catch(e) {
            return {error: true, content:'Event could not be added. Please try again.'}
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