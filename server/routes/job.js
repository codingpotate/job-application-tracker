const express = require('express');
const Job = require('../models/Job');
const protect = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/', protect, async(req, res)=> {
    const jobs = await Job.find({user: req.user});
    res.json(jobs);
});

router.post('/', protect, async(req, res) => {
    const {company, jobTitle, dateApplied, status} = req.body;
    const job = new Job({
        user: req.user,
        company,
        jobTitle,
        dateApplied,
        status
    });
    await job.save();
    res.status(201).json(job);
});

router.put('/:id', protect, async(req, res) => {
    const job = await Job.findOne({_id: req.params.id, user: req.user});
    if (!job) return res.status(404).json({error: 'Job not found'});

    const {company, jobTitle, dateApplied, status} = req.body;
    job.company = company || job.company;
    job.jobTitle = jobTitle || job.jobTitle
    job.dateApplied = dateApplied || job.dateApplied
    job.status = status || job.status;

    await job.save();
    res.json(job)
});

router.delete('/:id', protect, async(req, res) => {
    const job = await Job.findOneAndDelete({_id: req.params.id, user: req.user });
    if (!job) return res.status(404).json({error: 'Job not found'});

    res.json({message: 'Job deleted'});
});

module.exports = router;


