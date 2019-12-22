class Item {
  /**
   * @param {Number} categoryId
   * @param {Number} ownerId
   * @param {String} itemName
   * @param {String} createdBy
   * @param {String} dateCreated
   * @param {String} dateModified
   */
  createItem = (
    categoryId,
    ownerId,
    itemName,
    createdBy,
    dateCreated,
    dateModified
  ) => {
    return `INSERT INTO items(categoryId,ownerId,itemName,createdBy,dateCreated,dateModified) 
            VALUES('${categoryId}','${ownerId}', '${itemName}','${createdBy}','${dateCreated}', '${dateModified}')`;
  };

  /**
   * @param {Number} id
   */
  getItem = id => {
    return `SELECT * FROM items WHERE id='${id}'`;
  };

  /**
   * @param {Number} id
   * @param {Number} ownerId
   */
  getOwnerItem = (id, ownerId) => {
    return `SELECT * FROM items WHERE id='${id}' AND ownerId='${ownerId}'`;
  };

  getItems = () => {
    return `SELECT * FROM items`;
  };
}

const item = new Item();
export default item;
