const patientService = require('../services/patientService');

async function newBooking(req, res) {
    try {
        if (req.body.name && req.body.phone && req.body.address && req.body.reason) {
            let response = await patientService.newBooking(req.body);
            res.status(200).json(response);
        } else {
            res.status(200).json({
                errCode: 1,
                message: 'missing param!'
            })
        }
    } catch (err) {
        res.status(200).json({
            errCode: 1,
            message: 'err from server'
        })
    }
}

module.exports = {
    newBooking
}