const express = require('express');
const router = express.Router();
const { googleLogin, defaultLogin, getServers } = require('../controllers/authController');

router.post('/google', googleLogin);
router.post('/login', defaultLogin);
router.get('/servers', getServers);
router.get('/health', (req, res) => res.json({ status: "Auth API is running!" }));

module.exports = router;
