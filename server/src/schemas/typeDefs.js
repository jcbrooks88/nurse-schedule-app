import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum Role {
    NURSE
    ADMIN
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!, role: Role): AuthPayload
    login(email: String!, password: String!): AuthPayload
    refreshToken(token: String!): AuthPayload
  }
    enum ShiftStatus {
  PENDING
  CONFIRMED
  SWAPPED
  CANCELLED
}

input ShiftInput {
  title: String!
  description: String
  start: String!
  end: String!
  status: ShiftStatus
  assignedToId: String
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

extend type Query {
  shifts: [Shift!]!
}

extend type Mutation {
  createShift(input: ShiftInput!): Shift!
  updateShift(id: ID!, input: ShiftInput!): Shift!
  deleteShift(id: ID!): Shift!
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

input ShiftRequestInput {
  shiftId: ID!
}

input ShiftSwapInput {
  fromShiftId: ID!
  toShiftId: ID!
}

extend type Query {
  myShiftRequests: [ShiftRequest!]!
  myShiftSwaps: [ShiftSwap!]!
}

extend type Mutation {
  requestShift(input: ShiftRequestInput!): ShiftRequest!
  proposeShiftSwap(input: ShiftSwapInput!): ShiftSwap!
  updateShiftRequestStatus(id: ID!, status: RequestStatus!): ShiftRequest!
  updateShiftSwapStatus(id: ID!, status: SwapStatus!): ShiftSwap!
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

extend type Query {
  getAvailability(userId: String!, month: String!): [Availability!]!
}

extend type Mutation {
  setAvailability(date: String!, isAvailable: Boolean!): Availability!
}


`;
