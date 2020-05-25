const ChatRoom = require('../modals/chatRoom');
const Chat = require('../modals/chat');
const User = require('../modals/user');
module.exports = (io) => {
    io.sockets.on('connection', (socket) => {
        socket.on('private', async (data) => {
            await User.findOneAndUpdate({ _id: data.userId }, { isOnline: true, socketId: socket.id });
            var room = await ChatRoom.find({
                $or: [
                    { userId: data.userId, otherId: data.otherId },
                    { otherId: data.userId, userId: data.otherId }
                ]
            });
            socket.join(room[0].chatRoom);
            socket.emit('privateRoom', { chatRoom: room[0].chatRoom, chatType: room[0].chatType });
        })

        socket.on('private_message', async (data) => {
            var newChat = new Chat();
            var checkOnline = await User.findById({ _id: data.otherId });
            if (checkOnline.isOnline == "false") {
                newChat.isRead = false;
            }
            if (checkOnline.isOnline == "true") {
                newChat.isRead = true;
            }
            newChat.userId = data.userId,
                newChat.message = data.message,
                newChat.otherId = data.otherId,
                await newChat.save();
            io.sockets.in(data.chatRoom).emit('recieve_private_message', data);
        });

        socket.on('group', async (data) => {
            socket.join(data.chatRoom);
            socket.emit('groupRoom', { chatRoom: data.chatRoom });
        })

        socket.on('group_message', async (data) => {
            io.sockets.in(data.chatRoom).emit('recieve_group_message', data);
        });

        socket.on('disconnect', async () => {
            await User.findOneAndUpdate({ socketId: socket.id }, { isOnline: false });
            console.log('user disconnected');
        });
    })
}