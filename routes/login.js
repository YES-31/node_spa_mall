const express = require("express");
const router = express.Router();

const { Users } = require('../models');
const { application } = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "/config/.env" })



//const decodedValue = jwt.decode(token);



//localhost:8080/login
//로그인기능
router.post("/", async (req,res)=>{
    

    try{
        const {nickname, password }  = req.body;        

     
        const some = await Users.findOne({
            where: { 'nickname' : nickname }
        });

        const decodedValue = jwt.decode(some.password);
     
        if(!some || decodedValue.password !== password){
            res.status(412).json({errorMessage: "닉네임 또는 패스워드를 확인해주세요."})
        }
        
    

        //로그인 완료 -> 쿠키설정

        const token = jwt.sign(some.nickname, process.env.TEST_KEY);
        res.status(200).cookie("token", token).json({token})
       


    }catch (err){
        res.status(400).json({errorMessage: "로그인에 실패하였습니다."})
    }
    

})

function createAccessToken(nickname) {
    const accessToken = jwt.sign(
      { 'nickname': nickname }, // JWT 데이터
      process.env.TEST_KEY, // 비밀키
      { expiresIn: '10s' }) // Access Token이 10초 뒤에 만료되도록 설정합니다.
  
    return accessToken;
  }




module.exports = router;