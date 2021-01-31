import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) => {
  console.log('......');
  console.log(me);
  me ? skip : new ForbiddenError('Not authenticated as user.');
};

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) => {
    console.log(role);
    if (role === 'ADMIN') {
      skip;
    } else {
      new ForbiddenError('Not authorized as admin.');
    }
  },
);

export const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findById(id);

  if (message.userId != me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
