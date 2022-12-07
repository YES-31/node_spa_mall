const express = require('express');
const app = express();
const port = 8080;

//  ./routes/index 와 연결해준다.
const authmiddleware = require("./middlewares/auth-middleware.js")
const postsRouter = require("./routes/posts.js")
const commentsRouter = require("./routes/comment.js")
const loginRouter = require("./routes/signup.js")
const relogRouter = require("./routes/login.js")

//const connect = require("./schemas");


app.get('/', (req, res) => {
  res.send('Hello World!');
});

require("./models/index");

//app.use모든 미들웨어에 전역으로 사용할 것이다.
app.use(express.json()); 
app.use("/signup", loginRouter);
app.use("/login", relogRouter);
app.use("/posts", authmiddleware, postsRouter);
app.use("/comments", authmiddleware, commentsRouter);


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});