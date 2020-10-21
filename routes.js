
// const helloWorld = require("./routes/holaMundo")
const endpoints_diego = require("./routes/endpoints_diego")

module.exports = app => {
  app.use(endpoints_diego);
  
};


