const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const app = express()
const apps = express()
const port = 8080
const server = require('http').Server(app)
const io = require('socket.io')(server,
    {
    cors: {
        origin: '*',
    }
})

app.use(cors())
app.use(bodyparser.json())

app.post('/',(req, res)=>{
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