const express = require('express');

const routes = express.Router();
const UserControlls = require('./controllers/UserControlls');
routes.get('/',(req,res)=>{
    res.send("<h1>Bem vindo ao backend da aplicação I need a Duo</h1>");
});
routes.get('/userexists',UserControlls.userExists);
routes.get('/users/search',UserControlls.indexByEloAndRole);
routes.get('/users',UserControlls.index);
routes.post('/user',UserControlls.create);
routes.get('/users/:role',UserControlls.indexRole);
routes.get('/logar',UserControlls.Logar);
module.exports = routes;