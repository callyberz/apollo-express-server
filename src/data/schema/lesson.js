import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    lessons: [Lesson!]
    lesson(id: ID!): Lesson
  }

  type Lesson {
    course: Course
    teachers: [String!]
    students: [Student]
    startDate: Date
    endDate: Date
    location: String!
  }

  extend type Mutation {
    createLesson(
      course: Course
      teachers: [String!]
      students: [Student]
      startDate: Date
      endDate: Date
      location: String!
    ): ID!

    updateLesson(id: ID!): Lesson!
    deleteLesson(id: ID!): Boolean!
  }
`;
