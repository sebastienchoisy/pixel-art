const pixelBoard = require('../models/pixelBoard');

exports.getPixelBoard = async (req, res) => {
    const id = req.params.id;
    try {
       let pixelBoard = await pixelBoard.findById(id);

        if (pixelBoard) {
            return res.status(200).json(pixelBoard);
        }
        return res.status(404).json('board_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}
exports.createPixelBoard = async (req,res) => {
    const temp = {};

    ({ 
        pixelBoardname    : temp.pixelBoardname,
        closure : temp.closure,
		nbLines : temp.nbLines,
		nbColumns : temp.nbColumns,
		intervalPixel: temp.intervalPixel
    } = req.query);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        let pixelBoard = await pixelBoard.create(temp);
        return res.status(201).json(pixelBoard);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.updatePixelBoard = async (req, res) => {
    const temp = {};
    ({ 
        pixelBoardname    : temp.pixelBoardname,
        closure : temp.closure,
		nbLines : temp.nbLines,
		nbColumns : temp.nbColumns,
		intervalPixel: temp.intervalPixel, 
		multipleDrawPixel: temp.multipleDrawPixel
    } = req.query);

    try {
        let pixelBoard = await pixelBoard.findOne({ pixelBoardname: temp.pixelBoardname });
        if (pixelBoard) {       
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    pixelBoard[key] = temp[key];
                }
            });
            await pixelBoard.save();
            return res.status(201).json(pixelBoard);
        }

        return res.status(404).json('pixelBoard_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}