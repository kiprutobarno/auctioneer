class User {
  create = (table, ...args) => {};
  /**
   * @param {String} email
   * @param {String} hashedPassword
   * @param {String} dateCreated
   * @param {String} dateModified
   * @returns {QueryResultRow}
   */
  createUser = (email, password, dateCreated, dateModified) => {
    return `INSERT INTO users(email, password, dateCreated, dateModified) VALUES('${email}', '${password}', '${dateCreated}', '${dateModified}')`;
  };

  /** @returns {QueryResultRow} */
  getAllUsers = () => {
    return `SELECT * FROM users`;
  };

  /**
   * @param {String} email
   * @returns {QueryResultRow}
   */
  getUser = email => {
    return `SELECT * FROM users WHERE email='${email}'`;
  };
}

const user = new User();
export default user;
