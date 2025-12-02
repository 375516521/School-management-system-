const Complain = require('../models/complainSchema.js');

const complainCreate = async (req, res) => {
    try {
        const payload = req.body;
        if (!payload || Object.keys(payload).length === 0) {
            return res.status(400).json({ error: 'Request body is required' });
        }

        const complain = new Complain(payload);
        const result = await complain.save();
        return res.status(201).json(result);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message, details: err.errors });
        }
        console.error('complainCreate error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const complainList = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'School id is required' });
        }

        const complains = await Complain.find({ school: id })
            .populate('user', 'name')
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        if (!complains || complains.length === 0) {
            return res.status(404).json({ message: 'No complaints found' });
        }

        return res.status(200).json(complains);
    } catch (err) {
        console.error('complainList error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { complainCreate, complainList };
