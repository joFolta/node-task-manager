const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secretToSignToken')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // find by id && if token is in the tokens array (not deleted)

        if (!user) {
            throw new Error() // no need for error message as it will trigger catch(e)
        }

        req.user = user // save found user (since we already have it) to req, which will be sent back in res.send()
        next()
    } catch (e) {
        res.status(401).send({error: "Please authenticate. "})
    }
}

module.exports = auth;