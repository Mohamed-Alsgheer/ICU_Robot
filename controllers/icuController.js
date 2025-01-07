import ICU from "../models/ICU.js";

const create_icu = async (req, res) => {
    const newIcu = req.body;

    try {
        const icu = new ICU(newIcu);
        const savedICU = await icu.save();
        res.status(201).json(savedICU);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const find_icus = async (req, res) => {
    try {
        const icus = await ICU.find();
        res.json(icus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const find_icu_byHospitalID = async (req, res) => {
    const hospitalID = req.params.hospitalID;

    try {
        const icus = await ICU.find({ hospitalID: hospitalID });
        res.json(icus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const update_icu = async (req, res) => {
    const icuID = req.params.id;
    const newIcuData = req.body;
    try {
        const updatedICU = await ICU.findByIdAndUpdate(icuID,
            newIcuData, {
            new: true,
            runValidators: true,
        });
        if (!updatedICU) {
            return res.status(404).json({ message: 'ICU not found' });
        }
        res.json(updatedICU);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const delete_icu = async (req, res) => {
    const icuID = req.params.id;

    try {
        const deletedICU = await ICU.findByIdAndDelete(icuID);
        if (!deletedICU) {
            return res.status(404).json({ message: 'ICU not found' });
        }
        res.json({ message: 'ICU deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export default {
    create_icu,
    find_icus,
    find_icu_byHospitalID,
    update_icu,
    delete_icu
};