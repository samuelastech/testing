class User {
  constructor({ id, name, age }) {
    this.id = parseInt(id);
    this.name = name;
    this.birthDay = new Date().getFullYear() - age;
  }
}

module.exports = User;