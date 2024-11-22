const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.json({ message: "ลงทะเบียนสำเร็จ", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(400).json({ error: "ไม่พบผู้ใช้" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "รหัสผ่านไม่ถูกต้อง" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ token, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getMe(req, res) {
    try {
      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({ error: "ไม่พบผู้ใช้" });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
