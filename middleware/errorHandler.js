const constants = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(statusCode+"->>>"+constants.VALIDATION_ERROR);
  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "NOT FOUND",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "NOT VALIDATED",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "NOT Authorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "NOT Allowed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      case constants.SERVER_ERROR:
        res.json({
            title: "SERVER Error",
            message: err.message,
            stackTrace: err.stack,
          });
      default:
        console.log("NO ERROR");
  }
};
module.exports = errorHandler;
