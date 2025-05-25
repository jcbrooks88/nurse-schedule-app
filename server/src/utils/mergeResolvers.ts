import { mergeResolvers } from '@graphql-tools/merge';
import { authResolver } from '../resolvers/authResolver';
import { shiftResolver } from '../resolvers/shiftResolver';
import { shiftRequestSwapResolver } from '../resolvers/swapResolver';
import { availabilityResolvers } from '../resolvers/availResolver';

export const resolvers = mergeResolvers([
  authResolver,
  shiftResolver,
  shiftRequestSwapResolver,
  availabilityResolvers,
]);
