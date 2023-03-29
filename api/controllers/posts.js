const Post = require("../models/post");

async function index(req, res) {
  try {
    const posts = await Post.getAll();
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function show(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function create(req, res) {
  try {
    console.log(req.body);
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(422).json(err);
  }
}

async function update(req, res) {
  try {
    const post = await Post.update(req.params.id, req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(422).json(err);
  }
}

async function destroy(req, res) {
  try {
    const post = await Post.destroy(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { index, show, create, update, destroy };
