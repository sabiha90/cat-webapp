var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cat_controller = require('./controllers/cat_controller');
const { check, validationResult } = require('express-validator/check');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//routes to the different endpoints
router.get('/', cat_controller.home_page);
router.post('/cat/register',[
	//validating input parameters
  check('username', 'Invalid username!').isEmail(),
  check('password', 'Minimum length of password is 8').isLength({ min: 8 }),
  check('name', 'Required, must contain only alphabets (a-zA-Z)').isAlpha(),
  check('weight', 'Must be numeric').isNumeric(),
  check('breed', 'Must contain only letters (a-zA-Z').optional().isAlpha(),
  check('birthdate', 'Must be a valid date in the format YYYY-MM-DD').optional().isISO8601().isLength({ min: 10, max: 10 })
],cat_controller.register_cat);
router.post('/cat/login', cat_controller.login_user);
router.get('/cats',cat_controller.display_cat_details);
router.get('/cats/random',cat_controller.display_random_cat);

module.exports = router;