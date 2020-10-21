const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helper");
const { ObjectID } = require("mongodb");
const collection = "riesgos";
const perdidaCollection = "perdidaEsperada";
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

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
              myCache.set( 'PerdidaE',pd * lgd * ead, 1000 )
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
          myCache.set( 'PerdidaE',item.perdidaEsperada, 1000 )
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
function eliminarPerdidaEsperada(req, res) {
  let { id } = req.params;

  if (id) {
    let fun = (dataBase) =>
      dataBase
        .collection(perdidaEsperada)
        .deleteOne({ _id: ObjectID(id) }, (err, item) => {
          if (err) throw err;
          if (item.result.n > 0) {
            myCache.set( 'PerdidaE',0, 1000 )
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
      message: `No se pasaron los parametros necesarios`,
    });
  }
}


function recuperacionPerdidaEsperada(req,res){    
  let pe = myCache.get( 'PerdidaE');
  console.log(pe)
  if (pe!=null){
      let recuPe = pe * 0.3;
      res.status(200).send({
          status: true,
          data: recuPe,
          message: `recuperación Calculada con exito`,
        });
  }else{
      res.status(400).send({
          message:'Error al Calcular la recuperacion en base a la Perdida Esperada'
      });
  };
};

module.exports={
  calcularPerdidaEsperada,
  obtenerValorPerdidaEsperada,
  recuperacionPerdidaEsperada,
  eliminarPerdidaEsperada
};