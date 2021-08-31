class ApiResult {
  static get OK_CREATED() {
    return 201;
  }

  static get OK_WITH_CONTENT() {
    return 200;
  }

  static get OK_WITHOUT_CONTENT() {
    return 204;
  }

  static get BAD_REQUEST() {
    return 400;
  }

  static get UNAUTHORIZED() {
    return 401;
  }

  static get NOT_FOUND() {
    return 404;
  }

  static parseResult(success, data, message) {
    return {
      success,
      data,
      message,
    };
  }

  static parseError(success, errorCode, error, message) {
    return {
      success,
      errorCode,
      error,
      message,
    };
  }
}

export default ApiResult;
