const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const server = require('http').Server(app)
// const socket = require('socket.io')
const io = require('socket.io')(server,
    {
    cors: {
        origin: '*',
    }
})
const port = 8080

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

const room = 'serverRoom'
var clients = 0

io.on('connection', socket => {
    if(clients == 0)
        socket.emit('joinRoom',{isInit : true})
    else
        socket.emit('joinRoom',{isInit: false})
    clients++

    socket.join(room)

    console.log(`user connected : ${clients}`)

    // io.sockets.emit('broadcast',{description:`${clients} clients connected!`})
    // io.to(room).emit('joinRoom',{description:'You are now in room'})

    socket.on('disconnect', () => {
        clients--
        console.log(`user disconnected : ${clients} have left`)
    })
})