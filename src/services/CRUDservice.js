const mongoose = require('mongoose');
const User = require('../model/userModel');

async function createNewUser(data) {
    return new Promise(async function (resolve, reject) {
        try {
            const newUser = await new User(data);
            await newUser.save();
            resolve('add success!');
        } catch (err) {
            reject(err);
        }
    })
}

async function editUser(data) {
    return new Promise(async function (resolve, reject) {
        try {
            let user = await User.findOne({ _id: mongoose.Types.ObjectId(data.id) });
            if (user) {
                await User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $set: data })
                resolve({
                    errCode: 0,
                    message: 'edited!'
                })
            }
        } catch (err) {
            reject(err);
        }
    })
}

function deleteById(id) {

    return new Promise(async function (resolve, reject) {
        try {
            const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });
            if (user) {
                await User.deleteOne({ _id: mongoose.Types.ObjectId(id) });
                resolve({
                    errCode: 0,
                    message: 'deleted user!'
                })
            }

            // if (user) {
            //     await user.remove().exec();
            //     resolve({
            //         errCode: 0,
            //         message: 'deleted user!'
            //     })
            // }
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    createNewUser,
    deleteById,
    editUser
}
