const Specialty = require('../model/specialty');
const Schedule = require('../model/schedule');
const Clinic = require('../model/clinic');

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

function getScheduleById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            let scheduleById = await Schedule.find({ doctorId: id });

            let EligibilityTime = [];
            let nearestTime = [];
            if (scheduleById) {
                //filter time
                for (let index = 0; index < scheduleById.length; index++) {
                    const element = scheduleById[index];
                    let date = new Date(element.date);

                    if (date.getFullYear() > (new Date().getFullYear())) {
                        EligibilityTime.push(element);
                    }

                    if (date.getUTCMonth() + 1 > (new Date().getMonth() + 1)) {
                        EligibilityTime.push(element);
                    }

                    if (date.getUTCMonth() + 1 == (new Date().getMonth() + 1)
                        && date.getUTCDate() + 1 > (new Date().getDate())) {
                        EligibilityTime.push(element);
                    }
                    if (date.getUTCMonth() + 1 == (new Date().getMonth() + 1)
                        && date.getUTCDate() + 1 == (new Date().getDate())
                        && Number(((element.time).slice((element.time).length - 3)).slice(0, 2)) > (new Date().getHours())) {
                        EligibilityTime.push(element);
                    }
                }
            }

            if (EligibilityTime) {
                //get nearest date 
                let nearestDay = EligibilityTime[0];
                for (let index = 1; index < EligibilityTime.length; index++) {
                    const element = EligibilityTime[index];
                    if ((new Date(element.date)).getFullYear() < (new Date(nearestDay.date)).getFullYear()) {
                        nearestDay = element;
                    }

                    if ((new Date(element.date)).getMonth() < (new Date(nearestDay.date)).getMonth()) {
                        nearestDay = element;
                    }

                    if ((new Date(element.date)).getMonth() == (new Date(nearestDay.date)).getMonth()
                        && (new Date(element.date)).getDate() < (new Date(nearestDay.date)).getDate()
                    ) {
                        nearestDay = element;
                    }
                }

                for (let index = 0; index < EligibilityTime.length; index++) {
                    const element = EligibilityTime[index];
                    if (element.date === nearestDay.date) {
                        nearestTime.push(element);
                    }
                }
            }

            resolve({
                errCode: 0,
                scheduleById: nearestTime
            })
        } catch (err) {
            reject(err);
        }
    })
}

function newClinic(newClinic) {
    return new Promise(async (resolve, reject) => {
        try {
            let newClinicc = await new Clinic(newClinic);
            await newClinicc.save();
            resolve({
                errCode: 0,
                message: 'added'
            })
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    createNewSpecialty, getAllSpecialty,
    getSpecialtyById, getScheduleById,
    newClinic
}