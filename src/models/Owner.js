class Owner {
  /**
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} email
   * @param {String} createdBy
   * @param {String} dateCreated
   * @param {String} dateModified
   */
  createOwner = (
    firstName,
    lastName,
    email,
    createdBy,
    dateCreated,
    dateModified
  ) => {
    return `INSERT INTO owners(firstName, lastName, email, createdBy, dateCreated, dateModified) 
            VALUES('${firstName}','${lastName}','${email}','${createdBy}','${dateCreated}','${dateModified}')`;
  };

  /**
   * @param {String} email
   */
  getOwner = email => {
    return `SELECT * FROM owners WHERE email='${email}'`;
  };

  getOwners = () => {
    return `SELECT * FROM owners`;
  };
}

const owner = new Owner();
export default owner;
