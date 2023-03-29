const db = require("../database/connect");

class Post {
  constructor({ id, title, content }) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  static async getAll() {
    const result = await db.query("SELECT * FROM posts");
    console.log(result.rows);
    return result.rows.map((post) => {
      console.log(post);
      return new Post(post);
    });
  }

  static async findById(id) {
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
    return new Post(result.rows[0]);
  }

  static async create(data) {
    const { title, content } = data;
    console.log(data);
    let result = await db.query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *;",
      [title, content]
    );
    return new Post(result.rows[0]);
  }

  static async update(id, data) {
    const { title, content } = data;
    let result = await db.query(
      "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *;",
      [title, content, id]
    );
    return new Post(result.rows[0]);
  }

  static async destroy(id) {
    await db.query("DELETE FROM posts WHERE id = $1;", [id]);
  }
}

module.exports = Post;
