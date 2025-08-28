class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static findByUsername(username) {
    // Simulação (depois pode virar consulta no BD)
    const users = [{ username: "admin", password: "123" }];
    return users.find(u => u.username === username);
  }
}

module.exports = User;