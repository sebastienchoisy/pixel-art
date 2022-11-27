const Pixel = require('../models/pixel');
const user = require('../services/user');

exports.updatePixel = async (pixelToUpdate,idPixelBoard,req) => {
    const temp = {};
    ({  color: temp.color,
        lastUpdateUser:temp.lastUpdateUser
    } = req.body);

        
    if (pixelToUpdate) {     
        pixelToUpdate.occurence +=1;
        if(temp.lastUpdateUser) {
            user.updateUserNbPixel(temp.lastUpdateUser,idPixelBoard);  //Update User nbPixelModified and pixelboardContributed
        }
        Object.keys(temp).forEach((key) => {
            pixelToUpdate[key] = temp[key];
        });
        await pixelToUpdate.save();
    }

       
    
}