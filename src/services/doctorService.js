const mongoose = require('mongoose');
const { postInfoDoctor } = require('../controller/doctorController');
const User = require('../model/userModel');
const MarkDown = require('../model/markdown');
const Schedule = require('../model/schedule');
const schedule = require('../model/schedule');
const Booking = require('../model/booking');
const emailService = require('../services/emailService');

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
                let scheduleDataFilter = []
                if (!scheduleData) {
                    scheduleData = []
                }
                if (((new Date(date)).getUTCMonth() + 1) > (new Date().getMonth() + 1) || ((new Date(date)).getUTCDate() + 1) > (new Date().getDate())
                    || (new Date(date)).getUTCFullYear() > (new Date().getFullYear())
                ) {
                    resolve({
                        errCode: 0,
                        data: scheduleData
                    })
                }

                if (((new Date(date)).getUTCMonth() + 1) === (new Date().getMonth() + 1) && ((new Date(date)).getUTCDate() + 1) === (new Date().getDate())
                    && ((new Date(date)).getUTCFullYear()) === (new Date().getFullYear())
                ) {
                    for (let index = 0; index < scheduleData.length; index++) {
                        const element = scheduleData[index];
                        if (Number((element.time).slice(0, 2)) >= (new Date().getHours())) {
                            scheduleDataFilter.push(element)
                        }
                    }
                    resolve({
                        errCode: 0,
                        data: scheduleDataFilter
                    })
                }
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

function getPatientForDoctor(specialty) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: 'missing params'
                })
            } else {

            }
        } catch (error) {
            reject(error);
        }
    })
}

function getPatientByDoctor(doctorId, date) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    message: 'missing params'
                })
            } else {
                let patientByDoctor = await Booking.find({ doctorId: doctorId, date: date });

                //sort by time
                if (patientByDoctor.length > 1) {
                    let n = patientByDoctor.length;

                    for (let i = 0; i < n; i++) {
                        // Finding the smallest number in the subarray
                        let min = i;
                        for (let j = i + 1; j < n; j++) {
                            if (Number((patientByDoctor[min].timeSlot).slice(0, 2)) > Number((patientByDoctor[j].timeSlot).slice(0, 2))) {
                                min = j;
                            }
                        }
                        if (min != i) {
                            // Swapping the elements
                            let tmp = patientByDoctor[i];
                            patientByDoctor[i] = patientByDoctor[min];
                            patientByDoctor[min] = tmp;
                        }
                    }

                }

                resolve({
                    errCode: 0,
                    data: patientByDoctor
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

function sendRemedy(data) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.imgBase64) {
                resolve({
                    errCode: 1,
                    message: 'missing params'
                })
            } else {
                emailService.sendAttachment(data)
            }
        } catch (error) {
            reject(error);
        }
    })
}

function delPatient(id) {
    return new Promise(async function (resolve, reject) {
        try {
            const patient = await Booking.findOne({ _id: mongoose.Types.ObjectId(id) });
            if (patient) {
                await Booking.deleteOne({ _id: mongoose.Types.ObjectId(id) });
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

module.exports = {
    getTopDoctor,
    saveDoctorInfo,
    getDetailDoctor, getMarkdown,
    editMarkdown, newSchedule,
    getScheduleByDate, getDoctorBySpecialty,
    getPatientForDoctor, getPatientByDoctor,
    sendRemedy, delPatient
}