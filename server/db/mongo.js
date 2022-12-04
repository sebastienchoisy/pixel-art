const mongoose = require('mongoose');

const clientOptions = {
    useNewUrlParser   : true,
    dbName            : 'apinode'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://root:root@cluster0.0aawvzt.mongodb.net/test", clientOptions)
    } catch (error) {
        throw error;
    }
}