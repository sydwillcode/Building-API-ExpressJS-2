const express = require('express'); 
const router = express.Router();
const chirpstore = require('../chirpstore');

//Create home path for all chirps using .get method
router.get('/', (req, res) => {
    //respond with getchirps method from chirpstore
    res.send(chirpstore.GetChirps())
})

router.get('/:id', (req,res) =>{
    let id = req.params.id;
    if(id){
        res.send(chirpstore.GetChirp(id));
    } else{
        res.send("ID does not exist")
    }
})

//Create a new chirp
router.post('/', (req, res) =>{
   //Define key value pairs expected in chirp. Not required. Can pass req.body in para 
   let chirpObj = {
        username: req.body.username,
        message: req.body.message
    };
    chirpstore.CreateChirp(chirpObj);
    res.status(200)
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let chirpObj = {
        username: req.body.username,
        message: req.body.message
    };
    if(id){
        //updatechirp requires two parameters, id and chirp
        chirpstore.UpdateChirp(id, chirpObj);
        res.sendStatus(200)
    } else{
        res.sendStatus(404)
    }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    //deletechirp requires one parameters- id
    chirpstore.DeleteChirp(id);
    res.status(200)
})

module.exports = router;