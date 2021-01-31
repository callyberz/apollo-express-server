import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    courses: [Course!]
    course(id: ID!): Course
  }

  type Course {
    name: String!
    grade: String!
    type: String!
    teachers: [String]!
    location: String
  }

  extend type Mutation {
    createCourse(
      name: String!
      grade: String!
      type: String!
      teachers: [String]!
      location: String
    ): ID!

    updateCourse(id: ID!): Course!
    deleteCourse(id: ID!): Boolean!
  }
`;
