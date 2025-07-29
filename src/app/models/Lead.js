// app/models/Lead.js
import mongoose from 'mongoose';

if (mongoose.models.Lead) {
    delete mongoose.models.Lead;
}

const leadSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true, required: true, lowercase: true },
    industry: { type: String, trim: true, required: true },
    message: { type: String, required: true },
    requestFrom: { type: String, required: true },
    submittedAt: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: true },
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
