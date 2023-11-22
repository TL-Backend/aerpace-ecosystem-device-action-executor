/**
 * Response handler methods to maintain common response format for all APIs.
 */

const { errorResponses } = require("./constant");
const { statusCodes } = require("./statusCode");

exports.successResponse = ({
  req,
  res,
  data = {},
  code = statusCodes.STATUS_CODE_SUCCESS,
  message = "",
}) => res.status(code).send({ data, code, message });

exports.errorResponse = ({
  req,
  res,
  data = {},
  code = statusCodes.STATUS_CODE_FAILURE,
  message = errorResponses.SOMETHING_WENT_WRONG,
}) => res.status(code).send({ data, code, message });
