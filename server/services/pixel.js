const Pixel = require('../models/pixel');
const user = require('../services/user');
exports.getPixel= async (req, res) => {
    const temp = {};
    ({ 
        posX: temp.posX,
        posY: temp.posY,
        pixelboardAssociated: temp.pixelboardAssociated,
    } = req.query);

    try {
       let pixel = await Pixel.findOne({ posX: temp.posX, posY:temp.posY, pixelboardAssociated: temp.pixelboardAssociated });

        if (pixel) {
            return res.status(200).json(pixel);
        }
        return res.status(404).json('Pixel_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}
exports.createPixel = async (req,res) => {
    const temp = {};

    ({ 
        posX: temp.posX,
        posY: temp.posY,
        pixelboardAssociated: temp.pixelboardAssociated,
        color: temp.color
    } = req.query);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        let pixel = await Pixel.create(temp);
        return res.status(201).json(pixel);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.updatePixel = async (req, res) => {
    const temp = {};
    ({ 
        posX: temp.posX,
        posY: temp.posY,
        pixelboardAssociated: temp.pixelboardAssociated,
        color: temp.color,
        lastUpdateUser:temp.lastUpdateUser
    } = req.query);

    try {
        let pixel = await Pixel.findOne({ posX: temp.posX, posY:temp.posY, pixelboardAssociated: temp.pixelboardAssociated });
       
        if (pixel) {     
            pixel.occurence +=1;
            user.updateUserNbPixel(lastUpdateUser);  
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    Pixel[key] = temp[key];
                }
            });
            await pixel.save();
            return res.status(201).json(pixel);
        }

        return res.status(404).json('Pixel_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}