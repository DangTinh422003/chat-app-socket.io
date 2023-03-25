const { register,login ,setavatar,getAllusers} = require("../controller/usersController");
const router = require("express").Router();

router.post("/setavatar/:id", setavatar);
router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", getAllusers);

module.exports = router;
