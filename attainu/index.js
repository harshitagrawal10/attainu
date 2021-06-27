const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const user_service = require('./service/user_service')
const post_service = require('./service/post_service')
const db = require('./models')
app.use(express.json())
db.sequelize.sync().then((req) => {
    app.listen(3001,(req) => {
        console.log(`server started at port === 3001`)
    })
})

const verifyToken = (req, res, next) => {
    if (req.headers['authorization']) {
        req.token = req.headers.authorization.split(' ')[1]
        next()
    }else {
        res.sendStatus(403)
    }
}

app.post('/createUser', async (req, res) => {
    await user_service.createUser(req.body)
    const token = await jwt.sign(req.body, 'secretKey')
    return res.json({ token })
})

app.get('/getPost', verifyToken, async (req, res, next) => {
    jwt.verify(req.token, 'secretKey', async (err, authData) => {
        if (err) {
            res.sendStatus(403)
        }else {
            try {
                const result = await post_service.getPost(req.query.limit, req.query.offset)
                return res.send({result, authData})
            }catch (e) {
                next(e)
            }
        }
    })
})

app.post('/createPost', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretKey', async (err, authData) => {
        if (err) {
            res.sendStatus(403)
        }else {
            try {
                if (authData.role === 'Admin') {
                    const result = post_service.createPost(req.body)
                    return res.send({result, authData})
                } else {
                    return res.send(`Only Admin can create post`)
                }
            }catch (e) {
                next(e)
            }
        }
    })
})

app.put('/updatePost/:id', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretKey', async (err, authData) => {
        if (err) {
            res.sendStatus(403)
        }else {
            try {
                if (authData.role === 'Admin') {
                    const result = post_service.updatePost(req.params.id, req.body.message)
                    return res.send({result, authData})
                }else {
                    return res.send(`Only Admin can update post`)
                }
            }catch (e) {
                next(e)
            }
        }
    })
})

app.delete('/deletePost/:id', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretKey', async (err, authData) => {
        if (err) {
            res.sendStatus(403)
        }else {
            try {
                if (authData.role === 'Admin') {
                    const result = post_service.deletePost(req.params.id)
                    return res.send({result, authData})
                }else {
                    return res.send(`Only Admin can delete post`)
                }
            }catch (e) {
                next(e)
            }
        }
    })
})