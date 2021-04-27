const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const server = require('http').Server(app)
const socket = require('socket.io')
const io = require('socket.io')(server,
    {
    cors: {
        origin: '*',
    }
})
const port = 8080

io.on('connection', socket => {
    socket.on('localStream', (data) =>{
        console.log('localStream')
        console.log(data)
    })
})

server.listen(port, function() {
    console.log(`${port} is open`)
})

app.use(cors())
app.use(bodyparser.json())
app.post('/',(req, res)=>{
    console.log(req.body)
    res.send({
        sucess: true
    })
})

// .listen(8080,() => {
//     console.log('8080 port is open')
// })