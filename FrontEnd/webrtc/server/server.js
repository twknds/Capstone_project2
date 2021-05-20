const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const fs = require('fs')
const app = express()
const path = require('path')
const port = 8080
const https = require('https')
const server = https.createServer({
        key : fs.readFileSync('./server/private.pem','utf-8'),
        cert : fs.readFileSync('./server/public.pem','utf-8')
},app)
const io = require('socket.io')(server,
    {
    cors: {
        origin: '*',
        methods:["GET","POST"]
    }
})

app.use(express.static(path.join(__dirname,"build")))
app.use(cors())
app.use(bodyparser.json())

app.post('/login',(req, res)=>{
    console.log(req.body)
    res.send({
        sucess: true
    })
})

server.listen(port, function() {
    console.log(`${port} is open`)
})

var clients = 0

io.on('connection', socket => {
    if(clients == 0)
        socket.emit('joinRoom',{isInit : true})
    else
        socket.emit('joinRoom',{isInit: false})

    clients++

    console.log(`user connected : ${clients}`)

    socket.on('message', (message) => {
        socket.broadcast.emit('message', message)
    })

    socket.on('disconnect', () => {
        clients--
        console.log(`user disconnected : ${clients} have left`)
    })
})
                                                              