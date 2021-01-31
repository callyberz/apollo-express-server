// import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';

export default {
  Query: {
    lessons: async (parent, args, { models }) => {
      return await models.Lesson.find();
    },
    lesson: async (parent, { id }, { models }) => {
      return await models.Lesson.findById(id);
    },
  },

  Mutation: {
    createlesson: async (
      parent,
      { course, teachers, students, startDate, endDate, location },
      { models, secret },
    ) => {
      const lesson = await models.lesson.create({
        course,
        teachers,
        students,
        startDate,
        endDate,
        location,
      });
      return lesson._id;
    },

    updateLesson: combineResolvers(
      // isAuthenticated,
      async (parent, { courseId, username }, { models, me }) => {
        return await models.Lesson.findByIdAndUpdate(
          courseId,
          { location },
          { new: true },
        );
      },
    ),

    deleteLesson: combineResolvers(
      // isAdmin,
      async (parent, { id }, { models }) => {
        const Lesson = await models.Lesson.findById(id);

        if (Lesson) {
          await Lesson.remove();
          return true;
        } else {
          return false;
        }
      },
    ),
  },
};
