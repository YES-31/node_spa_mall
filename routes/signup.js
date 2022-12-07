const express = require("express");
const router = express.Router();
const { Users } = require('../models')
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "/config/.env" })

//key값 복호화하기.
//const decodedValue = jwt.decode(token);



//localhost:8080/signup
//회원가입
router.post("/", async (req, res) => {


    try {
        const { nickname, password, confirm } = req.body;


        if (password !== confirm) {
            res.status(412).json({ errorMessage: "패스워드가 일치하지 않습니다." })
        }
        // 등등 예외처리 하기.



        //nickname 이미 있는지 검증
        const existsUsers = await Users.findOne({
            where: { 'nickname' : nickname }
        });
        
        console.log(existsUsers)
        
        if (existsUsers) {
            res.status(400).send({
                errorMessage: "중복된 닉네임입니다.",
            });
            return;
        }






        //비밀번호 토큰하기
        const token = jwt.sign({ password }, process.env.TEST_KEY);


        //회원 가입하기
        const dataUser = await Users.create({
            nickname, password: token

        })

        console.log(dataUser);
        res.status(200).json({ data: dataUser })

    } catch (err) {
        res.status(400).json({ errorMessage: "요청한 데이터 형식이 올바르지 않습니다." })
    }


})


module.exports = router;