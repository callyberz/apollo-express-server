import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import studentResolvers from './student';
import courseResolvers from './course';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  studentResolvers,
  courseResolvers
];
