const express = require("express");
const server = express();
const pool = require('./db')

//config template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
});




//config server p/ mostrar arq. estaticos
server.use(express.static('public'));

//habilitar body do form
server.use(express.urlencoded({extended: true}));

//config conexão bd
const Pool = require('pg').Pool;
const db = new Pool(pool);

//config apres da pagina
server.get("/", function(req, res) {
    
    db.query("SELECT * FROM donors", function(err, result){
        if (err) return res.send("Erro no banco select");


        const donors = result.rows;
        return res.render("index.html", {donors});
    });

    
});

server.post("/", function(req, res){
    //pegar dados do formulario
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;
    
if (name == "" || email == "" || blood == ""){
    return res.send("Todos os campos são obrigatórios")
}

    //colocar valores no bd
    const query = `INSERT INTO donors ("name", "email", "blood") 
    VALUES ($1, $2, $3)`;
    const values = [name, email, blood];

    //tratamento de erro
    db.query(query, values, function(err){
        if (err) return res.send("Erro no banco de dados");

        //ideal
        return res.redirect("/");
    });

    
});

server.listen(3001);