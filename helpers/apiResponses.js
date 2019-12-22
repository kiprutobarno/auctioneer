class ApiResponse {
  /**
   * @param {JSON} response
   * @param {Number} code
   * @param {String} message
   */
  successMessage = (response, code, message) => {
    return response.status(code).send({ status: code, message: message });
  };

  /**
   * @param {JSON} response
   * @param {Number} code
   * @param {String} message
   */
  errorMessage = (response, code, message) => {
    return response.status(code).send({ status: code, message: message });
  };

  /**
   * @param {JSON} response
   * @param {Number} code
   * @param {String} message
   *  @param {JSON} data
   */
  successWithData = (response, code, data) => {
    return response.status(code).send(data);
  };
}

const response = new ApiResponse();
export default response
