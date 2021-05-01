const express = require('express')
const app = express()
const server = require('http').createServer(app)
const 
const cors = require('cors')

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods : ["GET","POST"]
    }
})

app.use(cors())

const port = process.env.PORT || 5000


app.get('/',(req, res) => {
    res.send('Server is running')
})

io.on('connection', socket => {
    socket.emit('me', socket.id)

    socket.on('disconnect', () => {
        socket.broadcast.emit('callended')
    })

    socket.on('calluser', ({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit('calluser', {signal : signalData, from, name})
    })

    socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})