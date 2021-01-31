import mongoose from 'mongoose';

import User from './user';
import Course from './course';
import Lesson from './lesson';
import Record from './record';
import Student from './student';
import Material from './material';

import config from '../../config';

const connectDb = () => {
  if (config.testdatabaseUrl) {
    return mongoose.connect(config.testdatabaseUrl, {
      useNewUrlParser: true,
    });
  }
  console.log(config.databaseUrl);

  if (config.databaseUrl) {
    // delete every models for HMR in avoiod of OverwriteModelError
    // *** ONLY for development mode ***
    Object.keys(mongoose.connection.models).forEach((key) => {
      delete mongoose.connection.models[key];
    });

    return mongoose.connect(config.databaseUrl, {
      useNewUrlParser: true,
    });
  }
};

const models = { User, Lesson, Course, Record, Student, Material };

export { connectDb };

export default models;
