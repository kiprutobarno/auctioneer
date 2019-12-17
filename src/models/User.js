class User {
  /**
   * @param {String} email
   * @param {String} hashedPassword
   * @param {String} dateCreated
   * @param {String} dateModified
   * @returns {String}
   */
  createUser = (email, password, dateCreated, dateModified) => {
    return `INSERT INTO users(email, password, dateCreated, dateModified) VALUES('${email}', '${password}', '${dateCreated}', '${dateModified}')`;
  };

  getAllUsers = () => {
    return `SELECT * FROM "users"`;
  };

  /**
   * @param {String} email
   */
  getUser = email => {
    return `SELECT * FROM "users" WHERE email='${email}'`;
  };
}

const user = new User();
export default user;
