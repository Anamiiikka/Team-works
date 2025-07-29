// app/models/Applicant.js
import mongoose from 'mongoose';

// This pattern prevents "OverwriteModelError" in Next.js dev environment
if (mongoose.models.Applicant) {
    delete mongoose.models.Applicant;
}

const applicantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    experience: { type: Number, required: true },
    resumeUrl: { type: String, required: true },
    jobId: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }, // For soft deletion
});

const Applicant = mongoose.model('Applicant', applicantSchema);

export default Applicant;
