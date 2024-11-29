const express = require("express");
const router = express.Router();
const {getCartItem,cartAddItem,cartDeleteItem,cartUpdatItem} = require("../controllers/cartAPI")

// URL Route => /cart
router.get('/',(req,res)=>res.send("cart api is working"))

router.get('/getCartItem',getCartItem);
router.post('/addItem',cartAddItem);
router.delete('/removeItem',cartDeleteItem);
router.put('/updateItem',cartUpdatItem);

module.exports=router;