import graphqlClient from '../../utils/graphql'
import { gql } from 'graphql-tag'

const actions = {
    async logIn({commit}, username) {

        let response;
        
        console.log(username)

        try {
            response = await graphqlClient.query({
                query: gql`
                    query($username: String!) {
                        findUser(username: $username) {
                            id
                            username
                        }
                    }
                `,
                variables: {
                    username: username,
                }
            });
        } catch(e) {
            console.log(e)
            return {error:true, content:e}
        }

        console.log(response)

        if (response.data.findUser != null) {
            commit('setUserID', response.data.findUser.id)
            commit('setUserName', response.data.findUser.username)
            return {error:false, content:null}
        }
        else {
            return {error:true, content:'User does not exist. Please register.'}
        }

    },

    async logOut({commit}) {
        commit('setUserID', null)
        commit('setUserName', null)
    },

    async registerUser({commit}, [username, email]) {
        
        console.log(username, email);

        let response;

        try {
            response = await graphqlClient.mutate({
                mutation: gql`
                    mutation ($username: String!, $email: String!){
                        addUser(
                        username: $username,
                        email: $email){
                            user{
                                id
                                username
                                email
                                created
                                admin
                            }
                        }
                    },
                `,
                variables: {
                    username: username,
                    email: email,
                }
            });
        } catch(e) {
            return {error: true, content:'Account already exists. Please login.'}
        }

        commit('setUserID', response.data.addUser.user.id)
        commit('setUserName', response.data.addUser.user.username)
    },

    async fetchAllUsers({ commit }) {
        const response = await graphqlClient.query({
            query: gql`
                query {
                    allUsers{
                        edges{
                            node{
                                username
                                id
                                books{
                                    book{
                                        title
                                    }
                                    read
                                }
                            }
                        }
                    }
                }
            `,
        });

        commit('setAllUsers', response.data)
    },
};

const getters = {
    getUserID: (state) => state.userID,
    getUserName: (state) => state.userName,
    getAllUsers: (state) => state.allUsers,
};

const mutations = {
    setUserID: (state, ID) => { state.userID = ID; },
    setUserName: (state, Name) => { state.userName = Name; },
    setAllUsers: (state, users) => { state.allUsers = users; },
};

const state = {
    userID: null,
    userName: null,
    allUsers: null,

};

export default {
    state,
    getters,
    mutations,
    actions,
};