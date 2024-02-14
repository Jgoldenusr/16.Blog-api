const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

//controllers
exports.getPostComments = (req, res) => {
  Post.findById(req.params.postId)
    .populate("comments")
    .exec(function (err, post) {
      if (err) {
        return res.status(502).json({ msg: "Error obteniendo el post" });
      }
      if (post == null) {
        return res.status(404).json({ msg: "No se halló el post" });
      }
      return res.status(200).json(post.comments);
    });
};

exports.addPostComment = [
  body("text", "Incluya un mensaje").trim().exists().escape(),

  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);

    const comment = new Comment({
      text: req.body.text,
      date: Date.now(),
      user: req.user._id,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({
        comment: { name: comment.name, text: comment.text },
        err: errors.array(),
        msg: "Hubieron errores en el proceso de validacion",
      });
    }

    const post = await Post.findById(req.params.postId);
    if (post === null) {
      return res.status(404).json({ msg: "No se halló el post" });
    } else {
      await comment.save();
      post.comments.push(comment._id);
      await post.save();
      return res.status(200).json(post);
    }
  }),
];
