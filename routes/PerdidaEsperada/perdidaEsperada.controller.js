
function perdidaEsperada(req, res) {
    let body = req.body;
    if(body.pd && body.ead && body.lgd){
        let Pe = body.pd  * body.lgd * body.ead
        localStorage.setItem('PerdidaE',Pe);
        res.status(200).send({
            status: true,
            data: Pe,
            message: `Perdida Esperada Calculada con exito`,
          });
    }else{
        res.status(400).send({
            message:'Error al Calcular Perdida Esperada'
        });
    }  ;
};

function recuperacionPe(req,res){    
    let pe = localStorage.getItem('PerdidaE')
    if (pe){
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
    perdidaEsperada,
    recuperacionPe

};