class ApiResponse {
  /**
   * @param {JSON} response
   * @param {Number} code
   * @param {String} message
   */
  successMessage = (response, code, message) => {
    try {
      return response.status(code).send({ status: code, message: message });
    } catch (error) {}
  };

  /**
   * @param {JSON} response
   * @param {Number} code
   * @param {String} message
   */
  errorMessage = (response, code, message) => {
    try {
      return response.status(code).send({ status: code, message: message });
    } catch (error) {}
  };

  /**
   * @param {JSON} response
   * @param {Number} code
   * @param {String} message
   *  @param {JSON} data
   */
  successWithData = (response, code, data) => {
    try {
      return response.status(code).send(data);
    } catch (error) {}
  };
}

const response = new ApiResponse();
export default response;
