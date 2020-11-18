const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helper");
const collection = "riesgosCredito";

function obtenerRegistros(req, res) {
  const { id } = req.params;
  if (id) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection)
        .find({ id })
        .toArray((err, item) => {
          if (err) throw err;
          if (item) {
            res.status(200).send({
              status: true,
              data: item,
              message: "Registros encontrados",
            });
          } else {
            res.status(400).send({
              status: false,
              data: [],
              message: `No se encuentra el concepto ${id}`,
            });
          }
        });
    if (isThereAnyConnection(client)) {
      const dataBase = client.db(DBName);
      fun(dataBase);
    } else {
      client.connect((err) => {
        if (err) throw err;
        const dataBase = client.db(DBName);
        fun(dataBase);
      });
    }
  } else {
    res.status(400).send({
      status: false,
      data: [],
      message: "No se han ingresado todos los campos",
    });
  }
}

function generarMapa(req, res) {
  const { id } = req.params;
  if (id) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection)
        .find({ name: id })
        .toArray((err, item) => {
          if (err) throw err;
          if (item.length > 0) {
            const map = item[0].impacto * item[0].probabilidad;
            if (map >= 12 && map <= 20) {
              res.status(200).send({
                status: true,
                data: "Riesgo Bajo",
                message: `Se genero el mapa correctamente`,
              });
            } else if (map >= 24 && map <= 36) {
              res.status(200).send({
                status: true,
                data: "Riesgo Moderado",
                message: `Se genero el mapa correctamente`,
              });
            } else if (map >= 40 && map <= 54) {
              res.status(200).send({
                status: true,
                data: "Riesgo Importante",
                message: `Se genero el mapa correctamente`,
              });
            } else if (map >= 60 && map <= 72) {
              res.status(200).send({
                status: true,
                data: "Riesgo Critico",
                message: `Se genero el mapa correctamente`,
              });
            } else {
              res.status(200).send({
                status: true,
                data: "No se pudo calcular",
                message: `Se genero un error en el calculo`,
              });
            }
          } else {
            res.status(400).send({
              status: false,
              data: [],
              message: `No se encuentra el concepto ${id}`,
            });
          }
        });
    if (isThereAnyConnection(client)) {
      const dataBase = client.db(DBName);
      fun(dataBase);
    } else {
      client.connect((err) => {
        if (err) throw err;
        const dataBase = client.db(DBName);
        fun(dataBase);
      });
    }
  } else {
    res.status(400).send({
      status: false,
      data: [],
      message: "No se han ingresado todos los campos",
    });
  }
}

module.exports = {
  obtenerRegistros,
  generarMapa,
};
