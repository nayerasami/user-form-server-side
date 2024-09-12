const cors = require("cors");
const sequelize = require("../config/db.config");
const ApiError = require("../utilities/ErrorClass.js");
const { globalErrorHandling } = require("../utilities/globalErrorHandling");
const userRouter =require('./user.routes.js');
const countriesRouter =require('./countries.routes.js');
const permissionsRouter =require('./permission.routes.js');
const experienceRouter =require('./experience.routes.js');
require('../models/user.model.js')
require('../models/experience.model')
require('../models/countries.model')
require('../models/permissions.model')
require('../models/accossiation');


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

 app.use("/api/v1/users",userRouter );
 app.use("/api/v1/countries",countriesRouter );
 app.use("/api/v1/permissions", permissionsRouter );
 app.use("/api/v1/experience", experienceRouter );

 
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
