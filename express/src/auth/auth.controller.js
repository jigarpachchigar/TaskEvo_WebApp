const AuthService = require('../auth/auth.service');

exports.signup = async (req, res) => {
    await AuthService.signup(req, res).then(resp => {
        return resp
    }).catch(err => {
        return res.status(500).send(err);
    })

}

exports.signin = async (req, res) => {
    await AuthService.signin(req, res).then(resp => {
        return resp
    }).catch(err => {
        return res.status(500).send(err);
    })
},

exports.signout = async(req,res) =>{
    await AuthService.signout(req, res).then(resp => {
        return resp
    }).catch(err => {
        return res.status(500).send(err);
    })
},
exports.userList = async(req,res) => {
    await AuthService.userList(req, res).then(resp => {
        return resp
    }).catch(err => {
        return res.status(500).send(err);
    })
}
exports.userAssign =  async (req,res)=>{
    await AuthService.userAssign(req, res).then(resp => {
        return resp
    }).catch(err => {
        return res.status(500).send(err);
    })
},
exports.userProject = async (req,res) =>{
    await AuthService.userProject(req, res).then(resp => {
        return resp
    }).catch(err => {
        return res.status(500).send(err);
    })
}