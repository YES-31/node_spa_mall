const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Posts, sequelize, Likes } = require('../models')






//localhost:8080/posts일때


//게시글 작성.
router.post("/", async (req, res) => {

    const { title, content } = req.body;




    try {

        if (!title || !content) {

            res.status(412).json({ errorMessge: "데이터 형식이 올바르지 않습니다." })
        }

        if (title.length < 5) {
            res.status(412).json({ errorMessage: "게시글 제목의 형식이 올바르지 않습니다." })
        }
        if (content.length < 5) {
            res.status(412).json({ errorMessage: "게시글 내용의 형식이 올바르지 않습니다." })
        }



        some = res.locals.user

        await Posts.create({
            nickname: some.nickname, userId: some.userId, title, content

        })


        res.status(200).json({ messge: "게시글 작성에 성공하였습니다." })



    } catch (err) {
        console.log(err)
        res.status(400).json({ errorMessage: "게시글 작성에 실패하였습니다." })

    }


})





//게시글 조회
router.get("/", async (req, res) => {

    try {
        
        const some = await Posts.findAll({ 
            attributes: [
                'postId',
                'userId',
                'nickname',
                'title',
                'createdAt',
                'updatedAt',

                [sequelize.fn('COUNT', sequelize.col('Likes.postId')), 'likes'],

            ],
            
            include:[
                {model: Likes, as:"Likes", attributes :[]},
                
            ],
            group: 'postId',
            
        
        });
        
    


        res.status(200).json({ "data": some })

    } catch (err) {
        console.log(err)
        res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다." })
    }

})



//좋아요 게시글 조회
router.get("/like", async (req, res) => {
    some = res.locals.user
    try{
        
        
        const test = await Likes.findAll({
            where: { userId: some.userId },
            attributes: { exclude: ['state'] }
              
        });
        
        if(!test){
            res.status(404).json({errorMessge: "게시글이 존재하지 않습니다."})
        }
        
        res.status(200).json({"data": test})


    }catch (err){
        console.log(err)
        res.status(400).json({ errorMessage: "좋아요 게시글 조회에 실패하였습니다." })
    }

    

})






//게시글 좋아요
router.put("/:postId/like", async (req, res) => {
    some = res.locals.user
    const { postId } = req.params;

    //해당 게시글이 존재하는지 확인.
    const somefind = await Posts.findOne({
        where: { postId }
    });

    if (!somefind) {
        res.status(400).json({ errorMessge: "게시글이 존재하지 않습니다." })
    }

    
    try {


        //게시글에 해당하는 좋아요가 있는지 확인
        const test = await Likes.findOne({
            where: {
                [Op.and]: [
                    { postId },
                    { userId: some.userId }
                ]
            }

        });

        if(!test){
            Likes.create({postId,  userId: some.userId })
            res.status(200).json({messge: "게시글의 좋아요를 등록하였습니다."})
        }else{
            Likes.destroy({ where: { postId,  userId: some.userId } })
            res.status(200).json({messge: "게시글의 좋아요를 취소하였습니다."})

        }

    } catch (err) {
        console.log(err)
        res.status(400).json({ errorMessge: "게시글 좋아요에 실패하였습니다." })
    }


})













//게시글 상세조회
router.get("/:postId", async (req, res) => {

    const num = req.params;


    try {

        const somefind = await Posts.findOne({
            where: { 'postId': num.postId }
        });


        res.status(200).json({ "data": somefind })


    } catch (err) {
        res.status(400).json({ errorMessage: "게시글 조회에 실패하였습니다." })
    }

})





//게시글 수정
router.put("/:postId", async (req, res) => {
    const { title, content } = req.body;
    const num = req.params;

    try {
        if (!title || !content) {
            res.status(412).json({ errorMessge: "데이터 형식이 올바르지 않습니다." })
        }

        if (title.length < 5) {
            res.status(412).json({ errorMessge: "게시글 제목의 형식이 일치하지 않습니다." })
        }

        if (content.length < 5) {
            res.status(412).json({ errorMessge: "게시글 내용의 형식이 일치하지 않습니다." })
        }


        try {

            const somefind = await Posts.findOne({
                where: { 'postId': num.postId }
            });

            //현재 사용자에 대한 정보와 비교
            some = res.locals.user
            if (somefind.userId !== some.userId) { // 게시글 작성자가 아니라면 수정x
                res.status(412).json({ errorMessge: "게시글 수정이 정상적으로 수정되지 않았습니다." })
            }

            //수정
            await Posts.update({ title, content }, { where: { postId: num.postId } });


            res.status(200).json({ messge: "게시글을 수정하였습니다." })
        } catch (err) {
            console.log(err)
            res.status(412).json({ errorMessge: "게시글 수정이 정상적으로 수정되지 않았습니다." })
        }

    } catch (err) {
        console.log(err)
        res.status(412).json({ errorMessge: "게시글 수정에 실패하였습니다." })
    }



})






//게시글 삭제
router.delete("/:postId", async (req, res) => {
    const num = req.params;


    try {

        const somefind = await Posts.findOne({
            where: { 'postId': num.postId }
        });

        if (!somefind) {
            res.status(404).json({ errorMessge: "게시글이 존재하지 않습니다." })
        }

        //현재 사용자에 대한 정보와 비교
        some = res.locals.user
        if (somefind.userId !== some.userId) { // 게시글 작성자가 아니라면 삭제x
            res.status(412).json({ errorMessge: "게시글이 정상적으로 삭제되지 않았습니다." })
        }

        try {

            await Posts.destroy({
                where: { postId: num.postId },
            });


            res.status(200).json({ Messge: "게시글이 삭제 하였습니다." })
        } catch (err) {
            console.log(err)
            res.status(401).json({ errorMessge: "게시글이 정상적으로 삭제되지 않았습니다." })
        }

    } catch {

        res.status(401).json({ errorMessge: "게시글 삭제에 실패하였습니다." })

    }

})











module.exports = router;