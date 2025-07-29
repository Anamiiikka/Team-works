// app/models/Upload.js
import mongoose from 'mongoose';

if (mongoose.models.Upload) {
    delete mongoose.models.Upload;
}

const uploadSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    visibilityLevel: { 
        type: String, 
        required: true, 
        enum: ['SuperAdmin', 'Admin', 'Employee', 'Public'],
        default: 'Employee'
    },
    uploadedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    uploadedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
});

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;
