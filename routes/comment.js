const express = require("express");
const router = express.Router();

const pppp = require("../schemas/post.js");
const cccc = require("../schemas/comment.js");


//localhost:3000/index/comments 일때
router.get("/", (req,res) =>{
    
    res.send("comment 연결 완료!");
})


//댓글 생성  //localhost:3000/index/comment/:~~~~ POST
router.post("/:postId", async (req,res)=>{
    const { postId } = req.params;
   
    try{// 사용자의 게시글 확인
        const some = await pppp.findOne({ "_id" : postId});

        if(!some){
            res.status(400).json({messge: "게시글 조회에 실패하였습니다. / 게시글 삭제 오류"})
        }

    }catch{
        res.status(400).json({messge: "게시글 조회에 실패하였습니다. / 게시글 삭제 오류"})
    }


    try{ //main CODE
        const { user, password,  content } = req.body;
        
        if(user === 0 || content === 0 || password === 0){  //body값이 있는지 체크
            return res.json({messge: "데이터 형식이 올바르지 않습니다."})
        }
        
        //시간 설정해주는 기능 필요
        createdAt = "11-22-33"

        await cccc.create({ user, content, password, postId, createdAt })
        
        res.status(200).json({messge: "댓글을 생성하였습니다."})



    }catch{
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });

    }


})



//댓글 목록 조회 GET
router.get("/:postId", async (req,res)=>{
    const { postId } = req.params;

    try{//postId 게시글에 해당하는 댓글이 있는지 확인
        const asdf = await cccc.findOne({ postId});

        if(!asdf){
            res.status(400).json({messge: "게시글 조회에 실패하였습니다. / 게시글 목록 조회"})
        }

    }catch{
        res.status(400).json({messge: "게시글 조회에 실패하였습니다. / 게시글 목록 조회"})
    }






    try{
        const some = await cccc.find({ postId })
        const result = some.map((com)=> {
            return{
                "commedntId": com._id,
                "user": com.user,
                "content": com.content,
                "createdAt": com.createdAt


            }

        });
        res.status(200).json({"data": result});
        




    }catch{

        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다. 댓글 목록조회 err" });
    }






})





//댓글 수정 PUT
router.put("/:commentId", async (req,res)=> {
    const { commentId } = req.params;


    try{//댓글이 있는지 확인
        const asdf = await cccc.findOne({ "_id": commentId});

        if(!asdf){
            res.status(400).json({messge: "데이터 형식이 올바르지 않습니다."})
        }

    }catch{
        res.status(400).json({messge: "댓글 조회에 실패하였습니다."})
    }


      
    try{
   
        const {password, content} = req.body;
        const some = await cccc.findOne({ "_id" : commentId });
        
        if(password !== some.password || content.length === 0){
            res.status(400).json({messge: "댓글 내용을 입력해주세요."})

        }


        await cccc.updateOne({"_id" : commentId}, {$set: { content: content }});
        res.status(200).json({ message: "게시글을 수정하였습니다." });


    }catch{
        res.status(400).json({messge: "데이터 형식이 올바르지 않습니다."})

    }
    



})



//댓글 삭제 DELETE
router.delete("/:commentId", async (req, res)=> {
    const { commentId } = req.params;


    try{//댓글이 있는지 확인
        const asdf = await cccc.findOne({ "_id": commentId});

        if(!asdf){
            res.status(400).json({messge: "댓글 조회에 실패하였습니다."})
        }

    }catch{
        res.status(400).json({messge: "댓글 조회에 실패하였습니다."})
    }


  
    try{

        const {password} = req.body;
        const some = await cccc.findOne({ "_id" : commentId });
  
        if(password !== some.password ){
            res.status(400).json({messge: "데이터 형식이 올바르지 않습니다."})

        }

 
        await cccc.deleteOne({"_id" : commentId});
        res.status(200).json({ message: "댓글을 삭제하였습니다." });


    }catch{
        res.status(400).json({messge: "데이터 형식이 올바르지 않습니다."})

    }





})




//router를 app.js에 전달을 해줘야 하기 때문에 사용.
module.exports = router;