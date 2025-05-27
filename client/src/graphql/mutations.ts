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
      accessToken
      refreshToken
      user {
        id
        name
        email
        role
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        email
        role
        name
      }
    }
  }
`;

export const REQUEST_SHIFT = gql`
  mutation RequestShift($shiftId: ID!) {
    requestShift(input: { shiftId: $shiftId }) {
      id
      status
      shift {
        id
        title
        start
        end
      }
    }
  }
`;

export const DROP_SHIFT = gql`
  mutation DropShift($shiftId: ID!) {
    updateShiftRequestStatus(id: $shiftId, status: CANCELLED) {
      id
      status
      shift {
        id
        title
        start
        end
      }
    }
  }
`;

export const JOIN_WAITLIST = gql`
  mutation JoinWaitlist($shiftId: ID!) {
    requestShift(input: { shiftId: $shiftId }) {
      id
      status
      shift {
        id
        title
        start
        end
      }
    }
  }
`;

export const CANCEL_SHIFT_REQUEST = gql`
  mutation CancelShiftRequest($requestId: ID!) {
    cancelShiftRequest(id: $requestId) {
      id
      status
    }
  }
`;
