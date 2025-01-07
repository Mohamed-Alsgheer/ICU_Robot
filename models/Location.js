import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    longitude: Number,
    latitude: Number,
});

const Location = mongoose.model('Location', locationSchema);

export default Location;