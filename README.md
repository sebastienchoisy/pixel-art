# Pixel Art React
CHOISY Sébastien (**sebastienchoisy**) - CORBIERE Nicolas (**Nicolas-Corbiere**) - PARIZET Nicolas (**NicolasParizet**) - SANCHEZ Marie-Céleste (**Marie74300**)
## Tâches effectuées

Pour les tâches effectués, il est possible de consulter les issues du projet [ici](https://github.com/users/sebastienchoisy/projects/1/views/1).

On peut y voir la majorité des features et qui les a développé.

Globalement, Nicolas P et Sébastien ont travaillé sur le front-end, alors que Nicolas C et Marie ont travaillé sur le back-end.

## Comment lancer le projet

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

