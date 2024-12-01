const express = require("express");
const router = express.Router();
const {getCartItem,cartAddItem,cartDeleteItem,cartUpdatItem,bulkRemoveItem} = require("../controllers/cartAPI")
const authenticate = require("../middleware/authenticate")

// URL Route => /cart
router.get('/',(req,res)=>res.send("cart api is working"))

router.get('/getCartItem',getCartItem);
router.post('/addItem',cartAddItem);
router.delete('/removeItem',cartDeleteItem);
router.post("/bulkRemoveItem", bulkRemoveItem);
router.put('/updateItem',cartUpdatItem);


module.exports=router;