const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

//controllers
exports.getUserPosts = asyncHandler(async function (req, res, next) {
  const userPosts = await Post.find({ user: req.params.userId })
    .populate("user", "username name surname")
    .exec();

  if (userPosts.length > 0) {
    return res.status(200).json(userPosts);
  } else {
    return res
      .status(502)
      .json({ error: { message: "No hay ningun post del usuario" } });
  }
});

exports.newUser = [
  body(
    "username",
    "El nombre de usuario debe contener minimo un caracter y maximo 30"
  )
    .trim()
    .isLength({ min: 1, max: 30 })
    .bail()
    .custom(async (val) => {
      const myUsr = await User.findOne({ username: val });
      if (myUsr !== null) {
        throw new Error("El nombre de usuario ya se encuentra en uso");
      }
      return true;
    }),
  body("name", "El nombre debe contener minimo un caracter y maximo 30")
    .trim()
    .isLength({ min: 1, max: 30 })
    .escape(),
  body("surname", "El apellido debe contener minimo un caracter y maximo 30")
    .trim()
    .isLength({ min: 1, max: 30 })
    .escape(),
  body("password", "Debe introducir una contraseña").exists(),
  body("password2", "Las contraseñas no coinciden")
    .exists()
    .custom((value, { req }) => value === req.body.password),

  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    let newUser = {
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      isWriter: req.body.isWriter,
    };

    if (!errors.isEmpty()) {
      return res.status(400).json({
        user: newUser,
        error: {
          array: errors.array(),
          message: "Hubieron errores en el proceso de validacion",
        },
      });
    } else {
      const hashedPass = await bcryptjs.hash(req.body.password, 10);
      if (!hashedPass) {
        return res.status(502).json({
          user: newUser,
          error: {
            message: "Error creando el hash de la clave",
          },
        });
      } else {
        newUser.password = hashedPass;
        const usr = new User(newUser);
        await usr.save();
        return res.status(200).json({ success: true });
      }
    }
  }),
];

exports.authenticateUser = asyncHandler(async function (req, res, next) {
  const { username, password } = req.body;
  const newUser = await User.findOne({ username: username });
  if (!newUser) {
    return res
      .status(400)
      .json({ error: { message: "Nombre de usuario incorrecto" } });
  } else {
    const authUser = await bcryptjs.compare(password, newUser.password);
    if (!authUser) {
      return res
        .status(400)
        .json({ error: { message: "Contraseña incorrecta" } });
    } else {
      const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);
      return res.status(200).json({ token });
    }
  }
});
