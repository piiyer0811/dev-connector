const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const { post } = require("./auth");

// @route  POST api/posts
// @desc   add user post
// @acess  protected
router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = {};
      const user = await User.findOne({ _id: req.user.id }).select("-password");

      post.text = req.body.text;
      post.name = user.name;
      post.user = user.id;
      post.avatar = user.avatar;

      const newPost = new Post(post);

      await newPost.save();

      return res.json({ newPost });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("server error");
    }
  }
);

// @route  GET api/posts
// @desc   get all posts
// @acess  protected

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error hui hui hui" });
  }
});

// @route  GET api/posts/:post_id
// @desc   get posts by  id
// @acess  public

router.get("/:post_id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.post_id);
    if (!posts) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("server Error");
  }
});

// @route  DELETE api/posts/:post_id
// @desc   delete user posts by post id
// @acess  protected

router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() == req.user.id) {
      await Post.findByIdAndDelete(req.params.post_id);
      return res.json({ msg: "Post succesfully deleted hui hui hui" });
    }

    return res
      .status(401)
      .json({ msg: "Authorisation denied cannot delete post" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route  PUT api/posts/like/:post_id
// @desc   like posts by post id
// @acess  protected

router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (
      post.likes.filter((like) => {
        return like.user.toString() === req.user.id;
      }).length > 0
    ) {
      return res.status(400).json({ msg: "Post is already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/posts/unlike/:post_id
// @desc   unlike posts by post id
// @acess  protected

router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (
      post.likes.filter((like) => {
        return like.user.toString() === req.user.id;
      }).length === 0
    ) {
      return res.status(400).json({ msg: "Post is yet to be liked" });
    }

    const updatedLikes = post.likes.filter((like) => {
      return like.user.toString() !== req.user.id;
    });

    post.likes = updatedLikes;
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route  POST api/posts/comment/:post_id
// @desc   add comment on a post by id
// @acess  protected
router.post(
  "/comment/:post_id",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.post_id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      const user = await User.findById(req.user.id).select("-password");

      const comment = {};
      comment.text = req.body.text;
      comment.name = user.name;
      comment.user = user.id;
      comment.avatar = user.avatar;

      post.comments.unshift(comment);
      await post.save();

      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      return res.status(500).send("server error");
    }
  }
);

// @route  DELETE api/posts/comment/:post_id/:comment_id
// @desc   delete comment on a post by id
// @acess  protected

router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "No comment found" });
    }

    //check whether the user who actually commented is deleting

    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Authorisation denied cannot delete comment" });
    }

    const newComments = post.comments.filter((comment) => {
      return comment.user.toString() !== req.user.id;
    });

    post.comments = newComments;

    await post.save();
    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
