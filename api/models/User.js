const db = require("../database/connect");

class User {
  constructor({ id, username, email, user_password, avatar }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = user_password;
    this.avatar = avatar;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT * FROM users");
        const users = result.rows.map((user) => new User(user));
        resolve(users);
      } catch (err) {
        reject("Error retrieving users");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [
          id,
        ]);
        const user = new User(result.rows[0]);
        resolve(user);
      } catch (err) {
        reject("User not found");
      }
    });
  }

  static findByEmail(email) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);
        const user = new User(result.rows[0]);
        resolve(user);
      } catch (err) {
        reject("User not found");
      }
    });
  }

  static create({ username, email, password, avatar }) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          "INSERT INTO users (username, email, user_password, avatar) VALUES ($1, $2, $3, $4) RETURNING *",
          [username, email, password, avatar]
        );
        const user = new User(result.rows[0]);
        resolve(user);
      } catch (err) {
        reject("Error creating user");
      }
    });
  }

  static update(id, { username, email, password, avatar }) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query(
          "UPDATE users SET username = $1, email = $2, user_password = $3, avatar = $4 WHERE id = $5 RETURNING *",
          [username, email, password, avatar, id]
        );
        const user = new User(result.rows[0]);
        resolve(user);
      } catch (err) {
        reject("Error updating user");
      }
    });
  }

  static destroy(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await db.query("DELETE FROM users WHERE id = $1", [id]);
        resolve("User deleted");
      } catch (err) {
        reject("Error deleting user");
      }
    });
  }
}

module.exports = User;
