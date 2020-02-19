const express = require("express");
const server = express();

//config template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
});


const donors = [
    {
        name: "Brenda M",
        blood:"O+"
    },
    {
        name: "Deborah M",
        blood:"O+"
    },
    {
        name: "Edson M",
        blood:"O+"
    },
    {
        name: "Gustavo M",
        blood:"O+"
    }
]

//config server p/ mostrar arq. estaticos
server.use(express.static('public'));

//habilitar body do form
server.use(express.urlencoded({extended: true}));

//config apres da pagina
server.get("/", function(req, res) {
    return res.render("index.html", {donors});
});

server.post("/", function(req, res){
    //pegar dados do formulario
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;
    
    donors.push({
        name: name,
        blood: blood,
    });

    return res.redirect("/");
});

server.listen(3001);