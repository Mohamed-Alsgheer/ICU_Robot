import mongoose from "mongoose";

const ICUSchema = new mongoose.Schema({
    hospitalID: { type: String, required: true },
    specialization: { type: String, required: true },
    availability: { type: Boolean, required: true },
});

const ICU = mongoose.model('ICU', ICUSchema);

export default ICU;