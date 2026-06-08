const Lead = require('../models/Lead');

exports.getLeads = async (req, res) => {
  const leads = await Lead.find({}).populate('assignedTo', 'name email');
  res.json(leads);
};

exports.getLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  res.json(lead);
};

exports.createLead = async (req, res) => {
  const lead = await Lead.create(req.body);
  res.status(201).json(lead);
};

exports.updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(lead);
};

exports.deleteLead = async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: 'Lead removed' });
};