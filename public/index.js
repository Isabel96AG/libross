
recibirLibros();
function recibirLibros() {
  fetch("/api/libros")
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      let libros = "";
      for (let i = 0; i < datos.length; i++) {
        libros += `
            <div>
                <p>Titulo: ${datos[i].titulo}</p>
                <p>Estado: ${datos[i].estado}</p>
             
            </div>
        
        `;
      }
      document.getElementById("div1").innerHTML = libros;
    });
};

function buscar() {
    const titulo = document.getElementById("tituloBuscar").value;
    fetch(`/api/libros/${titulo}`)
      .then(function (res) {
        return res.json();
      })
      .then(function (datos) {
          let libro = `
         
            <div>
            <p>Titulo: ${datos[0].titulo}</p>

            <p>Estado: ${datos[0].estado}</p>
         
         
            </div>
              `;
          
          document.getElementById("div3").innerHTML = libro;
        
      });
  }
  function nuevoLibro() {
    const titulo = document.getElementById("titulo").value;
    const estado = document.getElementById("estado").value;
     const libro = {
      titulo,
      estado
    };
  
    fetch("/api/nuevoLibro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(libro),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
       
      });
  }
 
  function modificar() {
    const estado = document.getElementById("cambiaEstado").value;
    fetch(`/api/modificar/${estado}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (datos) {
        console.log(datos);
  
      });
  }
  function borrar() {
    const titulo = document.getElementById("tituloborrar").value;


  
    fetch(`/api/borrarLibro/${titulo}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (datos) {
        console.log(datos);
       
      });
  }