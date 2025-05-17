import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum Role {
    NURSE
    ADMIN
  }

  enum ShiftStatus {
    PENDING
    CONFIRMED
    SWAPPED
    CANCELLED
  }

  enum RequestStatus {
    PENDING
    APPROVED
    REJECTED
  }

  enum SwapStatus {
    PENDING
    ACCEPTED
    DECLINED
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    createdAt: String!
    assignedShifts: [Shift!]!
    shiftRequests: [ShiftRequest!]!
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  input ShiftInput {
    title: String!
    description: String
    start: String!
    end: String!
    status: ShiftStatus
    assignedToId: String
  }

  input ShiftRequestInput {
    shiftId: ID!
  }

  input ShiftSwapInput {
    fromShiftId: ID!
    toShiftId: ID!
  }

  type Shift {
    id: ID!
    title: String!
    description: String
    start: String!
    end: String!
    status: ShiftStatus!
    createdBy: User!
    assignedTo: User
    createdAt: String!
    updatedAt: String!
  }

  type ShiftRequest {
    id: ID!
    shift: Shift!
    requester: User!
    status: RequestStatus!
    createdAt: String!
  }

  type ShiftSwap {
    id: ID!
    fromShift: Shift!
    toShift: Shift!
    proposer: User!
    status: SwapStatus!
    createdAt: String!
  }

  type Availability {
    id: ID!
    user: User!
    userId: String!
    date: String!
    isAvailable: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    me: User
    shifts: [Shift!]!
    myShiftRequests: [ShiftRequest!]!
    myShiftSwaps: [ShiftSwap!]!
    getAvailability(userId: String!, month: String!): [Availability!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, role: Role): AuthPayload
    login(email: String!, password: String!): AuthPayload
    refreshToken(token: String!): AuthPayload

    createShift(input: ShiftInput!): Shift!
    updateShift(id: ID!, input: ShiftInput!): Shift!
    deleteShift(id: ID!): Shift!
    requestShift(input: ShiftRequestInput!): ShiftRequest!
    proposeShiftSwap(input: ShiftSwapInput!): ShiftSwap!
    updateShiftRequestStatus(id: ID!, status: RequestStatus!): ShiftRequest!
    updateShiftSwapStatus(id: ID!, status: SwapStatus!): ShiftSwap!
    setAvailability(date: String!, isAvailable: Boolean!): Availability!
  }
`;
