const mongoose = require('mongoose');

const DrClinicSpecialty = new mongoose.Schema({
    doctorId: Number,
    clinicId: Number,
    specialtyId: Number
});

module.exports = mongoose.model('DrClinicSpecialtys', DrClinicSpecialty);
