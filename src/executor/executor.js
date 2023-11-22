const { errorResponses } = require("../utils/constant");
const { logger } = require("../utils/logger");
const { errorResponse, successResponse } = require("../utils/responseHandler");
const { statusCodes } = require("../utils/statusCode");

exports.execute = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const { action, device_id: deviceId, parameters } = req.body;
    let actionConfig;

    try {
      actionConfig = require(`../devices_actions/${action}`);
    } catch (err) {
      return errorResponse({
        req,
        res,
        message: errorResponses.ACTION_TYPE_NOT_FOUND,
        code: statusCodes.STATUS_CODE_DATA_NOT_FOUND,
      });
    }

    const { authorizer, inputValidator, executor } = actionConfig;

    const {
      success: authorizeSuccess,
      message: authorizeMessage,
      errorCode: authorizeCode,
      data: authorizeData,
    } = await authorizer({ userId, deviceId, action });
    if (!authorizeSuccess) {
      return errorResponse({
        req,
        res,
        message: authorizeMessage,
        code: authorizeCode,
      });
    }

    const {
      success: validatorSuccess,
      message: validatorMessage,
      errorCode: validatorCode,
    } = inputValidator({ parameters });
    if (!validatorSuccess) {
      return errorResponse({
        req,
        res,
        message: validatorMessage,
        code: validatorCode,
      });
    }

    const { success, message, errorCode } = executor({
      parameters,
      authorizeData,
      deviceId,
    });
    if (!success) {
      return errorResponse({
        req,
        res,
        message: message,
        code: errorCode,
      });
    }
    return successResponse({
      req,
      res,
      message: message,
    });
  } catch (err) {
    logger.error(err);
    return errorResponse({
      req,
      res,
      code: statusCodes.STATUS_CODE_FAILURE,
    });
  }
};
