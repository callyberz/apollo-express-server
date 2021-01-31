// import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';

export default {
  Query: {
    students: async (parent, args, { models }) => {
      return await models.Student.find();
    },
    student: async (parent, { id }, { models }) => {
      return await models.Student.findById(id);
    },
  },

  Mutation: {
    createStudent: async (
      parent,
      {
        firstName,
        lastName,
        email,
        school,
        parentName,
        phoneNumber,
        parentEmail,
        parentPhoneNumber,
        parentRelationship,
      },
      { models, secret },
    ) => {
      const Student = await models.Student.create({
        firstName,
        lastName,
        email,
        school,
        parentName,
        phoneNumber,
        parentEmail,
        parentPhoneNumber,
        parentRelationship,
      });
      return Student._id;
    },

    // updateStudent: combineResolvers(
    //   // isAuthenticated,
    //   async (parent, { username }, { models, me }) => {
    //     return await models.Student.findByIdAndUpdate(
    //       me.id,
    //       { username },
    //       { new: true },
    //     );
    //   },
    // ),

    deleteStudent: combineResolvers(
      // isAdmin,
      async (parent, { id }, { models }) => {
        const Student = await models.Student.findById(id);

        if (Student) {
          await Student.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },
};
