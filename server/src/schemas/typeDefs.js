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

`;
