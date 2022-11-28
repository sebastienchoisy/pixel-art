const PixelBoard = require('../models/pixelBoard');
const Pixel = require('../models/pixel');
const HistoriquePixel = require('../models/historiquePixels')
const HistoriquePixelService = require("../services/historiquePixel")
const PixelUpdate = require('../services/pixel');
const { isObjectIdOrHexString } = require('mongoose');

exports.getPixelBoard = async (req, res) => {
    const id = req.body._id;
    try {
       let pixelBoard = await PixelBoard.findById(id);

        if (pixelBoard) {
            res.status(200).json({success: true, message:pixelBoard});
        }
        else{
            res.status(404).json({success: false, message:"pixelboard non trouve"});
        }
        
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

const getTotaloccurences = (board) => {
    return board.pixels.reduce((prev, actual) => prev + actual.occurence, 0);
}

const occurenceComparisonCallback = (boardA, boardB) => {
    if(getTotaloccurences(boardA) < getTotaloccurences(boardB)) {
        return -1
    }
    if(getTotaloccurences(boardA) > getTotaloccurences(boardB)) {
        return 1
    }
    return 0;
}

exports.getPopularBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        let popularBoards = [];
        boards.forEach((board) => {
            if (popularBoards.length < 5) {
                popularBoards.push(board);
            } else {
                if (getTotaloccurences(board) > getTotaloccurences(popularBoards[0])) {
                    popularBoards[0] = board;
                    popularBoards.sort(occurenceComparisonCallback);
                }
            }
        })
        res.status(200).json({success: true, message:popularBoards});
    } catch (error) {
        
        res.status(501).json({success: false, message: error});
    }
}

exports.getRecentsBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        let recentBoards = boards.length < 5 ? boards : boards.slice(boards.length - 5);
        res.status(200).json({success: true, message:recentBoards});
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

exports.getLastClosedBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        let closedBoards = boards.filter((board) => board.closure = true);
        closedBoards = closedBoards.length < 5 ? closedBoards : closedBoards.slice(boards.length - 5);
        res.status(200).json({success: true, message:closedBoards});
    } catch (error) {
        console.error(error)
        res.status(501).json({success: false, message: error});
    }
}

exports.getBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        res.status(200).json({success: true, message:boards});
    } catch (error) {
       
        res.status(501).json({success: false , message: error});
    }
}

exports.createPixelBoard = async (req,res) => {
    const temp = {};
    ({ 
        pixelBoardname    : temp.pixelBoardname,
		nbLines : temp.nbLines,
		nbColumns : temp.nbColumns,
        dateOfClosure : temp.dateOfClosure,
		intervalPixel: temp.intervalPixel,
        author: temp.author,
        multipleDrawPixel: temp.multipleDrawPixel,
        pixels: temp.pixels
    } = req.body);

   
    let pixelBoard = await PixelBoard.create(temp);
    for (let line = 0; line < temp.nbLines; line++) {
        for (let col = 0; col < temp.nbColumns; col++) {
            pixelBoard.pixels.push( new Pixel({posX: line, posY: col, color: 'white'})); // Initialise pixels of PixelBoard
        }
    }

    try {
        await pixelBoard.save();
        res.status(201).json({success: true, message:"Pixelboard creer "+pixelBoard._id});
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

exports.updatePixelBoard = async (req, res) => {
    const pixelBoard = await PixelBoard.findById(req.body._id);
    if(!req.body.nbColumns) {
        req.body.nbColumns = pixelBoard.nbColumns
    }
    if(!req.body.nbLines) {
        req.body.nbLines = pixelBoard.nbLines
    }

    if(req.body.nbColumns < pixelBoard.nbColumns){// Update if less number of columns than initiated 
        for (let col = pixelBoard.nbColumns; col > 0; col--) { 
            if(req.body.nbColumns < col){ // remove all pixels column and line
                for (let line = pixelBoard.nbLines; line >0; line--) {
                    let pixelToRemove = pixelBoard.pixels.id(req.body._id) 
                    pixelBoard.pixels.splice(pixelToRemove,1)
                }
            }
            else{ //remove only pixels of n columns 
                for (let line = pixelBoard.nbLines; line >req.body.nbLines; line--) {
                    let pixelToRemove = pixelBoard.pixels.id(req.body._id) 
                    pixelBoard.pixels.splice(pixelToRemove,1)
                }
            }
        }
        
    }
    else if (req.body.nbLines < pixelBoard.nbLines){// Update if less number of lines than initiated 
        for (let line = pixelBoard.nbLines; line > 0; line--) {
            if(req.body.nbLines < line){
                for (let col = pixelBoard.nbColumns; col >0; col--) {
                    let pixelToRemove = pixelBoard.pixels.id(req.body._id) 
                    pixelBoard.pixels.splice(pixelToRemove,1)
                }
            }
        }
    }
    else if(req.body.nbColumns > pixelBoard.nbColumns){// Update if more number of columns than initiated 
        for (let line = 0; line < req.body.nbLines ; line++) {
            if(line < pixelBoard.nbLines){
                for (let col = pixelBoard.nbColumns; col < req.body.nbColumns ; col++) {
                    pixelBoard.pixels.push(new Pixel({posX: line, posY: col, color: 'white'}));
                }
            }
            else{
                for (let col = 0; col < req.body.nbColumns; col++) {
                    pixelBoard.pixels.push(new Pixel({posX: line, posY: col, color: 'white'}));
                }
            }
        }
    }
    else if(req.body.nbLines > pixelBoard.nbLines ){// Update if more number of lines than initiated 
        for (let line = pixelBoard.nbLines; line < req.body.nbLines ; line++) {
            for (let col = 0; col < req.body.nbColumns ; col++) {
                pixelBoard.pixels.push(new Pixel({posX: line, posY: col, color: 'white'}));
            }
        }
    }

    Object.keys(req.body).forEach((field) => {
        pixelBoard[field]= req.body[field];
    })
 
    let hasErr = false;
    try {
        await pixelBoard.save();
    } catch (e) {
        console.log(e);
        hasErr = true;
    }
    if(hasErr) {
         res.status(501).json({success: false, message: error});
    } else {
         res.status(200).json({success: true, message:"Le pixelBoard a ete mis à jour "+pixelBoard._id});
    }
}
exports.updatePixelOfPixelBoard =  async (req, res) => {
    const today = new Date()
    console.log(req.body.pixelboard_id)
    const pixelBoard = await PixelBoard.findById(req.body.pixelboard_id);
    console.log(pixelBoard)
        if(today.getTime() > pixelBoard.dateOfClosure.getTime()) { // TODO : error here !
        //TODO change algo of reduce
        let pixelToUpdate = pixelBoard.pixels.id(req.body._id) 

        const temp = { 
            pixelBordId    : req.body.pixelboard_id,
            userName : req.body.lastUpdateUser,
        };

        const lastHistorique = await HistoriquePixelService.getHistorique(req.body.pixelboard_id,req.body.lastUpdateUser,res)
        let timeUnlockPixel = lastHistorique.createdAt
        timeUnlockPixel.setSeconds(timeUnlockPixel.getSeconds() + pixelBoard.intervalPixel);
        if(today.getTime() > timeUnlockPixel.getTime()) {
            PixelUpdate.updatePixel(pixelToUpdate,req.body.pixelboard_id,req) //update pixel 
            await HistoriquePixel.create(temp) //add historique
            res.status(200).json({success: true, message:"le Pixel a ete mis a jour dans le pixelboard "+pixelToUpdate._id}); 
        }
        else {
            res.status(501).json({success: false, message:"intervalle non respecte, pas de maj"});
        }
    }
    else {
        res.status(501).json({success: false, message:"Pixel Board est cloture"});
    }
}

exports.deletePixelBoard  = async (req, res) => {
    
    let hasErr = false;
    try {
        await PixelBoard.deleteOne({_id: req.body._id});
    } catch(e) {
        hasErr = true;
    }
    if (hasErr) {
        res.status(501).json({success: false, message: error});
    } else {
        res.status(200).json({success: true, message: "Pixelboard a ete supprimer"});
    }

}

exports.countPixelBoard = async (req,res) => {
    try {
        let countPixelBoard = await PixelBoard.count();
        res.status(200).json({success: true, message: countPixelBoard});
    } catch (error) {
        console.error(error)
        res.status(501).json({success: false, message: error});
    }
}