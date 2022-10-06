const CRUDService = require('../services/CRUDservice');
const userService = require('../services/userService');

//crud
async function addUser(req, res) {
    await CRUDService.createNewUser(req.body);
    res.send('saved');
}

async function editUser(req, res) {
    let data = req.body;
    let message = await CRUDService.editUser(data);
    return res.status(200).json(message);
}

async function deleteUser(req, res) {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing..'
        })
    } else {
        let message = await CRUDService.deleteById(req.body.id);
        return res.status(200).json(message);
    }

}
//end crud

async function handleLogin(req, res) {

    let name = req.body.name;
    let password = req.body.password;

    if (!name || !password) {
        return res.status(500).json({
            errCode: 1,
            error: 'missing the field'
        })
    }

    let userData = await userService.handleUserLogin(name, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMess,
        user: userData.user ? userData.user : {}
    })
}


async function getAllUser(req, res) {
    let id = req.query.id;//all , single
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        message: 'ok',
        users
    })
}

async function getAllCode(req, res) {
    let type = req.query.type;
    let allCode = await userService.getAllCode(type);
    return res.status(200).json(allCode);
}

async function getAllClinic(req, res) {
    try {
        let resp = await CRUDService.getAllClinic();
        res.status(200).json(resp);
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: 'error from server'
        })
    }
}

async function getClinicById(req, res) {
    try {
        let resp = await CRUDService.getClinicById(req.params.id);
        res.status(200).json(resp);
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: 'error from server'
        })
    }
}

module.exports = {
    handleLogin,
    addUser,
    getAllUser,
    editUser,
    deleteUser,
    getAllCode,
    getAllClinic,
    getClinicById
}