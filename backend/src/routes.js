const express = require('express');

const routes = express.Router();
const UserControlls = require('./controllers/UserControlls');
routes.get('/userexists',UserControlls.userExists);
routes.get('/users/search',UserControlls.indexByEloAndRole);
routes.get('/users',UserControlls.index);
routes.post('/user',UserControlls.create);
routes.get('/users/:role',UserControlls.indexRole);
routes.post('/logar',UserControlls.Logar);
routes.get('/user',UserControlls.getUserByID);
routes.get('/',(req,res)=>{
    const array = ["<h1>Rotas da aplicação</h1>"];
    routes.stack.forEach(element => {
        array.push(`<h2>Rota:${element.route.path}</h2>`);
    });
    console.log(array);
    res.send(array.join("<br>"));
});
module.exports = routes;