const crypto = require("crypto");
const { DBName, client } = require("../../config/mongo.config");
const { createToken } = require("../../utils/auth");
const { isThereAnyConnection } = require("../../utils/helper");

const collection = "company";

/**
 * Crea un nuevo riesgo de credito en la BD
 * @param {Json} req argumento solicitado
 * @param {Json} res argumento de respuesta
 */
function logIn(req, res) {
  const { email, password } = req.body;
  if (email && password) {
    const fun = (DB) =>
      DB.collection(collection).findOne(
        {
          $and: [
            {
              email,
              password: crypto.createHmac("sha256", password).digest("hex"),
            },
          ],
        },
        (err, company) => {
          if (err) throw err;
          if (company) {
            const token = createToken({ ...company });
            delete company.password;
            delete company._id;
            res.status(200).send({
              data: company,
              message: "Empresa encontrada",
              status: true,
              token,
            });
          } else {
            res.status(404).send({
              data: [],
              message:
                "Datos erroneos. Por favor verifica tu email y contraseña",
              status: false,
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
  } else {
    res.status(404).send({
      data: [],
      message: "No se ingresaron los campos requeridos",
      status: false,
    });
  }
}

/**
 * Crea un nuevo riesgo de credito en la BD
 * @param {Json} req argumento solicitado
 * @param {Json} res argumento de respuesta
 */
function registerCompany(req, res) {
  const { email, name, password } = req.body;
  if (email && name && password) {
    let data = {
      email,
      name,
      password: crypto.createHmac("sha256", password).digest("hex"),
    };
    const fun = (DB) =>
      DB.collection(collection).updateOne(
        { email },
        { $setOnInsert: data },
        { upsert: true },
        (err, item) => {
          if (err) throw err;
          if (item.result.upserted) {
            delete data.password;
            res.status(201).send({
              data,
              message: "Empresa creada exitosamente",
              status: true,
            });
          } else {
            res.status(400).send({
              data: [],
              message: `La empresa con email ${email} ya existe`,
              status: false,
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
  } else {
    res.status(404).send({
      data: [],
      message: "No se ingresaron los campos requeridos",
      status: false,
    });
  }
}

module.exports = {
  logIn,
  registerCompany,
};
