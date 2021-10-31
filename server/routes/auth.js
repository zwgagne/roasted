const router = require("express").Router();
const validation = require("../middleware/validation");
const authorization = require("../middleware/authorization");
const authController = require("../controllers/authController");


router.post('/register', validation, authController.createUser);
router.post('/login', validation, authController.loginUser);
router.get('/is-verified', authorization, authController.checkToken);



module.exports = router;
