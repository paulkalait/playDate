const io = require('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let activeUsers = []

io.on("connection", (socket) => {
    //add new User
    socket.on('new-user-add', (newUserId) => {
        //if user is not add peviously
        if(!activeUsers.some((user)=> user.userId === newUserId))
        {
            activeUsers.push({
                user: newUserId,
                socketId: socket.id
            })
        }
        console.log("connected users", activeUsers)
        io.emit('get-users', activeUsers)
    })

    socket.on("disconnect", () => { 
        //filter out the user that is trying to disconnect
        activeUsers = activeUsers.filter((user) = user.socketId !== socket.id)
        console.log("User disconnected", activeUsers)
        io.emit('get-users', activeUsers)
    })

})