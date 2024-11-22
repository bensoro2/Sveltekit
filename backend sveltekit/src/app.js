const express = require("express");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  setupRoutes() {
    this.app.use("/users", userRoutes);
    this.app.use("/posts", postRoutes);
  }

  start() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`เซิร์ฟเวอร์ทำงานที่พอร์ต ${PORT}`);
    });
  }
}

const app = new App();
app.start();
