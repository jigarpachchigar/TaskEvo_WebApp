var jwt = require('jsonwebtoken');
const Login = require("../models/login")
exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader
    if (token == null) return res.status(401).json({ message: "Token is not provided" }) // if there isn't any token
    await Login.findOne({
        token: token
    }).then(data => {
        if (data) {
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if (err) return res.status(403).json({ message: "Your  token is expired", success: false ,status:403})
                req.user = user
                next() // pass the execution off to whatever request the client intended
            })
        } else {
            return res.status(401).json({ message: "Invalid token  provided",success:false,status:400 })
        }
    })

}