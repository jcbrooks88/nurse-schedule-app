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

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    me {
      name
      role
      assignedShifts {
        id
        title
        start
        end
        status
      }
      shiftRequests {
        id
        status
        shift {
          title
          start
          end
        }
      }
    }
  }
`;
