const { getAllUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/all-users', authMiddleware, getAllUser);
router.post('/create-new', authMiddleware, createUser);
router.put("/update/:id",authMiddleware, updateUser);
router.delete("/delete/:id",authMiddleware, deleteUser);

module.exports = router;
