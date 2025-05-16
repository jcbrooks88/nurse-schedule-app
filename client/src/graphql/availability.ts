import { gql } from '@apollo/client';

export const GET_AVAILABILITY = gql`
  query GetAvailability($userId: String!, $month: String!) {
    getAvailability(userId: $userId, month: $month) {
      id
      date
      isAvailable
    }
  }
`;

export const SET_AVAILABILITY = gql`
  mutation SetAvailability($date: String!, $isAvailable: Boolean!) {
    setAvailability(date: $date, isAvailable: $isAvailable) {
      id
      date
      isAvailable
    }
  }
`;
