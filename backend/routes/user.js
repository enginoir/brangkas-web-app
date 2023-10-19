const express = require("express");
const {
    registerUser,
    getUsers,
    login,
    getUser,
    deleteUser,
    updateUser,
    updateProfile,
} = require("../controllers/user");
const { User } = require("../models");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

// VALIDATORS
const { runValidation } = require("../validators");
const {
    userRegisterValidator,
    userSigninValidator,
} = require("../validators/user");

// ROUTES
router
    .route("/")
    .post(protect, admin, userRegisterValidator, runValidation, registerUser)
    .get(protect, admin, getUsers);

router
    .route("/:id")
    .get(protect, getUser)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

    router.post("/login", userSigninValidator, runValidation, async (req, res) => {
        const { emailOrUsername, password } = req.body;

        try {
            const user = await User.scope("withPassword").findOne({
                where: {
                    [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
                },
            });

            if (user && (await user.validPassword(password))) {
                const token = generateToken(user.id);
                res.json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    image: user.image,
                    token: token,
                });
            } else {
                res.status(401);
                throw new Error("Invalid email or username or password");
            }
        } catch (error) {
            console.error(error);
            res.status(500);
            throw new Error("Server Error");
        }
    });

router.route("/profile/:id").put(protect, updateProfile);

module.exports = router;
