const PixelBoard = require('../models/pixelBoard');

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
exports.createPixelBoard = async (req,res) => {
    const temp = {};
    ({ 
        pixelBoardname    : temp.pixelBoardname,
		nbLines : temp.nbLines,
		nbColumns : temp.nbColumns,
        dateOfClosure : temp.dateOfClosure,
		intervalPixel: temp.intervalPixel,
        author: temp.author,
        multipleDrawPixel: temp.multipleDrawPixel
    } = req.query);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        let pixelBoard = await PixelBoard.create(temp);
        return res.status(201).json(pixelBoard);
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
    }
}

exports.updatePixelBoard = async (req, res) => {
    const temp = {};
    ({ 
        closure : temp.closure,
		nbLines : temp.nbLines,
		nbColumns : temp.nbColumns,
		intervalPixel: temp.intervalPixel, 
		multipleDrawPixel: temp.multipleDrawPixel,
        dateOfClosure : temp.dateOfClosure,
    } = req.query);

    try {
        let pixelBoard = await PixelBoard.findById(req.params.id);
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
        console.error(error)
        return res.status(501).json(error);
    }
}

exports.deletePixelBoard  = async (req, res) => {
    try {
        let pixelBoard = await PixelBoard.findById(req.params.id);
        if(pixelBoard) {
            await PixelBoard.findByIdAndDelete(req.params.id)
            return res.status(201).json("pixel_board_deleted");
        }
        return res.status(404).json('pixelBoard_not_found');
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
    }

}