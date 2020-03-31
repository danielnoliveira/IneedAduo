const express = require('express');

const routes = express.Router();

routes.get('/',(req,res)=>{
    res.send("<h1>Bem vindo ao backend da aplicação I need a Duo");
});

module.exports = routes;