
// const helloWorld = require("./routes/holaMundo")
const endpoints_diego = require("./routes/endpoints_diego")
const endpoints_juan = require("./routes/endpoints_juan")
const riesgos = require("./routes/riesgos");
module.exports = app => {
  app.use(endpoints_diego);
  app.use(endpoints_juan);
  app.use(riesgos);
};

