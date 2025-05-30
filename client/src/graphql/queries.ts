import { gql } from '@apollo/client';

export const GET_SHIFTS = gql`
  query GetShifts {
    shifts {
      id
      title
      start
      end
      createdBy {
        role
        name
      }
      assignedTo { id }
      status
    }
  }
`;

export const GET_SHIFT_REQUESTS = gql`
  query GetShiftRequests {
    myShiftRequests {
      id
      status
      shift {
        id
        title
        start
        end
        status
      }
    }
  }
`;

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
      id
      name
      email
      role
      createdAt
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
        createdAt
        shift {
          id
          title
          start
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      name
      email
      role
      createdAt
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
        createdAt
        shift {
          id
          title
          start
        }
      }
    }
  }
`;

export const GET_PENDING_REQUESTS = gql`
  query GetPendingRequests {
    getPendingRequests {
      id
      status
      requester {
        name
        email
      }
      shift {
        title
        start
        end
      }
    }
  }
`;