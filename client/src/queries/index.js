const { gql } = require('apollo-boost');

export const GET_USER = gql`
    query getUser($username: String!) {
        getUser(username: $username) {
            username
            password
            createdAt
        }
    }
`;

export const SINGIN_USER = gql`
    mutation($username: String! $password:String!) {
 signIn(data:{username:$username,password:$password}){token}
}
`;

export const CREATE_USER = gql`
    mutation($username: String! $password:String!) {
  createUser(data: { username: $username, password: $password }) {
    token
  }
}
`;

export const GET_ACTIVE_USER = gql`
    query{
        activeUser{username}
    }
`;

export const GET_VEHICLES = gql`
query($bike_id: String) {
  vehicle(id:$bike_id) {
    bike_id
    lat
    lon
    is_reserved
    is_disabled
    vehicle_type
    vehicle_type
    android
    ios
  }
}
`;