# Pixels War

### Backend

- [x] Initialiser NPM
- [x] Initialiser Typescript 
- [x] Ecrire les scripts NPM : 
  - [x] npm run dev
  - [x] npm run build
  - [x] npm run start
- [x] Créer un serveur Express avec Typescript

### Frontend

- [x] Initialiser un projet VueJS (Version 3)
- [x] Dessiner la grille
- [x] Faire en sorte que le backend serve statiquement les ressources du frontend 

### Communication entre le client et le serveur

- [x] Websockets
  - quand on clique sur un pixel dans la grille, on envoie les coordonnées du pixel au backend
  - qui le transmet alors à tous les autres clients connectés 
  - ==> communication dans les deux sens


## Workflow de dev

Côté backend : 
- `npm run dev` (qui lance `nodemon`)
- le backend sert le dossier `client/dist`

Côté client : 
- `npm run watch` (qui lance la compilation avec un mode "watch" qui surveille les modifications et recompile si besoin !)


### Mise en place

- `npm install socket.io` côté back
- `npm install socket.io-client` côté front

- Coté back : 
  - `const io = new Server(server);` : Créer le serveur websocket
  - `io.on("connection", (socket) => {` : Ecouter les nouvelles connexions websocket initié par les clients
  - `socket.on("pixel", (pixel) => {` : Ecouter les evenements "pixel" qui ont lieu sur une connexion.

