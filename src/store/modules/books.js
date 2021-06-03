import graphqlClient from '../../utils/graphql'
import { gql } from 'graphql-tag'

const actions = {

    async fetchUserAllBooks({rootState}) {

        let response;

        try {
            response = await graphqlClient.query({
                query: gql`
                    query($id: ID!) {
                        user(id: $id) {
                            id
                            books{
                                read
                                book{
                                    title
                                    authors {
                                        name
                                    }
                                    category
                                    description
                                    rating
                                }
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
            return {error:true, content:'Books could not be fetched. Please try again later.'}
        } 

        return {error:false, content:response.data.user.books}
        
    },

    async fetchUserAllAuthors({rootState}) {

        let response;

        try {
            response = await graphqlClient.query({
                query: gql`
                    query($id: ID!) {
                        user(id: $id) {
                            id
                            books{
                                book{
                                    authors {
                                        name
                                    }
                                }
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
            return {error:true, content:e}
        } 
        
        var returnValue = response.data.user.books.map(function(bo) {
            var authors = [];
            bo.book.authors.forEach(author => {
                authors.push(author.name);
            });
            return authors
        }).flat()
        
        return {error:false, content:returnValue}
        
    },


    async addBookToUser({rootState, dispatch}, book) {
        
        console.log(book);

        let response;

        try {
            response = await graphqlClient.mutate({
                mutation: gql`
                    mutation (
                    $title: String!, 
                    $owners: String!, 
                    $authors: String!, 
                    $description: String, 
                    $category: String, 
                    $rating: Int,
                    ){
                        addBook(
                        title: $title,
                        owners: $owners,
                        authors: $authors,
                        description: $description,
                        category: $category,
                        rating: $rating){
                            book{
                                title
                            }
                        }
                    },
                `,
                variables: {
                    owners: rootState.user.userName,
                    title: book.title,
                    authors: book.authors[0],
                    description: book.description,
                    category: book.category,
                    rating: book.rating,
                }
            });
        } catch(e) {
            return {error: true, content:'Book could not be added. Please try again.'}
        }
        console.log(response);

        let responseRead;

        const read = book.read ? 1 : 0

        if (read > 0) {
            responseRead = await dispatch('updateBookRead', [read, book.title])
            if (responseRead.error) {
                return {error:true, content:responseRead.content}
            }
        }

        return {error:false, content: null}
    },

    async updateBookRead({rootState}, [read, book]) {
        
        console.log(read, book);

        let response;

        try {
            response = await graphqlClient.mutate({
                mutation: gql`
                    mutation (
                    $book: String!, 
                    $user: String!, 
                    $read: Int!, 
                    ){
                        updateUserBook(
                        book: $book,
                        user: $user,
                        read: $read){
                            book{
                                title
                            }
                        }
                    },
                `,
                variables: {
                    user: rootState.user.userName,
                    book: book,
                    read: read,
                }
            });
        } catch(e) {
            return {error: true, content:'Could not update amount of times book is read.'}
        }
        console.log(response);

        return {error:false, content: response}
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