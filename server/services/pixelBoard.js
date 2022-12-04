const PixelBoard = require('../models/pixelBoard');
const Pixel = require('../models/pixel');
const HistoriquePixel = require('../models/historiquePixels');
const HistoriquePixelService = require("../services/historiquePixel");
const PixelUpdate = require('../services/pixel');


// Vérification des droits pour modifier un pixel ou une pixel board
function isAuthorized(userConnected, pixelBoard) {
    return userConnected.role === "admin" || userConnected.username === pixelBoard.author;
}

exports.checkRights = async (req, res, user) => {
    try{
        const pixelBoard = await PixelBoard.findById(req.query.id);
        if (isAuthorized(user, pixelBoard)) {
            res.status(200).json({success: true, message: true});
        } else {
            res.status(200).json({success: true, message: false});
        }
    } catch (error){
        res.status(501).json({success: false, message: error});
    }
}

// Récupération d'une pixel board par son ID
exports.getPixelBoard = async (req, res) => {
    try {
        let pixelBoard = await PixelBoard.findById(req.query.id);

        if (pixelBoard) {
            res.status(200).json({success: true, message: pixelBoard});
        } else {
            res.status(404).json({success: false, message: "pixelboard non trouve"});
        }
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

// Calcul du nombre total d'occurences sur une board (nb de fois où les pixels ont été modifié)
const getTotaloccurences = (board) => {
    return board.pixels.reduce((prev, actual) => prev + actual.occurence, 0);
}

// Triage d'un array de board pour avoir la board avec le moins d'occurences en première position
const occurenceComparisonCallback = (boardA, boardB) => {
    if (getTotaloccurences(boardA) < getTotaloccurences(boardB)) {
        return -1;
    }
    if (getTotaloccurences(boardA) > getTotaloccurences(boardB)) {
        return 1;
    }
    return 0;
}

// Récupération des 5 boards avec le plus d'occurences (les plus populaires)
exports.getPopularBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        let popularBoards = [];
        boards.forEach((board) => {
            if (popularBoards.length <= 5) {
                popularBoards.push(board);
            } else {
                if (getTotaloccurences(board) > getTotaloccurences(popularBoards[0])) {
                    popularBoards[0] = board;
                    popularBoards.sort(occurenceComparisonCallback);
                }
            }
        })
        res.status(200).json({success: true, message: popularBoards});
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

// Récupération des 5 boards les plus récentes (les 5 dernières enregistrées)
exports.getRecentsBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        let recentBoards = boards.length <= 5 ? boards : boards.slice(boards.length - 5);
        return res.status(200).json({success: true, message: recentBoards});
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

// Récupération des 5 boards fermées en dernières
exports.getLastClosedBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        let closedBoards = boards.filter((board) => board.isClosed === true);
        closedBoards = closedBoards.length < 5 ? closedBoards : closedBoards.slice(boards.length - 5);
        res.status(200).json({success: true, message: closedBoards});
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

// Récupération de toutes les boards
exports.getBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        res.status(200).json({success: true, message: boards});
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

// Création d'une pixel board
exports.createPixelBoard = async (req, res) => {
    let board = {
        pixelBoardname: req.body.pixelBoardname,
        author: req.user.username,
        nbLines: req.body.nbLines,
        nbColumns: req.body.nbColumns,
        dateOfClosure: req.body.dateOfClosure,
        intervalPixel: req.body.intervalPixel,
        multipleDrawPixel: req.body.multipleDrawPixel,
    };

    let pixelBoard = await PixelBoard.create(board);
    for (let line = 0; line < board.nbLines; line++) {
        for (let col = 0; col < board.nbColumns; col++) {
            pixelBoard.pixels.push(new Pixel({posX: line, posY: col, color: 'white'})); // Initialisation des pixels de la board
        }
    }

    try {
        await pixelBoard.save();
        res.status(201).json({success: true, id: pixelBoard._id});
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

// Modification d'une pixel board
exports.updatePixelBoard = async (req, res) => {
    const pixelBoard = await PixelBoard.findById(req.query.id);
    if (isAuthorized(req.user, pixelBoard)) {
        if (!req.body.nbColumns) {
            req.body.nbColumns = pixelBoard.nbColumns;
        }
        if (!req.body.nbLines) {
            req.body.nbLines = pixelBoard.nbLines;
        }
        if (req.body.nbColumns < pixelBoard.nbColumns) {// Update if less number of columns than initiated
            for (let col = pixelBoard.nbColumns; col > 0; col--) {
                if (req.body.nbColumns < col) { // remove all pixels column and line
                    for (let line = pixelBoard.nbLines; line > 0; line--) {
                        let pixelToRemove = pixelBoard.pixels.id(req.query.id);
                        pixelBoard.pixels.splice(pixelToRemove, 1);
                    }
                } else { //remove only pixels of n columns
                    for (let line = pixelBoard.nbLines; line > req.body.nbLines; line--) {
                        let pixelToRemove = pixelBoard.pixels.id(req.query.id);
                        pixelBoard.pixels.splice(pixelToRemove, 1);
                    }
                }
            }
        } else if (req.body.nbLines < pixelBoard.nbLines) {// Update if less number of lines than initiated
            for (let line = pixelBoard.nbLines; line > 0; line--) {
                if (req.body.nbLines < line) {
                    for (let col = pixelBoard.nbColumns; col > 0; col--) {
                        let pixelToRemove = pixelBoard.pixels.id(req.query.id);
                        pixelBoard.pixels.splice(pixelToRemove, 1);
                    }
                }
            }
        } else if (req.body.nbColumns > pixelBoard.nbColumns) {// Update if more number of columns than initiated
            for (let line = 0; line < req.body.nbLines; line++) {
                if (line < pixelBoard.nbLines) {
                    for (let col = pixelBoard.nbColumns; col < req.body.nbColumns; col++) {
                        pixelBoard.pixels.push(new Pixel({posX: line, posY: col, color: 'white'}));
                    }
                } else {
                    for (let col = 0; col < req.body.nbColumns; col++) {
                        pixelBoard.pixels.push(new Pixel({posX: line, posY: col, color: 'white'}));
                    }
                }
            }
        } else if (req.body.nbLines > pixelBoard.nbLines) {// Update if more number of lines than initiated
            for (let line = pixelBoard.nbLines; line < req.body.nbLines; line++) {
                for (let col = 0; col < req.body.nbColumns; col++) {
                    pixelBoard.pixels.push(new Pixel({posX: line, posY: col, color: 'white'}));
                }
            }
        }
        Object.keys(req.body).forEach((field) => {
            pixelBoard[field] = req.body[field];
        })
        try {
            await pixelBoard.save();
            res.status(200).json({success: true, message: "Le pixelBoard a ete mis à jour " + pixelBoard._id});
        } catch (e) {
            res.status(501).json({success: false, message: e});
        }
    } else {
        res.status(501).json({
            success: false,
            message: "Soit user connecté n'est pas admin soit n'est pas l'auteur du pixelboard"
        });
    }
}

// Modification d'un pixel d'une board
exports.updatePixelOfPixelBoard = async (req, res) => {
    const { sendMessageToClients } = require('../index');
    const today = new Date();
    const pixelBoard = await PixelBoard.findById(req.query.idBoard);
    const dateClosure = new Date(pixelBoard.dateOfClosure);

    // Check date de cloture du board
    if (today.getTime() > dateClosure.getTime()) {
        return res.status(200).json({success: false, message: "Pixel Board est cloture"});
    }
    let pixelToUpdate = pixelBoard.pixels.id(req.query.idPixel);
    const historyData = {
        pixelBoardId: req.query.idBoard,
        pixelId: req.query.idPixel,
        username: req.user.username,
    };

    // Check edition multiple
    if(!pixelBoard.multipleDrawPixel) {
        const isPixelAlreadyExist = await HistoriquePixel.exists({pixelBoardId: req.query.idBoard, pixelId: req.query.idPixel})
        if (isPixelAlreadyExist) {
            return res.status(200).json({success: false, message: "Un pixel de cette grille ne peut être édité qu'une seule fois !"});
        }
    }

    // L'historique permet de garder une trace des dernières actions d'un user avec une board
    const lastUserHistorique = await HistoriquePixelService.getLastHistorique(req.query.idBoard, req.user.username);
    if (lastUserHistorique) {
        // Check interval dernière modification
        let diffTime = today.getTime() - (new Date (lastUserHistorique.updatedAt)).getTime()
        if((pixelBoard.intervalPixel*1000) < diffTime) {
            await PixelUpdate.updatePixel(pixelToUpdate, req.query.idBoard, req.user.username, req.body.color); //update pixel
            await HistoriquePixel.create(historyData); //add historique
            res.status(200).json({
                success: true,
                message: "le Pixel a ete mis a jour dans le pixelboard " + pixelToUpdate.id
            });
            sendMessageToClients(JSON.stringify({pixelBoardId: req.query.idBoard, pixelId: pixelToUpdate.id, color: req.body.color}));
        } else {
            return res.status(200).json({success: false, message: "Il faut attendre encore : " + Math.round((pixelBoard.intervalPixel*1000 - diffTime)/1000) + " s"});
        }
    } else {
        await PixelUpdate.updatePixel(pixelToUpdate, req.query.idBoard, req.user.username, req.body.color) //update pixel
        await HistoriquePixel.create(historyData) //add historique
        res.status(200).json({
            success: true,
            message: "le Pixel a ete mis a jour dans le pixelboard " + pixelToUpdate.id
        });
        sendMessageToClients(JSON.stringify({pixelBoardId: req.query.idBoard, pixelId: pixelToUpdate.id, color: req.body.color}));
    }
    pixelBoard.save();
}

// Suppression d'une pixel board
exports.deletePixelBoard = async (req, res) => {
    const pixelBoard = await PixelBoard.findById(req.query.id);
    if (isAuthorized(req.user, pixelBoard)) {
        try {
            await PixelBoard.deleteOne({_id: req.query.id});
            res.status(200).json({success: true, message: "Pixelboard a été supprimée"});
        } catch (e) {
            res.status(501).json({success: false, message: e});
        }
    } else {
        res.status(401).json({
            success: false,
            message: "Soit user connecté n'est pas admin soit n'est pas l'auteur du pixelboard"
        });
    }
}

// total de boards en db
exports.countPixelBoard = async (req, res) => {
    try {
        let countPixelBoard = await PixelBoard.count();
        res.status(200).json({success: true, message: countPixelBoard});
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

// Vérification de la validité d'un username
exports.isNameAvailable = async (req, res) => {
    try {
        // Regex pour ne pas prendre en compte les majuscules/minuscules
        let pixelBoard = await PixelBoard.findOne({pixelBoardname: new RegExp('^'+req.query.pixelBoardname+'$', "i")});
        if (pixelBoard) {
            res.status(200).json({success: false, message: 'Nom de grille déjà pris'});
        } else {
            res.status(200).json({success: true, message: 'Nom de grille disponible'});
        }
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}
