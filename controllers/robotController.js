// controllers/RobotController.js
import Robot from '../models/Robot.js';

// Create a new Robot
const create_robot = async (req, res) => {
    const { patientEmail, medicalReport, familyEmails, location } = req.body;

    try {
        const newRobot = new Robot({ patientEmail, medicalReport, familyEmails, location });
        const savedRobot = await newRobot.save();
        res.status(201).json(savedRobot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all robots
const find_robots = async (req, res) => {
    try {
        const robots = await Robot.find();
        res.json(robots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a robot by ID
const find_robot_byID = async (req, res) => {
    const robotId = req.params.id;

    try {
        const robot = await Robot.findById(robotId);
        if (!robot) {
            return res.status(404).json({ message: 'Robot not found' });
        }
        res.json(robot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a robot's details
const update_robot = async (req, res) => {
    const robotID = req.params.id;
    const newRobotData = req.body;

    try {
        const updatedRobot = await Robot.findByIdAndUpdate(robotID,
            newRobotData, {
            new: true,
            runValidators: true,
        });
        if (!updatedRobot) {
            return res.status(404).json({ message: 'Robot not found' });
        }
        res.json(updatedRobot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a robot by ID
const delete_robot = async (req, res) => {
    const robotID = req.params.id;

    try {
        const deletedRobot = await Robot.findByIdAndDelete(robotID);
        if (!deletedRobot) {
            return res.status(404).json({ message: 'Robot not found' });
        }
        res.json({ message: 'Robot deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    create_robot,
    find_robots,
    find_robot_byID,
    update_robot,
    delete_robot,
};
