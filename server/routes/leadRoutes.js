const express = require('express');
const { getLeads, getLead, createLead, updateLead, deleteLead } = require('../controllers/leadController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(auth, getLeads).post(auth, createLead);
router.route('/:id').get(auth, getLead).put(auth, updateLead).delete(auth, deleteLead);

module.exports = router;