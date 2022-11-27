const User = require('../models/user');
const jwt = require("jsonwebtoken")

exports.getById = async (req, res) => {
    const id = req.params.id;
    try {
       let user = await User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('user_not_found');
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
    }
}

exports.updateUser = async (req, res) => {
    const temp = {};
    ({ 
        username    : temp.username,
        password : temp.password,
        pixelboardContributed:temp.pixelboardContributed,
        theme:temp.theme
    } = req.body);

    try {
        let user = await User.findOne({ username: temp.username });
        if (user) {       
            Object.keys(temp).forEach((key) => {
                user[key] = temp[key];
            });
            await user.save();
            return res.status(201).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
    }
}

exports.updateUserNbPixel = async (lastUpdateUser,newPixelboardAssociated) => {
    try {
        let user = await User.findOne({ username: lastUpdateUser });
        if (user) { 
            if(!user.pixelboardContributed.includes(newPixelboardAssociated)) {
                user.pixelboardContributed.push(newPixelboardAssociated)
            }

            user.nbPixelModified +=1;
            await user.save();
        }
    } catch (error) {
        console.error(error)
    }
}

exports.countUser = async (req,res) => {
    try {
        let countUser = await User.count();
        return res.status(200).json(countUser);
    } catch (error) {
        console.error(error)
        return res.status(501).json(error);
    }
}
