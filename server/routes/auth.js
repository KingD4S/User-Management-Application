const { signup, login, logout } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../middleware/authValidation.js');

const router = require('express').Router();

router.post('/login', loginValidation, login); 
router.post('/signup', signupValidation, signup);
router.post('/logout',logout);

module.exports = router;