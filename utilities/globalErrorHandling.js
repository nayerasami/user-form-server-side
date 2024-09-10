const dotenv = require("dotenv");
dotenv.config();



const globalErrorHandling = (error, req, res, next) => {
  if (error) {
    if (process.env.MOOD == "DEV") {
      return res.status(error.status || 400).json({
        msgError: error.message,
        error,
        stack: error.stack,
      });
    } else {
      return res.status(error.status || 400).json({ message: error.message });
    }
  }
};

module.exports = { globalErrorHandling };
