const db = require("./data/config");
const bcrypt = require("bcryptjs");

async function register(user) {
  user.password = await bcrypt.hash(user.password, 10);
  return db
    .insert(user)
    .into("users")
    .then(res => {
      const id = res[0];
      return db("username", "department")
        .from("users")
        .where({ id });
    });
}

function findUser(user) {
  return db("users")
    .select("id", "username", "department", "password")
    .where(user)
    .first();
}

function getAll() {
  return db("username", "department").from("users");
}

module.exports = {
  register,
  findUser,
  getAll
};
