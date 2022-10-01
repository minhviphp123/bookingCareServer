const doctorService = require('../services/doctorService');
const Schedule = require('../model/schedule');
const markdown = require('../model/markdown');
const { CURSOR_FLAGS } = require('mongodb');

async function getDoctorHome(req, res) {
    let limit = req.query.limit;
    if (!limit) {
        limit = 10;
    }

    try {
        let doctors = await doctorService.getTopDoctor(limit);
        return res.status(200).json(doctors);
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

async function postInfoDoctor(req, res) {
    try {
        let response = await doctorService.saveDoctorInfo(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

async function getDetailDoctor(req, res) {
    let doctorId = req.params.doctorId;
    try {
        let response = await doctorService.getDetailDoctor(doctorId);
        res.status(200).json(response)
    } catch (err) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

async function getMarkdown(req, res) {
    try {
        let response = await doctorService.getMarkdown();
        res.status(200).json(response);
    } catch (err) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

async function editMarkdown(req, res) {
    try {
        let response = await doctorService.editMarkdown(req.body);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

async function newSchedule(req, res) {
    try {
        let response = await doctorService.newSchedule(req.body);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }

}

async function getScheduleByDate(req, res) {
    try {
        let response = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

async function getDoctorBySpecialty(req, res) {
    try {
        let specialty = req.params.specialty;
        let response = await doctorService.getDoctorBySpecialty(specialty);
        res.status(200).json(response);
    } catch (err) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

module.exports = {
    getDoctorHome,
    postInfoDoctor,
    getDetailDoctor,
    getMarkdown, editMarkdown,
    newSchedule, getScheduleByDate,
    getDoctorBySpecialty
}