class Validator {
  /**
   * @param {String} email
   */
  isEmailValid = email => {
    return /\S+@\S+\.\S+/.test(email);
  };
}

const validator = new Validator();
export default validator;
