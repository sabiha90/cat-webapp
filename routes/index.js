var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cat_controller = require('./controllers/cat_controller');
const { check, validationResult } = require('express-validator/check');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//routes to the different endpoints
router.get('/', cat_controller.home_page);
router.post('/cat/register', cat_controller.register_cat);
router.post('/cat/login', cat_controller.login_user);
router.get('/cats',cat_controller.display_cat_details);
router.get('/cats/random',cat_controller.display_random_cat);

module.exports = router;