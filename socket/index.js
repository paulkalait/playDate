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
                userId: newUserId,
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

    socket.on("send-message", (data) => {
        const {receiverId} = data;
        const user = activeUsers.find((user) => user.userId === receiverId)
        console.log("sending from socket to : " , receiverId)
        console.log("data", data)
        if(user) { 
            io.to(user.socketId).emit("receive-message", data)
        }
    })
})