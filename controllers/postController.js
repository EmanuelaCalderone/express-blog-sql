//importo la connessione al database MySQL
const connection = require("../data/db");

//funzioni relative alle rotte

//funzione index - restituisce tutti i post dal db
function index(req, res) {
    //query
    const sql = 'SELECT * FROM posts'
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Errore nel server" });
        }

        //restituisco i risultati in json
        res.json(results);
    });
}


//funzione show
function show(req, res) {
    //res.send('Mostro un singolo elemento')

    //recupero l'id dal parametro della rotta e lo parso in numero
    const postId = parseInt(req.params.id)
    //cerco il post per id e con find restituisco il primo
    const singlePost = posts.find(post => post.id === postId);

    //bonus
    //se il post non esiste
    if (!singlePost) {

        //ritorno errore 404
        res.status(404);

        //ritorno messaggio di errore
        return res.json({
            error: "Not found",
            message: "Post non trovato"
        });
    }

    //altrimenti restituisco il post in json
    res.json(singlePost);
}

//funzione store
function store(req, res) {
    //res.send('Creazione nuovo post');

    //creo nuovo id incrementando di 1 l'ultimo presente
    const ultimoPost = posts[posts.length - 1];
    const idUltimoPost = ultimoPost.id;
    const newId = idUltimoPost + 1;

    //creo nuovo oggetto post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    }

    //pusho il nuovo oggetto nell'array preesistente
    posts.push(newPost);

    //controllo in console
    console.log(posts);

    //restituisco lo status e il nuovo post
    res.status(201);
    res.json(newPost);

}

//funzione update
function update(req, res) {
    //res.send(`Modifica totale del post con ID: ${req.params.id}`);

    //recupero l'id dall'URL e lo parso in numero
    const id = parseInt(req.params.id);

    //cerco il post tramite l'id
    const post = posts.find(post => post.id === id);

    //controllo logica
    if (!post) {

        //ritorno stato di errore
        res.status(404);

        //ritorno messaggio di errore in json
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    //modifico i dati del post tovato
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    console.log(posts);

    //ritorno l'oggetto modificato
    res.json(post);
}

//funzione modify
function modify(req, res) {
    //res.send(`Modifica parziale del post con ID: ${req.params.id}`);

    //recupero l'id dall'URL e lo parso in numero
    const id = parseInt(req.params.id);

    //cerco il post tramite l'id
    const post = posts.find(post => post.id === id);

    //controllo logica
    if (!post) {

        //ritorno lo stato di errore 404
        res.status(404);
        //ritorno messaggio di errore in formato JSON
        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    //altrimenti modifico i dati del post trovato (uso operatore ternario; versione compatta di if-else)

    //se req.body.id è presente, lo assegno a post.id dandogli il valore di req.body.id, altrimenti non cambio niente
    req.body.id ? post.id = req.body.id : post.id = post.id;

    req.body.title ? post.title = req.body.title : post.title = post.title;
    req.body.content ? post.content = req.body.content : post.content = post.content;
    req.body.image ? post.image = req.body.image : post.image = post.image;
    req.body.tags ? post.tags = req.body.tags : post.tags = post.tags;

    //ritorno il post modificato in formato JSON
    res.json(post);

}

//funzione destroy per eliminare un singolo post
function destroy(req, res) {
    //recupero l'ID del post dalla richiesta e lo parso in numero
    const id = parseInt(req.params.id);

    //query per eliminare il post dal db
    const sqlDelete = "DELETE FROM posts WHERE id = ?";

    //eseguo la query per eliminare il post
    connection.query(sqlDelete, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Errore nell'eliminazione del post" });
        }
        //restituisco lo stato 204 (No Content) per indicare successo
        res.sendStatus(204)
    });
}


//esporto tutto
module.exports = { index, show, store, update, modify, destroy }
