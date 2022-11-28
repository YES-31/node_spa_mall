const express = require('express');
const app = express();
const port = 3000;
//routes 폴더안에 goods.js를 에서 라우터를 반환 받음
const goodsRouter = require('./routes/goods.js');
const cartsRouter = require("./routes/carts.js")

const connect = require("./schemas");
connect();

//req.body를 사용하기 위해서 필수로 적어야 하는 문법이다.
//app.use ==> 전역으로 영향력..?
app.use(express.json());

app.post("/", (req,res)=>{
  console.log(req.body);

  res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다.")
})


//다른 폴더에서 받은 라우터 등록하는 명령어 , 미들웨어 동작을 위해 '/' 아래 작성.
app.use(express.json());
app.use("/api", [goodsRouter, cartsRouter]);


app.get("/", (req,res)=>{
  console.log(req.query);

  const obj = {
    "keykey" : "value 입니다.",
    "이름입니다." : "이름일까요?",

  }

  
  res.json(obj)

})


// app.get("/api/goods", (req,res)=>{

//   res.status(200).send(":api/goods로 정상 연결되었습니다.")
// })


// app.get("/:id", (req,res)=>{
//   console.log(req.params);

//   res.send(":id URI에 정상적으로 반환되었습니다.")

// })

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });






app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});