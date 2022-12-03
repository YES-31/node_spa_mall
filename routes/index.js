const express = require("express");
const router = express.Router();

const postsRouter = require("./posts.js")
const commentsRouter = require("./comment.js")


router.get('/', (req, res) => {
    res.send('index와 연결되었습니다. comment 또는 posts와 연결해보세요.');

});


//localhost:3000/index/ 뒤에 연결될 router
router.use("/comments", commentsRouter);
router.use("/posts", postsRouter); 


//router를 app.js에 전달을 해줘야 하기 때문에 사용.
module.exports = router;