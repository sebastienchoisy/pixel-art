# Pixel Art React
CHOISY Sébastien (**sebastienchoisy**) - CORBIERE Nicolas (**Nicolas-Corbiere**) - PARIZET Nicolas (**NicolasParizet**) - SANCHEZ Marie-Céleste (**Marie74300**)
## Tâches effectuées

Pour les tâches effectués, il est possible de consulter les issues du projet [ici](https://github.com/users/sebastienchoisy/projects/1/views/1).

On peut y voir la majorité des features et qui les a développé.

Globalement, Nicolas P et Sébastien ont travaillé sur le front-end, alors que Nicolas C et Marie ont travaillé sur le back-end.

## Comment lancer le projet

### I. Installer les dépendances

Faire ``npm install`` à la racine du projet, les dépendances pour le serveur et l'application React seront installées.
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
- Loader,
- Responsive design,
- Couleurs favorites,
- Batch quotidien qui à pour but de fermer les grilles.

#### Bonus :

- WebSocket,
- HeatMap,
- Exportation d'une grille.

## Vidéo 

[https://www.youtube.com/watch?v=NladwEmWY5U](https://www.youtube.com/watch?v=NladwEmWY5U)

La vidéo est découpé en 2 parties :

Back-End (0:00)
* Présentation de l'architecture serveur
* Démonstration d'un action

Front-End (4:37)
* Démonstration des fonctionnalités

_Excusez-nous pour la mauvaise qualité sonore en début de vidéo_

## Conseils d'utilisation 

Afin de profiter pleinement de toutes les fonctionnalités que propose l'application, nous vous invitons à créer votre propre compte utilisateur.
Bonne bataille de couleur !

## Plus d'informations :

### Architecture

Front End

* assets => répertoire comportant les fichiers volumineux (img).
* components => composants React de l'application.
* context => context React (theme).
* propTypes => définition de la structure des props.
* screens => écrans de l'application redirigé par le routeur.
* services => permet l'envois de requête au BE afin de consommer ses services.

_NB: Boostrap et reactstrap ayant été principalement utilisépour le style, les quelques classes css créés ont été mises dans le fichier App.css._

Back End

* db => initialisation de la communication avec MongoDb Atlas,
* models => définition de la structure des objets.
* routes => chemins pour appeler les services.
* services => logiques métier, fait la passerelle entre les routes et la base donnée MongoDb.
* strategies => méthodes pour authentifier l'utilisateur.

### Librairies

Front End

* reactstrap/boostrap => IHM / responsive design.
* axios => consommer les services BE.
* react-jsonschema-form-validation => gestion des formulaires.
* react-router-dom => gestion des url.
* eslint (dev) => package airbnb.

Back End

* Passport => gestion token utilisateur.
* express => création de services.
* WS => WebSocket.
* JsonWebToken => Serialiser et construire tokens.
* Mongoose => communication MongoDb Atlas.
