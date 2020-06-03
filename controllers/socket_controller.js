
module.exports = (io) => {
    io.sockets.on('connection', (socket) => {

        socket.on('event_1',(data)=>{
            console.log(data)
        })
        socket.on('event_2',(data)=>{
            console.log(data)
        })
        socket.on('event_3',(data)=>{
            console.log(data)
        })
        socket.on('event_4',(data)=>{
            console.log(data)
        })
        socket.broadcast.emit('message_broadcast','server broadcast message')
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    })
}