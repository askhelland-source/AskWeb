

// 1 Importere moduler som trengs

const http = require("http");
const fs = require("fs");
const path = require("path");

// 2. Lage en funskjon som server filer 

function serveFile(filepath, contentType, response) {
    fs.readFile(path.join(__dirname, filepath), (err, data)=> {
        // Om det er error i filen, send en feilmelding om ikke fortsetter vi 
        if (err) {
            response.writeHead(500) 
            response.end("Error loading file");         
        }else {
            response.writeHead(200, { "Content-Type":contentType});
            response.end(data); 
        }

    })
}


// 3. Mine typer filer 

const mimeTypes ={
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    "txt": "text/plain"
}






// 5. gjøre klar serveren

const server = http.createServer((req, res) => {
  let filePath = req.url === "/" ? "/index.html" : req.url;
  const ext = path.extname(filePath) || ".html";
  const contentType = mimeTypes[ext] || "application/octet-stream";



  // Prøv å les filen
    function tryFile(paths, index = 0) {
    if (index >= paths.length) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }

// Prøv neste mappe 


        fs.readFile(paths[index], (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      } else {
        tryFile(paths, index + 1); 
      }
    });
  }


//Lag en liste over filepath du kan prøve 

  const pathsToTry = [
    path.join(__dirname, "public", filePath),     
    path.join(__dirname, "public", "HTML", filePath), 
    path.join(__dirname, "public", "CSS", filePath),   
    path.join(__dirname, "public", "Images", filePath)   
  ];

  tryFile(pathsToTry);
});


// 6. Starte server

server.listen(3000, () => {
    console.log("Server started on port 3000");
})