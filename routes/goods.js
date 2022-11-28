const express = require("express");
const router = express.Router();


// /routes/goods.js
const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
  ];


router.get("/goods", (req,res)=>{
    res.status(200).json({"goods": goods})


});


router.get("/goods/:goodsId", (req,res) => {
    const { goodsId } = req.params;
    
    // let result = null;
    // for(const good of goods){
    //     if( Number(goodsId) === good.goodsId){
    //         result = good;
    //     }

    // }


    //52~ 58번째 줄과 동일한 기능을 한다.
    const [result] = goods.filter((good) => good.goodsId === Number(goodsId))

    res.status(200).json({detail : result});
});

const Cart = require("../schemas/cart.js")
router.post("/goods/:goodsId/cart", async(req,res)=>{
    const {goodsId} = req.params;
    const {quantity} = req.body;

    const existCarts = await Cart.find({goodsId});
    if(existCarts.length){
        return res.status(400).json({succes:false,
            errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다.",
        })
    }

    await Cart.create({goodsId, quantity});

    res.json({result: "success"});
})


//장바구니에 넣는 API
router.put("/goods/:goodsId/cart", async(req,res)=>{
  const {goodsId} = req.params;
  const {quantity} = req.body;

  const existCarts = await Cart.find({goodsId});
  if(existCarts.length){
    await Cart.updateOne (
      {goodsId: goodsId},
      {$set: {quantity:quantity}} 
      )

  }
  res.status(200).json({succes:true});

})


//장바구니에서 삭제하는 API작성
router.delete("/goods/:goodsId/cart", async(req, res)=> {
  const {goodsId} = req.params;

  const existsCarts = await Cart.find({goodsId});
  if(existsCarts.length){
    await Cart.deleteOne({goodsId});

  }

  res.json({result:"success"});
})





const Goods = require("../schemas/goods.js");
router.post("/goods/", async (req,res)=>{
    const {goodsId, name, thumbnailUrl, category, price } = req.body;

    const goods = await Goods.find({goodsId});

    if( goods.length){ //중복되는 값이 있다면 
        return res.status(400).json({
            success: false,
            errorMessage: "이미 존재하는 GoodsId입니다."
        })

    }

    const createsdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price});

  
    res.json({goods: createsdGoods});
})


//라우터 값을 밖으로 내보내주는 명령어.
module.exports = router;