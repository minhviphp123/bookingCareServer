const mongoose = require('mongoose');
const User = require('../model/userModel');
const Clinic = require('../model/clinic');

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

        } catch (err) {
            reject(err);
        }
    })
}

function getAllClinic() {
    return new Promise(async (resolve, reject) => {
        try {
            let clinics = await Clinic.find({}).limit(6);
            resolve({
                errCode: 0,
                clinics: clinics
            })
        } catch (err) {
            reject(err);
        }
    })
}

function getClinicById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let clinicById = await Clinic.find({ _id: mongoose.Types.ObjectId(id) });
            resolve({
                errCode: 0,
                clinicById: clinicById
            })
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    createNewUser,
    deleteById,
    editUser,
    getAllClinic,
    getClinicById
}
