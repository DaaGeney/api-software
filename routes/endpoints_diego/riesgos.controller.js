const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helper");
const collection = "riesgosCredito"
const collection2 = "perdidaEsperada"



/**
 * Obtiene el reporte de la perdida esperada de una entidad.
 * @param {Json} req argumento solicitado
 * @param {Json} res argumento de respuesta
 */
function reportePerdidaEsperada(req, res) {
  let { id } = req.params;
  if (id) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection2)
        .findOne({ id }, (err, item) => {
          if (err) throw err;
          if (item) {
            res.status(200).send({
              status: true,
              data: item,
              message: `reporte de la entidad ${id}`,
            });
          } else {
            res.status(400).send({
              status: false,
              data: [],
              message: `No existe registro de perdida esperada para la entidad ${id}`,
            });
          }
        })

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

/**
 * Crea un nuevo riesgo de credito en la BD
 * @param {Json} req argumento solicitado
 * @param {Json} res argumento de respuesta
 */
function crearRiesgoCredito(req, res) {
  const { PD, EAD, LGD, impacto, registro, probabilidad, otros } = req.body
  const { id } = req.params
  let fun = (DB) =>
    DB
      .collection(collection)
      .updateOne({ id },
        { $setOnInsert: { PD, registro, EAD, LGD, probabilidad, impacto, otros } },
        { upsert: true },
        (err, item) => {
          if (err) throw err;
          if (item.result.upserted) {
            res.status(201).send({
              status: true,
              data: { id, PD, registro, EAD, LGD, probabilidad, impacto, otros },
              message: "Riesgo creada correctamente",
            });
          } else {
            res.status(404).send({
              status: false,
              data: [],
              message: "Riesgo existente",
            });
          }
        }
      );
  if (isThereAnyConnection(client)) {
    const DB = client.db(DBName);
    fun(DB);
  } else {
    client.connect((err) => {
      if (err) throw err;
      const DB = client.db(DBName);
      fun(DB);
    });
  }
}

function obtenerRiesgos(req, res) {
  let fun = (dataBase) =>
    dataBase
      .collection(collection)
      .find({})
      .toArray((err, item) => {
        if (err) throw err;
        if (item) {
          res.status(201).send({
            status: true,
            data: item,
            message: `Elementos encontrados`,
          });
        } else {
          res.status(404).send({
            status: false,
            data: [],
            message: `No se encontraron los riesgos`,
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
}

module.exports = {
  reportePerdidaEsperada,
  crearRiesgoCredito,
  obtenerRiesgos
};
