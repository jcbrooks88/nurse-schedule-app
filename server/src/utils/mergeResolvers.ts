import { authResolver } from '../resolvers/authResolver';
import { availabilityResolver } from '../resolvers/availResolver';
import { shiftResolver } from '../resolvers/shiftResolver';
import { shiftRequestSwapResolver } from '../resolvers/swapResolver';

export const resolvers = {
  Query: {
    ...authResolver.Query,
    ...availabilityResolver.Query,
    ...shiftResolver.Query,
    ...shiftRequestSwapResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...availabilityResolver.Mutation,
    ...shiftResolver.Mutation,
    ...shiftRequestSwapResolver.Mutation,
  },
};
