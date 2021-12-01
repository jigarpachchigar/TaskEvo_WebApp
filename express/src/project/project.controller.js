const ProjectService = require('./project.service');

exports.createProject = async (req, res) => {
    await ProjectService.createProject(req, res).then(resp => {
        return resp
    }).catch(err => {
        return res.status(500).send(err);
    })

}
exports.assignProject = async (req, res) => {
    await ProjectService.assignProject(req, res).then(resp => {
        return resp
    }).catch(err => {
        return res.status(500).send(err);
    })

}
exports.movetask = async (req, res) => {
    await ProjectService.movetask(req, res).then(resp => {
        return resp
    }).catch(err => {
        return res.status(500).send(err);
    })

}

exports.addWork = async (req, res) => {
    await ProjectService.addWork(req, res).then(resp => {
        return resp
    }).catch(err => {
        return res.status(500).send(err);
    })

}
