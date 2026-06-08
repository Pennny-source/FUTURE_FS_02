const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    company: {
      type: String,
      default: ''
    },

    industry: {
      type: String,
      default: ''
    },

    source: {
      type: String,
      enum: [
        'Facebook',
        'Instagram',
        'Google',
        'LinkedIn',
        'Website',
        'Referral',
        'Other'
      ],
      default: 'Website'
    },

    budget: {
      type: String,
      default: ''
    },

    dealValue: {
      type: Number,
      default: 0
    },

    leadScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },

    message: {
      type: String,
      default: ''
    },

    status: {
      type: String,
      enum: [
        'New',
        'Attempting Contact',
        'Contacted',
        'Qualified',
        'Proposal Sent',
        'Negotiation',
        'Won',
        'Lost'
      ],
      default: 'New'
    },

    agent: {
      type: String,
      default: ''
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Lead', leadSchema);