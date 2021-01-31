import mongoose, { Schema } from 'mongoose';

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    status: {
      type: String,
    },
    extFileId: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Material = mongoose.model('material', materialSchema);

export default Material;
