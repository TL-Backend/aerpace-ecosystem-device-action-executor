exports.dbTables = {
  ROLES_TABLE: "aergov_roles",
  USER_ROLES_TABLE: "aergov_user_roles",
  USERS_TABLE: `aergov_users`,
  DEVICE_USERS: `aergov_device_users`,
  DEVICE_TABLE: `aergov_devices`,
  DEVICE_MODEL_PRIVILEGES: `aergov_device_model_privileges`,
};

exports.successResponses = {
  HEALTH_CHECK_SUCCESS: `Health check passed`,
  DEVICE_COMMUNICATED_SUCCESSFULLY: `Device communicated successfully`,
};

exports.errorResponses = {
  SOMETHING_WENT_WRONG: `Something went wrong`,
  ACTION_TYPE_NOT_FOUND: `Action type not found`,
  NO_ACCESS: `Unauthorized to perform the operation`,
  INVALID_PARAMETER: `Parameter not valid for given action`,
  PARAMETERS_REQUIRED: `Parameters required for given action`,
  DEVICE_NOT_FOUND: `Device not found`,
  DEVICE_REQUIRED: `Device_id is missing or device_id invalid`,
  ACTION_REQUIRED: `Action is missing or action invalid`,
};

exports.actionParameters = {
  "AC#TURN_ON": { temperature: "number", mode: "string" },
};
