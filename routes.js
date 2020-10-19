const riesgos = require("./routes/riesgos");

module.exports = (app) => {
  app.use(riesgos);
};
