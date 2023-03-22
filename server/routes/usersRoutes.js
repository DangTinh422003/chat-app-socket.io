const { register,login ,setavatar} = require("../controller/usersController");
const router = require("express").Router();

router.post("/setavatar/:id", setavatar);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
