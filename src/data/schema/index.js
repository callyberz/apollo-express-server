import { gql } from 'apollo-server-express';

import userSchema from './user';
import studentSchema from './student';
import courseSchema from './course';

const typeDefs = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  ${userSchema}

  ${studentSchema}

  ${courseSchema}
`;

const schema = {
  typeDefs,
};

export default schema;
