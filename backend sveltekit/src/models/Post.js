const prisma = require('../config/database');

class Post {
  async create(postData) {
    return prisma.post.create({
      data: postData
    });
  }

  async findAll() {
    return prisma.post.findMany({
      include: {
        author: {
          select: {
            username: true,
            email: true
          }
        }
      }
    });
  }

  async findById(id) {
    return prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: {
          select: {
            username: true,
            email: true
          }
        }
      }
    });
  }

  async update(id, data) {
    return prisma.post.update({
      where: { id: parseInt(id) },
      data
    });
  }

  async delete(id) {
    return prisma.post.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = new Post(); 