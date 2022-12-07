const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Comments } = require('../models')
const { Posts } = require('../models')


//localhost:8080/comments

//댓글 생성
router.post("/:postId", async (req, res) => {
    const { comment } = req.body;
    const { postId } = req.params


    try {

        if (!comment || comment.length < 5) {

            res.status(412).json({ errorMessge: "데이터 형식이 올바르지 않습니다." })
        }


        //게시글이 있는지 확인
        const postfind = await Posts.findOne({
            where: { postId }
        });

        if (!postfind) {
            res.status(400).json({ errorMessge: "댓글 작성에 실패하였습니다." });
        }


        //댓글 작성
        some = res.locals.user
        await Comments.create({
            nickname: some.nickname, userId: some.userId, comment, postId

        })


        res.status(200).json({ messge: "댓글을 작성하였습니다." })
    } catch {

        res.status(400).json({ errorMessge: "댓글 작성에 실패하였습니다." })
    }



})





// 댓글 목록 조회

router.get("/:postId", async (req, res) => {
    const { postId } = req.params

    try {

        const some = await Comments.findAll({
            attributes: { exclude: ['postId'] },
            where: { 'postId': postId }

        });


        res.status(200).json({ "data": some })


    } catch (err) {
        res.status(400).json({ errorMessge: "댓글 조회에 실패하였습니다." })
    }

})



//댓글 수정
router.put("/:commentId", async (req, res) => {
    const someBody = req.body;
    some = res.locals.user;
    const { commentId } = req.params;
    
    

    //body값 존재 확인
    if (!someBody) {
        res.status(412).json({ errorMessge: "데이터 형식이 올바르지 않습니다" })
    }
    
    const someComments = await Comments.findOne({
        where: { 'commentId': commentId }

    });
    

    //댓글이 없다면~
    if (!someComments) {
        res.status(404).json({ errorMessge: "댓글이 존재하지 않습니다." })
    }

    
    try {
        
        

        if(some.userId !== someComments.userId ){
            res.status(400).json({ errorMessge: "사용자가 달라 수정 불가능합니다." })
        }
       
        await Comments.update({ comment: someBody.comment }, { where: { 'commentId': commentId } });
       
        res.status(200).json({ messge: "댓글을 수정하였습니다." })
        
    } catch (err) {
        console.log(err)
        res.status(400).json({ errorMessge: "댓글 수정에 실패하였습니다." })
    }

})




//댓글 삭제
router.delete("/:commentId", async (req,res)=> {
    const commentId = req.params.commentId;
    some = res.locals.user;
    

    const someComments = await Comments.findOne({where: {commentId}})
    if(!someComments){
        res.status(404).json({errorMessge: "댓글이 존재하지 않습니다."})
    }

    try{
        if(some.userId !== someComments.userId ){
            res.status(400).json({ errorMessge: "댓글 삭제가 정상적으로 처리되지 않았습니다." })
        }

        await Comments.destroy({
            where: {commentId},
        });


        res.status(200).json({messgs: "댓글을 삭제하였습니다."})
    }catch{
        res.status(400).json({errorMessgs: "댓글 삭제에 실패하였습니다."})

    }


})












module.exports = router;