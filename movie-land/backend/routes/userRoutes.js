const express = require("express-async-router");

const {
  login,
  googleLogin,
  register,
  getUserProfile,
  updateUserProfile,
  getAll,
  deleteUser,
  getById,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.AsyncRouter();

router.get("/", protect, admin, getAll);
router.get("/:id", getById);
router.get("/profile", protect, getUserProfile);

router.post("/", register);
router.post("/login", login);
router.post("/googleLogin", googleLogin);

router.put("/profile", updateUserProfile);

router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
