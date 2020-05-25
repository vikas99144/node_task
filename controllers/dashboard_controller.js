const User = require('../modals/user');
const ChatRoom = require('../modals/chatRoom');
const Chat = require('../modals/chat');
const mongoose = require('mongoose');
const uuid = require('uuid')
const _ = require('lodash');

module.exports.getDashboard = (req, res) => {
  var groups;
  User.find({}).exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      _.remove(data, { email: req.session.userEmail });
      res.render('dashboard', { data: data });
    }
  })

}

module.exports.chatBoard = async (req, res) => {
  var chatRoom = uuid.v4();
  var userRoom = await User.findOne({ _id: req.session.userId });
  var otherUserRoom = await User.findOne({ _id: req.session.otherId });

  var isExistChatRoom = await ChatRoom.find({
    $or: [
      { userId: req.session.userId, otherId: req.session.otherId },
      { otherId: req.session.userId, userId: req.session.otherId }
    ]
  });

  if (isExistChatRoom.length == 0) {
    createChatRoom();
  }

  function createChatRoom() {
    var newChatRoom = new ChatRoom();
    newChatRoom.userId = req.session.userId,
      newChatRoom.otherId = req.session.otherId,
      newChatRoom.chatType = "1",
      newChatRoom.chatRoom = chatRoom
    newChatRoom.save((err) => {
      if (err) {
        console.log(err);
      }
    })
  }

  var data = {
    username: userRoom.username,
    othername: otherUserRoom.username,
    userId: req.session.userId,
    otherId: req.session.otherId
  }
  res.render('chat', data);
}


module.exports.getChatBoard = async (req, res) => {
  var otherid = req.body.otherid;
  var userid = await User.findOne({ email: req.session.userEmail }).select('_id');
  req.session.userId = userid._id;
  req.session.otherId = otherid;
  if (userid && otherid) {
    res.redirect('/chat');
  }
}


module.exports.detailChat = (req, res) => {
  var userId = '';
  var aggregateObject = [
    {
      $lookup:
      {
        from: "User",
        localField: "userId",
        foreignField: "_id",
        as: "userData"
      }
    },
    {
      $unwind: "$userData"
    },
    {
      $project: {
        username: '$userData.username',
        isRead: 1,
        message: 1
      }
    }]

  Chat.aggregate(aggregateObject).exec((err, data) => {
    res.json({
      data: data
    })
  })

}

module.exports.groupChat = (req, res) => {
  res.render('groupchat');
}
