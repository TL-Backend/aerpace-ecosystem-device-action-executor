const {
  errorResponses,
  actionParameters,
  successResponses,
} = require("../utils/constant");
const { logger } = require("../utils/logger");
const { statusCodes } = require("../utils/statusCode");
const {
  fetchUserData,
  fetchDeviceData,
  validateUser,
} = require("../utils/common");
let action = "AC#TURN_ON";

module.exports = {
  authorizer: async ({ userId, deviceId, action }) => {
    try {
      const {
        success: fetchUserSuccess,
        errorCode: fetchUserCode,
        message: fetchUserMessage,
        data: userData,
      } = await fetchUserData({ userId });
      if (!fetchUserSuccess) {
        return {
          success: false,
          errorCode: fetchUserCode,
          message: fetchUserMessage,
          data: {},
        };
      }

      const {
        success: fetchDeviceSuccess,
        errorCode: fetchDeviceCode,
        message: fetchDeviceMessage,
        data: deviceData,
      } = await fetchDeviceData({ deviceId });
      if (!fetchDeviceSuccess) {
        return {
          success: false,
          errorCode: fetchDeviceCode,
          message: fetchDeviceMessage,
          data: {},
        };
      }

      const {
        success: validateUserSuccess,
        errorCode: validateUserCode,
        message: validateUserMessage,
      } = await validateUser({ deviceId, userData, action });
      if (!validateUserSuccess) {
        return {
          success: false,
          errorCode: validateUserCode,
          message: validateUserMessage,
          data: {},
        };
      }

      return {
        success: true,
        data: {
          deviceData,
        },
      };
    } catch (err) {
      logger.error(err);
      return {
        success: false,
        errorCode: statusCodes.STATUS_CODE_FAILURE,
        message: errorResponses.SOMETHING_WENT_WRONG,
        data: {},
      };
    }
  },

  inputValidator: ({ parameters }) => {
    try {
      const parameterNames = Object.keys(parameters);
      const actionParameterNames = Object.keys(actionParameters[action] || {});
      if (actionParameterNames.length && !parameterNames.length) {
        return {
          success: false,
          message: errorResponses.PARAMETERS_REQUIRED,
          errorCode: statusCodes.STATUS_CODE_INVALID_FORMAT,
          data: {},
        };
      }

      for (let element of parameterNames) {
        if (
          !actionParameters[action] ||
          !actionParameterNames.includes(element) ||
          typeof parameters[element] !== actionParameters[action][element]
        ) {
          return {
            success: false,
            message: errorResponses.INVALID_PARAMETER,
            errorCode: statusCodes.STATUS_CODE_INVALID_FORMAT,
            data: {},
          };
        }
      }
      return {
        success: true,
        data: {},
      };
    } catch (err) {
      logger.error(err);
      return {
        success: false,
        errorCode: statusCodes.STATUS_CODE_FAILURE,
        message: errorResponses.SOMETHING_WENT_WRONG,
      };
    }
  },

  executor: ({ parameters, userData, deviceId }) => {
    // IOT IMPLEMENTATION
    return {
      success: true,
      message: successResponses.DEVICE_COMMUNICATED_SUCCESSFULLY,
    };
  },
  response: {
    NO_AC_DETECTED: "Couldn't find the AC ",
  },
};
