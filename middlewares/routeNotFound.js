function notFound(req, res, next) {
    //ritorna messaggio stato e messaggio di errore
    res.status(404);
    return res.json({
        error: "Not found",
        message: "Post inesistente"
    });
}

//esporto il modulo
module.exports = notFound;