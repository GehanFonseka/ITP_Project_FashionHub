const mongoose = require('mongoose');
require('dotenv').config();

const db = require('./config/DbConfig');
const user = require('./models/userSchema');

const seeduser = async () => {
    await user.deleteMany({});

    await user.create([

        {
            "name": "Kavishka Desham",
            "UId" : "U001"
        },
        {
            "name": "Gehan ponseka",
            "UId" : "U002"
        }
    ]);

    console.log("Users inserted");
    mongoose.disconnect();
};

seeduser();