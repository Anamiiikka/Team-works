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
  // NEW FIELD FOR PORTAL LISTING
  isListedOnPortal: {
    type: Boolean,
    default: true,
    index: true // Add index for better query performance
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
JobSchema.index({ isActive: 1, isListedOnPortal: 1 }); // Compound index for filtering
JobSchema.index({ department: 1 }); // Index for department filtering
JobSchema.index({ postedDate: -1 }); // Index for sorting by date

// Pre-save hook for validation and logging
JobSchema.pre('save', function(next) {
  if (!this.jobId || !this.jobId.trim()) {
    return next(new Error('Job ID is required and cannot be empty'));
  }
  this.updatedAt = Date.now();
  console.log('Saving job with jobId:', this.jobId, 'Portal Listed:', this.isListedOnPortal);
  next();
});

// Virtual field to check if job is publicly visible
JobSchema.virtual('isPubliclyVisible').get(function() {
  return this.isActive && this.isListedOnPortal;
});

// Static method to get portal-listed jobs
JobSchema.statics.getPortalJobs = function(filters = {}) {
  return this.find({
    isActive: true,
    isListedOnPortal: true,
    ...filters
  }).sort({ postedDate: -1 });
};

// Static method to toggle portal listing for all jobs
JobSchema.statics.togglePortalListing = function(shouldList = true) {
  return this.updateMany(
    {},
    { 
      $set: { 
        isListedOnPortal: shouldList,
        updatedAt: new Date()
      }
    }
  );
};

const Job = mongoose.model('Job', JobSchema);

export default Job;
