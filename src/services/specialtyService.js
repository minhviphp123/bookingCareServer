const Specialty = require('../model/specialty');

function createNewSpecialty(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let newSpecialty = await new Specialty(data);
            await newSpecialty.save();
            resolve({
                errCode: 0,
                message: 'added'
            })
        } catch (err) {
            reject(err);
        }
    })
}

function getAllSpecialty() {
    return new Promise(async (resolve, reject) => {
        try {
            let allSpecialty = await Specialty.find({});
            resolve({
                errCode: 0,
                allSpecialty: allSpecialty
            })
        } catch (err) {
            reject(err);
        }
    })
}

function getSpecialtyById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await Specialty.find({ _id: id });
            resolve({
                errCode: 0,
                specialty: specialty
            })
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    createNewSpecialty, getAllSpecialty,
    getSpecialtyById
}