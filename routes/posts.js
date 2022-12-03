const express = require("express");
const router = express.Router();

const pppp = require("../schemas/post.js");



//localhost:8080//posts일때
//게시글 작성

router.post("/", async (req, res) => {
   
    try{
        const { user, password, title, content, createdAt } = req.body;
    
        if(user === 0 || title === 0 || content === 0 || password === 0){  //게시글이 있는지 확인.
            return res.json({messge: "데이터 형식이 올바르지 않습니다."})
        }


        await pppp.create({ user, password, title, content, createdAt });
        res.json({ message: "게시글을 생성하였습니다." });

        

    }catch{
        return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });

    }
       
     
});


// 게시글 조회 GET
router.get("/", async (req,res)=>{
    
        const posts = await pppp.find({});
        const result = posts.map((post)=> {
            return{
                "postId": post._id,
                "user": post.user,
                "title": post.title,
                "createdAt": post.createdAt


            }

        });
        res.status(200).json({"data": result});



})



// 게시글 상세 조회
router.get("/:postId", async (req,res)=>{
    const { postId } = req.params;
    
    try{
        const some = await pppp.findOne({"_id": postId})
        if(!some){
            res.status(400).json({messge: "데이터 형식이 올바르지 않습니다. / 게시글 상세 조회"})
        }
        
        res.status(200).json({
            "data": {
                "postId": some._id,
                "password": some.password,
                "user": some.user,
                "title": some.title,
                "content": some.content,
                "createdAt": some.createdAt
            }


        })

    }catch{
        res.status(400).json({messge: "데이터 형식이 올바르지 않습니다. / 게시글 상세 조회"})

    }
    

})




// 게시글 수정
router.put("/:postId", async (req, res) => {
    const { postId } = req.params;
    
    try{// 사용자의 게시글 확인
        const some = await pppp.findOne({ "_id" : postId});
        if(!some){
            res.status(400).json({messge: "데이터 형식이 올바르지 않습니다. / 게시글 수정 오류"})
        }

    }catch{
        res.status(400).json({messge: "데이터 형식이 올바르지 않습니다. / 게시글 수정 오류"})

    }


    try{//main code 부분
        const { password, title, content } = req.body;
        const some = await pppp.findOne({ "_id" : postId});

        if (password !== some.password || title.length === 0 || content.length === 0) {
            return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        }


        await pppp.updateOne(
            { "_id" : postId},
            {$set: {
                title : title,
                content : content
            }
        });


        res.status(200).json({ "message": "게시글을 수정하였습니다." });


    }catch{
        res.status(400).json({messge: "데이터 형식이 올바르지 않습니다. / 게시글 수정 오류"})

    }


 
});




//게시글 삭제
router.delete("/:postId", async (req, res) => {
    const { postId } = req.params;
         
    try{// 사용자의 게시글 확인
        const some = await pppp.findOne({ "_id" : postId});
        if(!some){
            res.status(400).json({messge: "게시글 조회에 실패하였습니다. / 게시글 삭제 오류"})
        }

    }catch{
        res.status(400).json({messge: "게시글 조회에 실패하였습니다. / 게시글 삭제 오류"})

    }



    try{//main code
        const { password } = req.body;
        const some = await pppp.findOne({ "_id" : postId});
        

        if (password !== some.password) { //비밀번호 일치 검사
            return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
        }


        await pppp.deleteOne({ "_id": postId});
        res.json({ "message": "게시글을 삭제하였습니다." });  


    }catch{

        return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });

    }



})



module.exports = router;