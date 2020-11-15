const auth = require("./routes/auth");
const endpoints_diego = require("./routes/endpoints_diego")
const endpoints_juan = require("./routes/endpoints_juan")
const perdidaEsperada = require("./routes/PerdidaEsperada");
const riesgos = require("./routes/riesgos");
 
module.exports = app => {
  app.use(auth);
  app.use(endpoints_diego);
  app.use(endpoints_juan);
  app.use(riesgos);
  app.use(perdidaEsperada);
};

