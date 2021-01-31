// import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { get } from 'mongoose';

export default {
  Query: {
    courses: async (parent, args, { models }) => {
      return await models.Course.find();
    },
    course: async (parent, { id }, { models }) => {
      return await models.Course.findById(id);
    },
  },

  Mutation: {
    createCourse: async (
      parent,
      { name, grade, type, teachers, location },
      { models, secret },
    ) => {
      const Course = await models.Course.create({
        name,
        grade,
        type,
        teachers,
        location,
      });
      return Course._id;
    },

    updateCourse: combineResolvers(
      // isAuthenticated,
      async (parent, { courseId, username }, { models, me }) => {
        return await models.Course.findByIdAndUpdate(
          courseId,
          { location },
          { new: true },
        );
      },
    ),

    deleteCourse: combineResolvers(
      // isAdmin,
      async (parent, { id }, { models }) => {
        const Course = await models.Course.findById(id);

        if (Course) {
          await Course.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },
};
