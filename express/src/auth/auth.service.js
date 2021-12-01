const AuthService = require('../auth/auth.service');

const User = require('../../models/user')
const Login = require('../../models/login')

const Project = require('../../models/project')
const Task = require('../../models/task')

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const userInfo = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
        }
        let user = await User.create(userInfo)
        if (user) { return res.status(201).send({ data: user, success: true, status: 201, message: "Register successfully" }) }
        else {
            return res.status(400).json({ data: '', success: false, status: 400, message: "Invalid data provided" })
        }
    } catch (err) {
        return res.send(err)
    }
}

exports.signin = async (req, res) => {
    try {
        await User.findOne({ email: req.body.email }).then(user => {
            if (!user) {
                return res.status(204).json({ message: "User not exist", status: 204 })
            }
            bcrypt.compare(req.body.password, user.password, async (err, data) => {
                if (err) throw err
                if (data) {
                    let jwttoken = jwt.sign({
                        // exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        id: user._id,
                    }, process.env.SECRET_KEY, { expiresIn: '365d' }
                    );
                    const loginInfo = {
                        token: jwttoken,
                        _user: user._id
                    }
                    let login = await Login.create(loginInfo)
                    if (login) { return res.status(200).json({ msg: "Login success", status: 200, data: user, token: jwttoken, success: true }) }
                } else {
                    return res.status(400).json({ msg: "Invalid credential", data: '', status: 400, success: true })
                }

            })
        })
    } catch (err) {
        return res.send(err).status(500)
    }
},

    exports.signout = async (req, res) => {
        try {
            await Login.deleteOne({ token: req.headers['Authorization'] }).then(login => {
                if (login) {
                    return res.status(200).json({ success: true, msg: "logout sucessfully", status: 200 })
                }
                else {
                    return res.status(400).json({ success: false, msg: 'Invalid data provided', status: 400 })
                }
            })
        } catch (err) {
            console.log("-err", err)
            return res.send(err)
        }
    },
    exports.userList = async (req, res) => {
        try {
            let { id } = jwt.decode(req.headers['authorization'])
            await User.find({ _id: { $ne: id } }).then((user) => {
                if (user) {
                    return res.status(200).json({ success: true, data: user, status: 200, message: "User get successfully" })
                } else {
                    return res.status(404).json({ success: false, data: [], status: 404, message: "Data not found" })
                }
            })
        } catch (err) {
            return res.send(err)
        }
    }
exports.userAssign = async (req, res) => {
    try {
        let date = (req.body.data) ? req.body.data : new Date()
        let { id } = jwt.decode(req.headers['authorization'])
        await Task.aggregate([
            {
                "$match": {
                    _assign: mongoose.Types.ObjectId(id),
                    start_time: { $lte: new Date(date) },
                    end_time: { $gte: new Date(date) }
                }
            }
        ]
        ).then(data => {
            if (data.length) {
                return res.status(200).json({ success: true, data: data, status: 200, message: "User task get successfully" })
            } else {
                return res.status(200).json({ success: false, data: [], status: 200, message: "Data not found" })
            }
        }).catch(err => {
            console.log("-err", err)
            return res.status(500).json({ success: false, status: 500, message: "Something went wrong" })
        })


    } catch (err) {
        console.log("-er", err)
        return res.send(err)
    }
},
    exports.userProject = async (req, res) => {
        try {
            let { id } = jwt.decode(req.headers['authorization'])
            await Project.aggregate([
                { "$match": { _user: mongoose.Types.ObjectId(id) } },
                {
                    "$lookup": {
                        "from": "tasks",
                        "let": { "partyId": "$_id" },
                        "pipeline": [
                            { "$match": { "$expr": { "$eq": ["$_project", "$$partyId"] } } },
                            {
                                "$lookup": {
                                    "from": "users",
                                    "let": { "addressId": "$_assign" },
                                    "pipeline": [
                                        { "$match": { "$expr": { "$eq": ["$_id", "$$addressId"] } } }
                                    ],
                                    "as": "user"
                                }
                            }
                        ],
                        "as": "task"
                    }
                },
                //  { "$unwind": "$user" }
            ])
                .then(data => {
                    if (data.length) {
                        // console.log("---token", data)
                        data.filter(val => {
                            let complete = 0
                            let pending = 0;
                            let inprogress = 0
                            val.task.filter(stat => {
                                if (stat.status == "complete") {
                                    complete ++
                                } 
                                if (stat.status == "inprogress") {
                                    inprogress ++
                                }
                                if (stat.status == "todo") {
                                    pending ++
                                }
                                })
                                val.complete  = complete;
                                val.pending = pending
                                val.inprogress = inprogress
                        })
                        return res.status(200).json({ success: true, data: data, status: 200, message: "User project get successfully" })
                    } else {
                        return res.status(200).json({ success: false, data: [], status: 200, message: "Data not found" })
                    }
                })
        } catch (err) {
            return res.send(err)
        }
    }
