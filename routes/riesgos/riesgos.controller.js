const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helper");
const { ObjectID } = require("mongodb");
const collection = "riesgos";
const perdidaCollection = "perdidaEsperada";

function crearRiesgo(req, res) {
  let body = req.body;

  if (body.name && body.description && body.subRiesgos) {
    let data = {
      name: body.name,
      description: body.description,
      subRiesgos: body.subRiesgos,
    };
    let fun = (dataBase) =>
      dataBase.collection(collection).insertOne(data, (err, item) => {
        if (err) throw err;
        if (item.result.n > 0) {
          res.status(201).send({
            status: true,
            data,
            message: `Elemento agregado exitosamente`,
          });
        } else {
          res.status(401).send({
            status: false,
            data: [],
            message: `No se pudo crear el concepto, por favor intenta de nuevo`,
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
      message: `No se pudo crear el concepto, por favor intenta de nuevo`,
    });
  }
}

function checkString(id) {
  const hex = /[0-9A-Fa-f]{6}/g;
  return hex.test(id) 
}

function obtenerRiesgo(req, res) {
  let { id } = req.params;
  if (id && checkString(id)) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection)
        .findOne({ _id: ObjectID(id) }, (err, item) => {
          if (err) throw err;
          if (item) {
            res.status(201).send({
              status: true,
              data: item,
              message: `Elemento encontrado`,
            });
          } else {
            res.status(401).send({
              status: false,
              data: [],
              message: `No se encontró el archivo`,
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
      message: `No se pasaron los parametros o el parametro es incorrecto`,
    });
  }
}

function modificarRiesgo(req, res) {
  let { id } = req.params;
  let body = req.body;

  if (id && body.name && body.description && body.subRiesgos && checkString(id)) {
    let fun = (dataBase) =>
      dataBase.collection(collection).updateOne(
        { _id: ObjectID(id) },
        {
          $set: {
            name: body.name,
            description: body.description,
            subRiesgos: body.subRiesgos,
          },
        },
        (err, item) => {
          if (err) throw err;
          if (item.result.n > 0) {
            res.status(200).send({
              status: true,
              data: {
                name: body.name,
                description: body.description,
                subRiesgos: body.subRiesgos,
              },
              message: `Elemento cambiado`,
            });
          } else {
            res.status(401).send({
              status: false,
              data: [],
              message: `No se encontró el archivo`,
            });
          }
        }
      );

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
      message: `No se pasaron los parametros necesarios o algún parametro es incorrecto`,
    });
  }
}

function eliminarRiesgo(req, res) {
  let { id } = req.params;

  if (id && checkString(id)) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection)
        .deleteOne({ _id: ObjectID(id) }, (err, item) => {
          if (err) throw err;
          if (item.result.n > 0) {
            res.status(200).send({
              status: true,
              message: `Elemento eliminado`,
            });
          } else {
            res.status(401).send({
              status: false,
              data: [],
              message: `No se encontró el riesgo`,
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
      message: `No se pasaron los parametros necesarios o el parametro es incorrecto`,
    });
  }
}

function calcularPerdidaEsperada(req, res) {
  const { pd, lgd, ead } = req.body;
  const { id } = req.params;

  if (pd && lgd && ead && id) {
    let fun = (dataBase) =>
      dataBase
        .collection(perdidaCollection)
        .updateOne(
          { id },
          { $set: { perdidaEsperada: pd * lgd * ead } },
          (err, item) => {
            if (err) throw err;
            if (item.result.n > 0) {
              res.status(200).send({
                status: true,
                data: {
                  valor: pd * lgd * ead,
                },
                message: `Valor de la perdida esperada calculada`,
              });
            } else {
              res.status(401).send({
                status: false,
                data: [],
                message: `No se encontró la entidad`,
              });
            }
          }
        );

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
      message: `No se pasaron los parametros necesarios`,
    });
  }
}

function obtenerValorPerdidaEsperada(req, res) {
  const { id } = req.params;
  if (id) {
    let fun = (dataBase) =>
      dataBase.collection(perdidaCollection).findOne({ id }, (err, item) => {
        if (err) throw err;
        if (item) {
          res.status(200).send({
            status: true,
            data: {
              entidad: item.id,
              valorPerdidaEsperada: item.perdidaEsperada,
            },
            message: "Valor de la perdida esperada retornada",
          });
        } else {
          res.status(401).send({
            status: false,
            data: [],
            message: `No se encontró la entidad`,
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
      message: `No se pasaron los parametros necesarios`,
    });
  }
}

module.exports = {
  crearRiesgo,
  obtenerRiesgo,
  modificarRiesgo,
  eliminarRiesgo,
  calcularPerdidaEsperada,
  obtenerValorPerdidaEsperada,
};
