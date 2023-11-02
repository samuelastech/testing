class User {
  constructor({ name, id, profession, age }) {
    this.id = +id;
    this.name = name;
    this.profession = profession;
    this.birthDay = new Date().getFullYear() - +age;
  }
}

module.exports = { User };