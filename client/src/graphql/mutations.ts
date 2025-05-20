import { gql } from '@apollo/client';

// Mutation to set availability for a specific date
export const SET_AVAILABILITY = gql`
  mutation SetAvailability($date: String!, $isAvailable: Boolean!) {
    setAvailability(date: $date, isAvailable: $isAvailable) {
      id
      date
      isAvailable
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`;

export const REQUEST_SHIFT = gql`
  mutation RequestShift($shiftId: String!) {
    requestShift(shiftId: $shiftId) {
      id
      status
      createdAt
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
    }
  }
`;