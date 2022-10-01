const mongoose = require('mongoose');
const { postInfoDoctor } = require('../controller/doctorController');
const User = require('../model/userModel');
const MarkDown = require('../model/markdown');
const Schedule = require('../model/schedule');
const schedule = require('../model/schedule');

function getTopDoctor(limit) {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await User.find({ role: 'Doctor' }).sort({ createdAt: -1 }).limit(limit);
            resolve({
                errCode: 0,
                users: users
            })
        } catch (err) {
            reject(err);
        }
    })
}

function saveDoctorInfo(info) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!info.contentHTML || !info.contentMarkdown
                || !info.price || !info.payment
                || !info.province || !info.nameClinic
                || !info.addressClinic
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let newInfo = await new MarkDown(info);
                newInfo.save();
                resolve({
                    errCode: 0,
                    message: 'save succeed'
                })
            }
        } catch (err) {
            reject(err);
        }
    })
}

function getDetailDoctor(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let resp = await MarkDown.find({ doctorId: id }).populate('doctorId', { password: 0 });
            resolve({
                errCode: 0,
                detailDoctor: resp
            })
        } catch (err) {
            reject(err);
        }
    })
}

function getMarkdown() {
    return new Promise(async (resolve, reject) => {
        try {
            let resp = await MarkDown.find({})
            resolve({
                errCode: 0,
                detailDoctor: resp
            })
        } catch (err) {
            reject(err);
        }
    })
}

function editMarkdown(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let neededDoctor = await MarkDown.findOne({ doctorId: data.doctorId });
            if (neededDoctor) {
                await MarkDown.findOneAndUpdate({ doctorId: data.doctorId }, { $set: data })
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

function newSchedule(newSchedule) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!newSchedule[0].doctorId || !newSchedule[0].date || !newSchedule[0].time) {
                console.log(1);
                resolve({
                    errCode: 1,
                    message: 'Missing params'
                })
            } else {
                //findALl

                let neededArr = [];
                let entireDB = await Schedule.find({}, { _id: 0, __v: 0 });

                function isDup(arr, item) {
                    for (let index = 0; index < arr.length; index++) {
                        const element = arr[index];
                        if (JSON.stringify(item) === JSON.stringify(element)) {
                            return true;
                        }
                    }
                    return false;
                }

                //check duplicate

                for (let i = 0; i < newSchedule.length; i++) {
                    let ele = newSchedule[i];
                    if (!isDup(entireDB, ele)) {
                        neededArr.push(ele)
                    }
                }

                await Schedule.insertMany(neededArr)
                    .then(function () {
                        resolve({
                            errCode: 0,
                            message: 'added!'
                        })
                    })
                    .catch(function (err) {
                        resolve({
                            errCode: 1,
                            message: 'err from server..!'
                        })
                    })

            }
        } catch (err) {
            reject(err);
        }
    })
}

function getScheduleByDate(doctorId, date) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: 'missing params'
                })
            } else {
                let scheduleData = await Schedule.find({ doctorId: doctorId, date: date });

                if (!scheduleData) {
                    scheduleData = []
                }

                resolve({
                    errCode: 0,
                    data: scheduleData
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

function getDoctorBySpecialty(specialty) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await MarkDown.find({ specialty: specialty }).populate('doctorId');
            if (response) {
                resolve({
                    errCode: 0,
                    doctorBySpe: response
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getTopDoctor,
    saveDoctorInfo,
    getDetailDoctor, getMarkdown,
    editMarkdown, newSchedule,
    getScheduleByDate, getDoctorBySpecialty
}