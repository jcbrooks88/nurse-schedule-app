import { mergeResolvers } from '@graphql-tools/merge';
import { authResolver } from '../resolvers/authResolver.ts';
import { shiftResolver } from '../resolvers/shiftResolver.ts';
import { shiftRequestSwapResolver } from '../resolvers/swapResolver.ts';
import { availabilityResolvers } from '../resolvers/availResolver.ts';

export const resolvers = mergeResolvers([
  authResolver,
  shiftResolver,
  shiftRequestSwapResolver,
  availabilityResolvers,
]);
