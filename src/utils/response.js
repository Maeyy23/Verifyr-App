function buildFailureResponse(message, statusCode) {
  return {
    message,
    statusCode,
    status: "Failure",
  };
}

function buildSuccessResponse(message, statusCode, data) {
  if (data) {
    return {
      message,
      statusCode,
      status: "Success",
      data,
    };
  }
  return {
    message,
    statusCode,
    status: "Success",
  };
}

module.exports = { buildFailureResponse, buildSuccessResponse };
