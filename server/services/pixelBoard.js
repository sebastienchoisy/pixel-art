const PixelBoard = require('../models/pixelBoard');
const Pixel = require('../models/pixel');
const HistoriquePixel = require('../models/historiquePixels')
const HistoriquePixelService = require("../services/historiquePixel")
const PixelUpdate = require('../services/pixel');
const { isObjectIdOrHexString } = require('mongoose');

exports.getPixelBoard = async (req, res) => {
    const id = req.params.id;
    try {
       let pixelBoard = await PixelBoard.findById(id);

        if (pixelBoard) {
            return res.status(200).json(pixelBoard);
        }
        return res.status(404).json('board_not_found');
    } catch (error) {
        return res.status(501).json(error);
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
        return res.status(200).json(popularBoards);
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
    }
}

exports.getRecentsBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        let recentBoards = boards.length < 5 ? boards : boards.slice(boards.length - 5);
        return res.status(200).json(recentBoards);
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
    }
}

exports.getLastClosedBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        let closedBoards = boards.filter((board) => board.closure = true);
        closedBoards = closedBoards.length < 5 ? closedBoards : closedBoards.slice(boards.length - 5);
        return res.status(200).json(closedBoards);
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
    }
}

exports.getBoards = async (res) => {
    try {
        let boards = await PixelBoard.find();
        return res.status(200).json(boards);
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
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

    let hasErr = false;
    try {
        await pixelBoard.save();
    } catch (e) {
        console.log(e);
        hasErr = true;
    }
    if(hasErr) {
        return res.status(501).json(error);
    } else {
        return res.status(201).json(pixelBoard);
    }
}

exports.updatePixelBoard = async (req, res) => {
    const pixelBoard = await PixelBoard.findById(req.params.id);
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
                    let pixelToRemove = pixelBoard.pixels.filter(v => v.posX = line && v.posY === col).reduce((p,c) => p.concat(pixelBoard.pixels.indexOf(c)),[])[0]
                    pixelBoard.pixels.splice(pixelToRemove,1)
                }
            }
            else{ //remove only pixels of n columns 
                for (let line = pixelBoard.nbLines; line >req.body.nbLines; line--) {
                    let pixelToRemove = pixelBoard.pixels.filter(v => v.posX = line && v.posY === col).reduce((p,c) => p.concat(pixelBoard.pixels.indexOf(c)),[])[0]
                    pixelBoard.pixels.splice(pixelToRemove,1)
                }
            }
        }
        
    }
    else if (req.body.nbLines < pixelBoard.nbLines){// Update if less number of lines than initiated 
        for (let line = pixelBoard.nbLines; line > 0; line--) {
            if(req.body.nbLines < line){
                for (let col = pixelBoard.nbColumns; col >0; col--) {
                    let pixelToRemove = pixelBoard.pixels.filter(v => v.posX = line && v.posY === col).reduce((p,c) => p.concat(pixelBoard.pixels.indexOf(c)),[])[0]
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
        return res.status(501).json(error);
    } else {
        return res.status(201).json(pixelBoard);
    }
}
exports.updatePixelOfPixelBoard =  async (req, res) => {
    const today = new Date()
    const pixelBoard = await PixelBoard.findById(req.params.id);
        if(today.getTime() > pixelBoard.dateOfClosure.getTime()) { // TODO : error here !
        //TODO change algo of reduce
        //let pixelToUpdateIndex = pixelBoard.pixels.filter(v=> v._id.valueOf() === req.body._id ).reduce((p,c) => p.concat(pixelBoard.pixels.indexOf(c)),[])[0] //retrieve index of the pixel to update
        //let pixelToUpdate = pixelBoard.pixels[pixelToUpdateIndex] // retrieve the object pixel to update
        let pixelToUpdate = pixelBoard.pixels.id(req.body._id) 

        const temp = { 
            pixelBordId    : req.params.id,
            userName : req.body.lastUpdateUser,
        };

        const lastHistorique = await HistoriquePixelService.getHistorique(req.params.id,req.body.lastUpdateUser,res)
        let timeUnlockPixel = lastHistorique.createdAt
        timeUnlockPixel.setSeconds(timeUnlockPixel.getSeconds() + pixelBoard.intervalPixel);
        if(today.getTime() > timeUnlockPixel.getTime()) {
            PixelUpdate.updatePixel(pixelToUpdate,req.params.id,req) //update pixel 
            await HistoriquePixel.create(temp) //add historique
            return res.status(201).json(pixelToUpdate); 
        }
        else {
            return res.status(201).json("interval not respected, no update");
        }
    }
    else {
        return res.status(201).json("Pixel Board is closed");
    }
}

exports.deletePixelBoard  = async (req, res) => {
    let hasErr = false;
    try {
        await PixelBoard.deleteOne({_id: req.params.id});
    } catch(e) {
        hasErr = true;
    }
    if (hasErr) {
        return res.status(501).json(error);
    } else {
        return res.status(201).json(pixelBoard);
    }

}

exports.countPixelBoard = async (req,res) => {
    try {
        let countPixelBoard = await PixelBoard.count();
        return res.status(200).json(countPixelBoard);
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
    }
}