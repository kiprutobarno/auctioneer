class Category {
  /**
   * @param {String} categoryName
   * @param {String} createdBy
   * @param {String} dateCreated
   * @param {String} dateModified
   */
  createCategory = (categoryName, createdBy, dateCreated, dateModified) => {
    return `INSERT INTO categories(categoryName, createdBy, dateCreated, dateModified) 
            VALUES('${categoryName}', '${createdBy}', '${dateCreated}', '${dateModified}')`;
  };

  /**
   * @param {Number} id
   */
  getCategory = id => {
    return `SELECT * FROM categories WHERE id= '${id}'`;
  };

  getCategories = () => {
    return `SELECT * FROM categories`;
  };
}

const category = new Category();
export default category