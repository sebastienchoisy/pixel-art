const User = require('../models/user');
const jwt = require("jsonwebtoken");

// Récupération d'un utilisateur par son ID
exports.getById = async (req, res) => {
    try {
        let user = await User.findById(req.query.id);
        if (user) {
            res.status(200).json({success: true, message: user});
        } else {
            res.status(404).json({success: false, message: "Utilisateur non trouvé"});
        }
    } catch (error) {
        res.status(501).json({success: false, error});
    }
}

// Connexion d'un utilisateur
exports.login = async (req, res, next) => {
    User.findById(req.user._id).then(
        user => {
            // Création du token avec jwt
            const token = jwt.sign({user_id:user._id, role:user.role}, process.env.JWT_SECRET);
            user.save((err, user) => {
                if (err) {
                    res.status(500).json({success: false,message: err});
                } else {
                    // On place le token dans les cookies du navigateur en httpOnly
                    // pour qu'il ne soit pas accessible côté client
                    res.cookie('jwt',token, {httpOnly: true});
                    res.status(200).json({ success: true, message: `L'utilisateur ${user.username} est connecté` })
                }
            })
        },
        err => next(err)
    )

}

// Création d'un utilisateur
exports.signup = async (req, res) => {
    User.register(
        new User({username: req.body.username, email: req.body.email, role: req.body.role}),
        req.body.password,
        (err, user) => {
            if (err) {
                res.status(403).json({success: false, message: err});
            } else {
                const token = jwt.sign({user_id: user._id}, process.env.JWT_SECRET);
                user.save((err, user) => {
                    if (err) {
                        res.status(500).json({success: false, message: err});
                    } else {
                        res.cookie('jwt', token, {httpOnly: true});
                        res.status(201).json({success: true, message: `L'utilisateur ${user.username} été créé`});
                    }
                })
            }
        }
    )
}

// Modification d'un utilisateur
exports.updateUser = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.user._id});
        if (user) {
            if (req.user._id.valueOf() === user._id.valueOf()) {
                Object.keys(req.body).forEach((key) => {
                    user[key] = req.body[key];
                });
                await user.save();
                res.status(201).json({success: true, message: `L'utilisateur ${user.username} à été mis à jour.`});
            } else {
                res.status(201).json({success: false, message: "Le profil à modifier n'est pas le vôtre"});
            }
        } else {
            res.status(404).json({success: false, message: "Utilisateur non trouvé"});
        }
    } catch (error) {
        res.status(501).json({success: false, message: "Erreur interne" + error});
    }
}

// Modification d'un nombre de pixels modifiés d'un utilisateur
exports.updateUserNbPixel = async (lastUpdateUser, newPixelboardAssociated) => {
    let user = await User.findOne({username: lastUpdateUser});
    if (user) {
        if (!user.pixelboardContributed.includes(newPixelboardAssociated)) {
            user.pixelboardContributed.push(newPixelboardAssociated);
        }
        user.nbPixelModified += 1;
        await user.save();
    }
}

// Calcul du nombre total d'utilisateurs
exports.countUser = async (req, res) => {
    try {
        let countUser = await User.count();
        res.status(200).json({success: true, message: countUser});
    } catch (error) {
        res.status(501).json({success: false, message: error});
    }
}

// Vérification de la validité d'un username
exports.isUsernameAvailable = async (req, res) => {
    try {
        // Regex pour ne pas prendre en compte les majuscules/minuscules
        let user = await User.findOne({username: new RegExp('^'+req.query.username+'$', "i")});
        if (user) {
            res.status(200).json({success: false, message: 'username déjà pris'});
        } else {
            res.status(200).json({success: true, message: 'username disponible'});
        }
    } catch (error) {
        res.status(501).json({success: false, error});
    }
}
