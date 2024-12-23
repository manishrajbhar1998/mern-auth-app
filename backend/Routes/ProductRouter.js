const { getProduct } = require('../Controllers/ProductController');
const ensureAuthenticated = require('../Middlewares/AuthProduct');

const router = require('express').Router();

router.get('/', ensureAuthenticated ,getProduct);

module.exports = router;

