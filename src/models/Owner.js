class Owner {
  /**
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} createdBy
   * @param {String} dateCreated
   * @param {String} dateModified
   */
  createOwner = (firstName, lastName, createdBy, dateCreated, dateModified) => {
    return `INSERT INTO owners(firstName, lastName, createdBy, dateCreated, dateModified) 
            VALUES('${firstName}','${lastName}','${createdBy}','${dateCreated}','${dateModified}')`;
  };

  /**
   * @param {Number} id
   */
  getOwner = id => {
    return `SELECT * FROM owners WHERE id='${id}'`;
  };

  getOwners = () => {
    return `SELECT * FROM owners`;
  };
}

const owner = new Owner();
export default owner;
