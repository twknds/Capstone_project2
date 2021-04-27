const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyparser.json())
app.post('/',(req, res)=>{
    console.log(req.body)
    res.send({
        sucess: true
    })
})
.listen(8080,() => {
    console.log('8080 port is open')
})