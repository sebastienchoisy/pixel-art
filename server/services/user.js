const User = require('../models/user');
exports.getById = async (req, res) => {
    const id = req.params.id;
    try {
       let user = await User.findById(id);

        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}
exports.createUser = async (req,res) => {
    const temp = {};

    ({ 
        username    : temp.username,
        password : temp.password
    } = req.query);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        let user = await User.create(temp);
        return res.status(201).json(user);
    } catch (error) {
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
    } = req.query);

    try {
        let user = await User.findOne({ username: temp.username });
        if (user) {       
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });
            await user.save();
            return res.status(201).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}
exports.updateUserNbPixel = async (lastUpdateUser) => {
    try {
        let user = await User.findOne({ username: lastUpdateUser });
        
        if (user) {       
            user.nbPixelModified +=1;
            await user.save();
            return res.status(201).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}