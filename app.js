const express = require('express');
const app = express();
const port = 8080;

//  ./routes/index 와 연결해준다.
const postsRouter = require("./routes/posts.js")
const connect = require("./schemas");
connect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


//app.use모든 미들웨어에 전역으로 사용할 것이다.
app.use(express.json()); 
app.use("/posts", postsRouter);


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});