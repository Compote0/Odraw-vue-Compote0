import "dotenv/config"; // Charger les variables d'environnements

import http from "node:http";
import express from "express"; // TS -> ESM
import { Server } from "socket.io";

import { db } from "./database-client.js";

const app = express(); // App Express
const server = http.createServer(app); // Server HTTP
const io = new Server(server); // Server Websocket


// Serves client build
app.use(express.static("client/dist"));

// Configurer the websocket connections
io.on("connection", async (socket) => { // Lorsqu'une nouvelle connexion est faite (= lorsqu'un client se connecte à notre app)

  // Le backend envoie un event : "pixels" où il transmet au client TOUS les pixels de la BDD, pour affichage !
  const pixels = await db.collection("pixels").find().toArray();
  socket.emit("pixels", pixels);


  socket.on("pixel", async (pixel: Pixel) => { // On écoute l'évènement "pixel" qui aurait lieu sur les tunnels
    
    // Côté back : Qu'est-ce qu'on fait de ce Pixel ? 
    // - Le VALIDER (ici, on skip cette étape => par contre on a typé le Pixel)
    // - Le sauvegarder en BDD !!!
    // - Le renvoyer à tous les clients pour qu'il l'affiche !

    db.collection("pixels").insertOne(pixel); // On l'attend pas, histoire de répondre plus rapidement au client pour l'affichage

    // Prévenir les clients qu'un nouveau pixel a été ajouté : broadcast le pixel
    io.emit("pixel", pixel);
  });
});


// Interface = un "contrat" qu'on se fixe pour certaines valeurs
interface Pixel {
  x: number;
  y: number;
  color: string;
}


// Start HTTP Server
server.listen(3000, () => {
  console.log(`Listening at http://localhost:3000`);
});
