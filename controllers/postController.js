const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

//controllers
exports.getAllPosts = asyncHandler(async function (req, res, next) {
  const postArray = await Post.find({})
    .populate("user", "username name surname")
    .exec();

  if (postArray.length > 0) {
    return res.status(200).json(postArray);
  } else {
    return res.status(502).json({ error: { message: "No hay ningun post" } });
  }
});

exports.addPost = [
  body("title", "Debe incluir un titulo de maximo 50 caracteres")
    .trim()
    .isLength({ min: 1, max: 50 })
    .escape(),
  body("text", "Incluya un mensaje").trim().exists().escape(),

  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      date: Date.now(),
      comments: [],
      user: req.user._id,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        post: { title: post.title, text: post.text },
        error: {
          array: errors.array(),
          message: "Hubieron errores en el proceso de validacion",
        },
      });
    } else {
      await post.save();
      return res.status(200).json(post);
    }
  }),
];

exports.getPost = asyncHandler(async function (req, res, next) {
  const foundPost = await Post.findById(req.params.postId)
    .populate("user", "username name surname")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .exec();

  if (foundPost === null) {
    return res
      .status(404)
      .json({ error: { message: "No se encontro el post" } });
  } else {
    return res.status(200).json(foundPost);
  }
});

exports.editPost = [
  body("title", "Debe incluir un titulo de maximo 50 caracteres")
    .trim()
    .isLength({ min: 1, max: 50 })
    .escape(),
  body("text", "Incluya un mensaje").trim().exists().escape(),

  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      text: req.body.text,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        post: { title: post.title, text: post.text },
        error: {
          array: errors.array(),
          message: "Hubieron errores en el proceso de validacion",
        },
      });
    }
    const thePost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: post },
      {}
    );

    return res.status(200).json(thePost);
  }),
];

exports.deletePost = asyncHandler(async function (req, res, next) {
  await Post.findByIdAndRemove(req.body.postId); //?? no es por param??
  return res.status(200).json(req.body.postId);
});
