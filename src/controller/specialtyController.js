const { resolveContent } = require('nodemailer/lib/shared');
const specialtyService = require('../services/specialtyService');

async function createNewSpecialty(req, res) {
    try {
        if (!req.body.name || !req.body.imgBase64 || !req.body.descHTML || !req.body.descMarkdown) {
            res.status(200).json({
                errCode: 1,
                message: 'missing param'
            })
        } else {
            let response = await specialtyService.createNewSpecialty(req.body);
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(200).json({
            errCode: 1,
            message: 'err from server'
        })
    }
}

async function getAllSpecialty(req, res) {
    try {
        let response = await specialtyService.getAllSpecialty();
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({
            errCode: 1,
            message: 'err from server'
        })
    }
}

async function getSpecialtyById(req, res) {
    try {
        let id = req.params.id;
        let response = await specialtyService.getSpecialtyById(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(200).json({
            errCode: 1,
            message: 'err from server'
        })
    }
}

module.exports = {
    createNewSpecialty,
    getAllSpecialty,
    getSpecialtyById
}