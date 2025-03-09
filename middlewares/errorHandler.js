function errorHandler(err, req, res, next) {
    //ritorno stato e messaggio di errore
    res.status(500);
    return res.json({
        error: "Internal error",
        message: "Si è verificato un errore nel server"
    });
}

//esporto il modulo
module.exports = errorHandler;