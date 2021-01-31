import mongoose, { Schema } from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: String,
    school: String,
    phoneNumber: String,
    parentName: {
      type: String,
      required: true,
    },
    parentEmail: {
      type: String,
      required: false,
    },
    parentPhoneNumber: {
      type: String,
      required: true,
    },
    parentRelationship: {
      type: String,
      required: true,
      enum: [
        'FATHER',
        'MOTHER',
        'GRANDFATHER',
        'GRANDMOTHER',
        'AUNT',
        'UNCLE',
        'MAID',
        'DRIVER',
        'OTHER',
      ],
    },
    remark: String,
  },
  { timestamps: true },
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
