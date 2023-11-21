const {
  sequelize,
  aergov_devices,
} = require("../services/aerpace-ecosystem-backend-db/src/databases/postgresql/models");
const {
  fetchUserQuery,
  checkPrivileges,
} = require("../executor/executor.query");
const { errorResponses } = require("./constant");
const { statusCodes } = require("./statusCode");

exports.fetchDeviceData = async ({ deviceId }) => {
  try {
    const deviceData = await aergov_devices.findOne({
      where: {
        id: deviceId,
      },
    });

    if (!deviceData) {
      return {
        success: false,
        errorCode: statusCodes.STATUS_CODE_DATA_NOT_FOUND,
        message: errorResponses.DEVICE_NOT_FOUND,
        data: {},
      };
    }
    return {
      success: true,
      data: deviceData,
    };
  } catch (err) {
    return {
      success: false,
      errorCode: statusCodes.STATUS_CODE_FAILURE,
      message: errorResponses.SOMETHING_WENT_WRONG,
      data: {},
    };
  }
};

exports.fetchUserData = async ({ userId }) => {
  try {
    const userData = await sequelize.query(fetchUserQuery, {
      replacements: {
        user_id: userId,
      },
    });

    if (!userData[0][0]) {
      return {
        success: false,
        errorCode: statusCodes.STATUS_CODE_UNAUTHORIZED,
        message: errorResponses.NO_ACCESS,
        data: {},
      };
    }
    return {
      success: true,
      data: userData,
    };
  } catch (err) {
    return {
      success: false,
      errorCode: statusCodes.STATUS_CODE_FAILURE,
      message: errorResponses.SOMETHING_WENT_WRONG,
      data: {},
    };
  }
};

exports.validateUser = async ({ deviceId, userData, action }) => {
  try {
    const validUser = await sequelize.query(checkPrivileges, {
      replacements: {
        device_id: deviceId,
        action_identifier: action,
        user_type: userData[0][0].user_type,
      },
    });
    if (!validUser[0][0]) {
      return {
        success: false,
        errorCode: statusCodes.STATUS_CODE_UNAUTHORIZED,
        message: errorResponses.NO_ACCESS,
        data: {},
      };
    }
    return {
      success: true,
      data: userData,
    };
  } catch (err) {
    return {
      success: false,
      errorCode: statusCodes.STATUS_CODE_FAILURE,
      message: errorResponses.SOMETHING_WENT_WRONG,
      data: {},
    };
  }
};
