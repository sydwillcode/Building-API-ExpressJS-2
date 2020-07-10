const express = require('express'); 
//Create main router for all routes in routes folder
const router = express.Router();
//Bring in routes from chirps.js
const chirpsRouter = require('./chirps');

//Defining path for chirps.js router using main router
router.use('/chirps', chirpsRouter)

//Export main router
module.exports = router;