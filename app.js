//importo la libreria Express 
const express = require('express')

//inizializzo l'app Express
const app = express()

//setto la porta di ascolto del server
const port = 3000

//importo il router dei post
const postsRouter = require('./routers/posts');

//importo il middleware per le rotte non trovate
const notFound = require('./middlewares/routeNotFound');

//importo il middleware per la gestione degli errori
const errorHandler = require('./middlewares/errorHandler');

//uso il middleware per parsare le richieste in JSON (body-parser)
app.use(express.json());

//imposto la cartella per le img (i file statici)
app.use(express.static('public'));

//configuro la rotta home
app.get('/', (req, res) => {
    res.send('Benvenuto nel mio blog');
})

//utilizzo il router per gestiren le rotte in /posts
app.use("/posts", postsRouter)

//avvio il middleware per le rotte non trovate
app.use(notFound);

//avvio il middleware per la gestione degli errori
app.use(errorHandler);

//avvio del server sulla porta specificata
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
})

