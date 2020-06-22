'use strict';

const
    express = require('express'),
    v1ApiController = require('./v1'),
    v2ApiController = require('./v2');

let router = express.Router();

//http://localhost:3000/api/v1/dogs
router.use('/v1', v1ApiController);
router.use('/v2', v2ApiController);

module.exports = router;
