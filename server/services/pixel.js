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
        console.error(error)
        return res.status(501).json(error);
    }
}

exports.createPixel = async (req,res) => {
    const temp = {};

    ({ 
        posX: temp.posX,
        posY: temp.posY,
        pixelboardAssociated: temp.pixelboardAssociated,
        color: temp.color,
        lastUpdateUser: temp.lastUpdateUser
    } = req.query);
    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);
    try {
        let pixel = await Pixel.create(temp);
        user.updateUserNbPixel(temp.lastUpdateUser,temp.pixelboardAssociated);  
        return res.status(201).json(pixel);
    } catch (error) {
        console.error(error)
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
            user.updateUserNbPixel(temp.lastUpdateUser,temp.pixelboardAssociated);  
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    pixel[key] = temp[key];
                }
            });
            await pixel.save();
            return res.status(201).json(pixel);
        }

        return res.status(404).json('Pixel_not_found');
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
    }
}