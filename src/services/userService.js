const mongoose = require('mongoose');
const User = require('../model/userModel');
const AllCode = require('../model/allCodeModel');

function handleUserLogin(name, password) {
    return new Promise(async function (resolve, reject) {
        try {
            let userData = {};
            let isExist = await checkUserName(name);
            if (isExist) { //exist
                //compare pass
                let user = await User.findOne({ name: name });
                if (user) {
                    if ((user.password) === (password)) {
                        userData.errCode = 0;
                        userData.errMess = 'ok';
                        userData.user = user;
                    } else {
                        userData.errCode = 2;
                        userData.errMess = 'wrong password!';
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMess = 'User not found!';
                }
            } else {
                userData.errCode = 1;
                userData.errMess = 'User not found!';
            }
            resolve(userData);
        } catch (err) {
            reject(err);
        }
    })
}

function checkUserName(name) {
    return new Promise(async function (resolve, reject) {
        try {
            let user = await User.findOne({ name: name });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    })
}

async function getAllUser(userId) {
    return new Promise(async function (resolve, reject) {
        try {
            let users = "";
            if (userId === 'ALL') {
                users = await User.find({}, { password: 0 });
            } if (userId && userId !== 'ALL') {
                users = await User.findOne({ _id: mongoose.Types.ObjectId(userId) }, { password: 0 });
            }
            resolve(users);
        } catch (err) {
            reject(err);
        }
    })
}

async function getAllCode(type) {
    return new Promise(async function (resolve, reject) {
        try {
            let allCode = await AllCode.find({ type: type });
            resolve({
                errCode: 0,
                data: allCode
            });
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    getAllUser,
    handleUserLogin,
    getAllCode
}