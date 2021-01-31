import mongoose, { Schema } from 'mongoose';

const recordSchema = new mongoose.Schema(
  {
    lessonId: {
      type: { type: Schema.Types.ObjectId, ref: 'lesson' },
    },
    studentId: {
      type: { type: Schema.Types.ObjectId, ref: 'student' },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    material: {
      type: [{ type: Schema.Types.ObjectId, ref: 'material' }],
      default: [],
    },
    performance: {
      type: [
        {
          criteria: String,
          isfulfill: Boolean,
        },
      ],
      required: false,
      default: [],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isReadBy: {
      type: String,
    },
  },
  { timestamps: true },
);

const Record = mongoose.model('Record', recordSchema);

export default Record;
