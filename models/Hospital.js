import mongoose from 'mongoose';
import Location from './Location.js';
import ICU from './ICU.js';


const hospitalSchema = new mongoose.Schema({
    adminID: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: Location.schema, required: true },
    ICUs: [{ type: ICU.schema }]
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;