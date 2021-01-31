import mongoose, { Schema } from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: { type: Schema.Types.ObjectId, ref: 'course' },
    },
    teachers: {
      type: [String],
      required: true,
    },
    students: {
      type: [Schema.Types.ObjectId],
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    records: {
      type: [{ type: Schema.Types.ObjectId, ref: 'record' }],
    },
  },
  { timestamps: true },
);

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
