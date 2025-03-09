//importo express
const express = require('express')

//importo router per gestire le rotte
const router = express.Router()

//importo le funzioni del controller
const postController = require('../controllers/postController');

// rotte di CRUD dei post

// index = restituisce tutti i post
router.get('/', postController.index);

// show = restituisce un singolo post in base all'id
router.get('/:id', postController.show);

//store = crea un nuovo post
router.post('/', postController.store);

// update = aggiorna un post esistente
router.put('/:id', postController.update);

// modify = modifica parzialmente un post
router.patch('/:id', postController.modify);
    
// destroy = elimina un post
router.delete('/:id', postController.destroy);

//esporto il modulo del router
module.exports = router;