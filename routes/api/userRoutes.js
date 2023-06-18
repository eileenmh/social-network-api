const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  addFriend,
  removeFriend,
  deleteUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);

router.route("/:userId/delete").delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
