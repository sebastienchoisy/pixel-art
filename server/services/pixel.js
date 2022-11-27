const Pixel = require('../models/pixel');
const user = require('../services/user');
exports.getPixel= async (req, res) => {
    const temp = {};
    ({ 
        posX: temp.posX,
        posY: temp.posY
    } = req.query);

    try {   
       let pixel = await Pixel.findOne({ posX: temp.posX, posY:temp.posY});

        if (pixel) {
            return res.status(200).json(pixel);
        }
        return res.status(404).json('Pixel_not_found');
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
        color: temp.color,
        lastUpdateUser:temp.lastUpdateUser
    } = req.query);

    try {
        let pixel = await Pixel.findOne({ posX: temp.posX, posY:temp.posY }); //find by id
        if (pixel) {     
            pixel.occurence +=1;
            if(temp.lastUpdateUser) {
                user.updateUserNbPixel(temp.lastUpdateUser);  
            }
            Object.keys(temp).forEach((key) => {
                pixel[key] = temp[key];
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