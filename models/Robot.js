import mongoose from 'mongoose';
import Location from './Location.js';

const robotSchema = new mongoose.Schema({
    patientEmail: { type: String, required: true },
    medicalReport: { type: String, required: true },
    familyEmails: [{ type: String, required: true }],
    location: { type: Location.schema, required: true },
});

const Robot = mongoose.model('Robot', robotSchema);

export default Robot;