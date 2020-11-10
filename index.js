const express=require("express");
const mongodb=require("mongodb");
const app=express();
const MongoClient=mongodb.MongoClient;
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
let db;
MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
    if(err!==null){
        console.log(err);
    }else{
        db=client.db("libross");

    }
});

app.get ("/api/libros",function (req,res){
    db.collection("libros").find().toArray(function(err,datos){
        if(err!==null){
            res.send(err);
        }else{
            res.send(datos);
        }
    });
});

app.get("/api/libros/:titulo", function (req, res) {
    const titulo = req.params.titulo;
    db.collection("libros").find({titulo:titulo}).toArray(function (err, datos){
        if(err!==null){
            res.send(err);
        }else{
            res.send(datos);
        }
      });
});


app.post("/api/nuevoLibro", function (req, res) {
    let libro = {
      titulo: req.body.titulo,
      estado: req.body.estado,
     
      
    };
  
    db.collection("libros").insertOne(libro, function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        db.collection("libros")
          .find()
          .toArray(function (err, data) {
            if (err !== null) {
              res.send(err);
            } else {
              res.send(data);
            }
          });
      }
    });
  });

app.put("/api/modificar/:titulo", function (req, res) {
    const titulo = req.params.titulo;
  
    db.collection("libros").updateOne(
      { titulo: titulo },
      { $set: { estado: "Leido" } },
      function (err, datos) {
        if (err !== null) {
          res.send(err);
        } else {
          res.send(datos);
        }
      });
  });
  app.delete("/api/borrarLibro/:titulo", function (req, res) {
    const titulo = req.params.titulo;
  
    db.collection("libros").deleteOne({titulo:titulo}, function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
  });



app.listen(3000);