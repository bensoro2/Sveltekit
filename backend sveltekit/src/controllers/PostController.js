const Post = require('../models/Post');

class PostController {
  async create(req, res) {
    try {
      const postData = {
        ...req.body,
        authorId: req.user.userId
      };
      const post = await Post.create(postData);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const post = await Post.update(req.params.id, req.body);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await Post.delete(req.params.id);
      res.json({ message: 'ลบโพสต์สำเร็จ' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PostController(); 