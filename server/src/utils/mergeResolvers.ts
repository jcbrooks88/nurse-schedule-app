import { authResolver } from '../resolvers/authResolver';
import { availabilityResolver } from '../resolvers/availResolver';
import { shiftResolver } from '../resolvers/shiftResolver';
import { shiftRequestSwapResolver } from '../resolvers/swapResolver';
import adminResolvers from '../resolvers/adminResolvers';

export const resolvers = {
  Query: {
    ...authResolver.Query,
    ...availabilityResolver.Query,
    ...shiftResolver.Query,
    ...shiftRequestSwapResolver.Query,
    ...adminResolvers.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...availabilityResolver.Mutation,
    ...shiftResolver.Mutation,
    ...shiftRequestSwapResolver.Mutation,
    ...adminResolvers.Mutation,
  },
};
