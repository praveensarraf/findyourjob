import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['jobSeeker', 'recruiter'],
    required: true
  },

  profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resume:  { type: String }, // URL to resume file
    resumeOriginalName: { type: String },
    Company: { type: mongoose.Schema.Types.ObjectId,  ref: 'Company' },
    profilePhoto: {
      type: String,
      default: ""
    }
  },
  bookmarkedJobs: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job' 
  }]
}, {timestamps: true});

// User Model
export const User = mongoose.model('User', userSchema);