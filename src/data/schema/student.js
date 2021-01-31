import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    students: [Student!]
    student(id: ID!): Student
  }

  type Student {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String
    school: String
    parentName: String!
    phoneNumber: String!
    parentEmail: String!
    parentPhoneNumber: String!
    parentRelationship: String!
    remark: String
  }

  extend type Mutation {
    createStudent(
      firstName: String!
      lastName: String!
      email: String
      school: String
      parentName: String!
      phoneNumber: String!
      parentEmail: String!
      parentPhoneNumber: String!
      parentRelationship: String!
    ): ID!

    updateStudent(id: ID!): Student!
    deleteStudent(id: ID!): Boolean!
  }
`;
