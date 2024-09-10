const cors = require("cors");
const sequelize = require("../config/db.config");
const { globalErrorHandling } = require("../utilities/globalErrorHandling");
const ApiError = require("../utilities/ErrorClass.js");
const bootstrap = (app, express) => {
  app.use(express.json());
  const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.get("/", (req, res) => {
    res.send("OUR API V3");
  });
 // Routing set up



 
  app.use("*", (req, res, next) => {
    next(new ApiError(`In-valid Routing: ${req.originalUrl}`, 400));
  });

  //global error handling
  app.use(globalErrorHandling);

  sequelize
    .sync({ force: true })
    .then(() => {
      console.log("DB connection successfully ...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = bootstrap;
