const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
  dateApplied: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);
