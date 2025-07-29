import mongoose from 'mongoose';

// Clear any cached Job model to prevent schema conflicts
if (mongoose.models.Job) {
  delete mongoose.models.Job;
}

const JobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: [true, 'Job ID is required'],
    unique: true,
    trim: true,
    maxlength: [20, 'Job ID cannot exceed 20 characters']
  },
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Job title cannot exceed 100 characters']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    maxlength: [50, 'Department cannot exceed 50 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Job type is required'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time'
  },
  experience: {
    type: String,
    required: [true, 'Experience requirement is required'],
    trim: true,
    maxlength: [50, 'Experience cannot exceed 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  requirements: [{
    type: String,
    required: true,
    maxlength: [500, 'Each requirement cannot exceed 500 characters']
  }],
  responsibilities: [{
    type: String,
    required: true,
    maxlength: [500, 'Each responsibility cannot exceed 500 characters']
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for better performance and ensure unique constraint
JobSchema.index({ jobId: 1 }, { unique: true });

// Pre-save hook for validation and logging
JobSchema.pre('save', function(next) {
  if (!this.jobId || !this.jobId.trim()) {
    return next(new Error('Job ID is required and cannot be empty'));
  }
  this.updatedAt = Date.now();
  console.log('Saving job with jobId:', this.jobId);
  next();
});

const Job = mongoose.model('Job', JobSchema);

export default Job;