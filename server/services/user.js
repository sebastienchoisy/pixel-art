const User = require('../models/user');


exports.getById = async (req, res) => {
    const id = req.query.id;
    try {
       let user = await User.findById(id);

        if (user) {
            res.status(200).json({success: true, message:user});
        }
        else{
            res.status(404).json({success: false, message:"Utilisateur non trouve"});
        }
    } catch (error) {
        res.status(501).json({success: false,error});
    }
}

exports.updateUser = async (req, res) => {
    const temp = {};
    ({ 
        username    : temp.username,
        password : temp.password
    } = req.body);

    try {
        let user = await User.findOne({ username: temp.username });
        if(req.user._id.valueOf() === user._id.valueOf()){
            if (user) {       
                Object.keys(temp).forEach((key) => {
                    user[key] = temp[key];
                });
                await user.save();
                res.status(201).json({success: true, message:"L'utilisateur a ete mis a jour"+user._id});
            }
            else{
                res.status(404).json({success: false, message:"Utilisateur non trouve"});
            }    
        }
        else{
            res.status(501).json({success: false, message:"User connecter != user a maj"});
        }
    } catch (error) {
        res.status(501).json({success: false, message:"Erreur interne" + error});
    }
}

exports.updateUserNbPixel = async (lastUpdateUser,newPixelboardAssociated) => {
    let user = await User.findOne({ username: lastUpdateUser });
    if (user) { 
        if(!user.pixelboardContributed.includes(newPixelboardAssociated)) {
            user.pixelboardContributed.push(newPixelboardAssociated)
        }

        user.nbPixelModified +=1;
        await user.save();
    }
}

exports.countUser = async (req,res) => {
    try {
        let countUser = await User.count();
        res.status(200).json({success: true, message:countUser});
    } catch (error) {
        res.status(501).json({success: false,error});
    }
}

exports.isUsernameAvailable = async(req,res) => {
    try {
        let user = await User.findOne({username: req.query.username});
        user ? res.status(403).json({success: false, message: 'username déjà pris'})
            : res.status(200).json({success: true, message: 'username disponible'});
    } catch (error) {
        res.status(501).json({success: false,error});
    }
}
