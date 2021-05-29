const express = require('express');
const router = express.Router();

const s3Controller = require('../controllers/s3Controller')

router.get('/list', s3Controller.getS3Files)
router.get('/download', s3Controller.downloadS3File)

module.exports = router;