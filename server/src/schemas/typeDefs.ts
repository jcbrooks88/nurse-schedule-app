import gql from 'graphql-tag'

export const typeDefs = gql`
  """Defines user roles in the system."""
  enum Role {
    NURSE
    ADMIN
  }

  """Represents the status of a shift."""
  enum ShiftStatus {
    PENDING
    APPROVED
    CONFIRMED
    SWAPPED
    CANCELLED
    OPEN
  }

  """Represents the approval status of a shift request."""
  enum RequestStatus {
    PENDING
    APPROVED
    CONFIRMED
    REJECTED
    CANCELLED
  }

  """Status of a proposed shift swap."""
  enum SwapStatus {
    PENDING
    ACCEPTED
    DECLINED
    CONFIRMED
    SWAPPED
  }

  """A registered user of the scheduling system."""
  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    createdAt: String!
    assignedShifts: [Shift!]
    shiftRequests: [ShiftRequest!]
  }

  """The payload returned after authentication."""
  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  """Input data for creating or updating a shift."""
  input ShiftInput {
    title: String!
    description: String
    start: String!
    end: String!
    status: ShiftStatus
    assignedToId: String
  }

  """Input for requesting a shift."""
  input ShiftRequestInput {
    shiftId: ID!
  }

  """Input for proposing a shift swap."""
  input ShiftSwapInput {
    fromShiftId: ID!
    toShiftId: ID!
  }

  """A work shift created by an admin and optionally assigned to a nurse."""
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

  """A request from a user to take an available shift."""
  type ShiftRequest {
    id: ID!
    shift: Shift!
    requester: User!
    status: RequestStatus!
    createdAt: String!
  }

  """A proposed swap between two shifts."""
  type ShiftSwap {
    id: ID!
    fromShift: Shift!
    toShift: Shift!
    proposer: User!
    status: SwapStatus!
    createdAt: String!
  }

  """Indicates a user's availability on a specific date."""
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
    """Returns the currently authenticated user."""
    me: User

    """Returns all shifts in the system."""
    shifts: [Shift!]!

    """Returns the current user's shift requests."""
    myShiftRequests: [ShiftRequest!]!

    """Returns the current user's shift swaps."""
    myShiftSwaps: [ShiftSwap!]!

    """Returns a user's availability for a given month."""
    getAvailability(userId: String!, month: String!): [Availability!]!

    getPendingRequests: [ShiftRequest]
  }

  type Mutation {
    """Registers a new user and returns auth tokens."""
    addUser(name: String!, email: String!, password: String!): AuthPayload!

    """Logs in an existing user and returns auth tokens."""
    login(email: String!, password: String!): AuthPayload

    """Refreshes the access token using a refresh token."""
    refreshToken(token: String!): AuthPayload

    """Creates a new shift."""
    createShift(input: ShiftInput!): Shift!

    """Updates an existing shift."""
    updateShift(id: ID!, input: ShiftInput!): Shift!

    """Deletes a shift."""
    deleteShift(id: ID!): Shift!

    """Requests to be assigned to a shift."""
    requestShift(input: ShiftRequestInput!): ShiftRequest!

    """Proposes a shift swap between two shifts."""
    proposeShiftSwap(input: ShiftSwapInput!): ShiftSwap!

    """Updates the status of a shift request (e.g., approve, reject, cancel)."""
    updateShiftRequestStatus(id: ID!, status: RequestStatus!): ShiftRequest!

    """Updates the status of a shift swap (e.g., accept or decline)."""
    updateShiftSwapStatus(id: ID!, status: SwapStatus!): ShiftSwap!

    """Sets or updates a user's availability for a specific date."""
    setAvailability(date: String!, isAvailable: Boolean!): Availability!

    """Cancels a pending shift request."""
    cancelShiftRequest(id: ID!): ShiftRequest!

    approveShiftRequest(requestId: ID!): ShiftRequest!
    
    rejectShiftRequest(requestId: ID!): Boolean!
  }
`;
