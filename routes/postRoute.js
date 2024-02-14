const express = require("express");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const passport = require("passport");
const router = express.Router();

router.get("/", postController.getAllPosts);

router.get("/:postId", postController.getPost);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.addPost
); //protected

router.put(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.editPost
); //protected

router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
); //protected

router.get("/:postId/comments", commentController.getPostComments);

router.post(
  "/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  commentController.addPostComment
);

module.exports = router;
