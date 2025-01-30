const express = require('express');
const {  profiledataget, upadateuserdata, deleteusersadteil } = require('../controllers/profiledatacontrollers');
const router = express.Router();

router.get('/userdata',profiledataget);
router.put('/updatedata',upadateuserdata )
router.delete('/deleteusers',deleteusersadteil )

module.exports = router;
