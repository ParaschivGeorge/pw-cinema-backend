const express = require('express')
const errorHandler = require('./middleware/error')
const dbSetUp = require('./db/mongoose')
const routers = require('./routers')
const cors = require('cors')

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const port = process.env.PORT || 3000;

// db connection string
dbSetUp.connectToDb('mongodb+srv://parageo:mysterydb123!@pw-cinema-87nhm.gcp.mongodb.net/pw-cinema-db?retryWrites=true') 

app.use(cors()) // cors
app.use(express.json())
app.use(routers) 
app.use(errorHandler)

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})

io.on('connection', (socket) => {
    console.log('connection severed on socket:', socket.id)
    socket.broadcast.emit('noUsers', io.engine.clientsCount)
})