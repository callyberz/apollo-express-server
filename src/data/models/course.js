import mongoose, { Schema } from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    teachers: {
      // type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

courseSchema.methods.toJSON = function () {
  const course = this;
  const courseObject = course.toObject();

  delete courseObject.managerId.password;
  delete courseObject.managerId.avatar;

  return userObject;
};

const Course = mongoose.model('Course', courseSchema);

export default Course;
