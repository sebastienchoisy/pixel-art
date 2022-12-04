# Pixel Art React

## Comment faire marcher le projet

### I. Installer les dépendances

Faire ``npm install`` à la racine du projet, les dépendances pour le serveur et l'appplication React seront installées.
### II. Lancer Docker 
 
Faire ``cd server`` puis ``docker-compose up -d``, la connexion a la BD se fait
### III. Lancer le serveur (backend)

Faire ``npm start`` à la racine du projet, le serveur se lance sur localhost:3001

### IV. Lancer l'application React (frontend)

Faire ``npm run app`` à la racine du projet, l'app se lance sur localhost:3000


## Fonctionnalités du projet 

#### Standard : 

- Création de compte utilisateur,
- Création et suppression de grilles,
- Édition d'un grille en fonction de paramètres de restrictions (édition multiple, interval de temps),
- Thème de l'application (light/dark),
- Filtre des grilles (status/nom),
- Loader

#### Bonus :

- WebSocket,
- HeatMap,
- Exportation d'une grille.

