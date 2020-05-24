const {Router} = require('express');
const guitar_controller = require('../controllers/guitar.controller.js');
const guitar_router = Router();

guitar_router.get('/', guitar_controller.getGuitars);             //get all guitars
guitar_router.post('/delete', guitar_controller.deleteGuitars);
guitar_router.post('/save', guitar_controller.saveGuitars);
guitar_router.get('/add', (req,res)=>{
    res.render('addGuitar.view.hbs');
});
guitar_router.post('/add', guitar_controller.addGuitar);

module.exports = guitar_router;