const Project = require('../../models/project')
const Task = require('../../models/task')

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.createProject = async (req, res) => {
    try {
        let { id } = jwt.decode(req.headers['authorization'])
        const projectInfo = {
            title: req.body.name,
            description: req.body.description,
            _user: id,
        }
        let project = await Project.create(projectInfo)
        if (project) { return res.status(201).send({ data: project, success: true, status: 201, message: "Project added successfully" }) }
        else {
            return res.status(400).json({ data: '', success: false, status: 400, message: "Invalid data provided" })
        }
    } catch (err) {
        return res.send(err).status(500)
    }
},
    exports.assignProject = async (req, res) => {
        try {
            let { id } = jwt.decode(req.headers['authorization'])
            let taskData = {
                title: req.body.name,
                description: req.body.description,
                start_time: req.body.start_time,
                _assign: req.body.assign_to,
                end_time: req.body.end_time,
                _project: req.body.projectid,
                cost: req.body.cost
            }

            await Task.create(taskData).then(data => {
                if (data) {
                    return res.status(201).send({ data: data, success: true, status: 201, message: "Task added successfully" })
                } else {
                    return res.status(400).json({ data: '', success: false, status: 400, message: "Invalid data provided" })
                }
            })

        } catch (err) {
            return res.send(err).status(500)
        }
    },
    exports.movetask = async (req, res) => {
        try {
            let { id } = jwt.decode(req.headers['authorization'])
            var work_array = [];
            work_array.push({
                work_date: req.body.payload.work_date,
                work_hour: req.body.payload.work_hour
            })
            let data
            if (work_array.length) {
                data = { $push: { work: work_array } }
            } 
            if (req.body.payload.status) {
                data.status = req.body.payload.status
            }
            console.log("--dataa",data)
            let task = await Task.findOneAndUpdate({ _id: req.params.id }, data,
                { returnOriginal: false }).exec()
            if (!task) return res.json({ status: 1, message: "Data not found" })
            return res.json({ status: 1, data: task, success: true, message: "Task moved sucessfully" })

        } catch (err) {
            console.log("--er", err)
            return res.send(err).status(500)
        }
    },
    exports.addWork = async (req, res) => {
        try {
            let { id } = jwt.decode(req.headers['authorization'])

            var work_array = [];
            work_array.push({
                work_date: req.body.work_date,
                work_hour: req.body.work_hour
            })

            let task = await Task.findOneAndUpdate({ '_id': req.params.id, '_assign': id }, { $push: { work: work_array } }, { returnOriginal: false }).exec()
            if (!task) return res.json({ status: 404, message: "Data not found" })
            return res.json({ status: 201, data: task, success: true, message: "Task moved sucessfully" })

        } catch (err) {
            return res.send(err).status(500)
        }
    }