const user = require('../services/user');

// Modification d'un pixel
exports.updatePixel = async (pixelToUpdate,idPixelBoard,username, color) => {
    if (pixelToUpdate) {
        pixelToUpdate.lastUpdateUser = username;
        pixelToUpdate.color = color;
        pixelToUpdate.occurence +=1;
        await user.updateUserNbPixel(username, idPixelBoard);  //Update User nbPixelModified and pixelboardContributed
    }

}