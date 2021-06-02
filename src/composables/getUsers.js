import gql from 'apollo-boost'

const getUsers = () => {
    const GET_USERS = gql`
        query getAllUsers {
            allUsers {
                username
                email 
                created 
                admin
            }
        }
    `;

    return { GET_USERS }
}