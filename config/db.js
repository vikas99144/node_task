const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false)
mongoose.connect("mongodb://localhost:27017/demo", {
  useNewUrlParser: "true",
  useUnifiedTopology: "true"
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})