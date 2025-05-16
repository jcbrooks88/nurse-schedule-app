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


