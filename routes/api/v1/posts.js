const express = require('express');

const router = express.Router();


//post api controller
const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);

module.exports = router;