import Hospital from "../models/Hospital.js";
import redis from 'redis';

const redisClient = redis.createClient();




const create_hospital = async (req, res) => {
    const newHospital = req.body;

    try {
        const hospital = new Hospital(newHospital);
        const savedHospital = await hospital.save();
        res.status(201).json(savedHospital);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const find_hospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();

        const formatedHospitals = hospitals.map((hospital) => {
            return {
                id: hospital._id,
                name: hospital.name,
                phoneNumber: hospital.phoneNumber,
                createdAt: hospital.createdAt,
                updatedAt: hospital.updatedAt,
                latitude: hospital.location.latitude,
                longitude: hospital.location.longitude
            }
        });

        res.json(formatedHospitals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const find_hospital_byName = async (req, res) => {
    const hospitalName = req.params.name;

    try {
        const hospital = await Hospital.findOne({ name: hospitalName });

        const formatedHospital = hospital = {
            id: this._id,
            name: this.name,
            phoneNumber: this.phoneNumber,
            latitude: this.location.latitude,
            longitude: this.location.longitude
        }

        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json(formatedHospital);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const update_hospital = async (req, res) => {
    const hospitalName = req.params.name;
    const newHospitalData = req.body;

    try {
        const updatedHospital = await Hospital.findOneAndUpdate(
            { name: hospitalName },
            newHospitalData,
            { new: true, runValidators: true }
        );
        if (!updatedHospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json(updatedHospital);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const delete_hospital = async (req, res) => {
    const hospitalName = req.params.name;

    try {
        const deletedHospital = await Hospital.findOneAndDelete({ name: hospitalName });
        if (!deletedHospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    create_hospital,
    find_hospitals,
    find_hospital_byName,
    update_hospital,
    delete_hospital
};