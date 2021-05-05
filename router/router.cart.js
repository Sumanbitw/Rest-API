const express = require("express")
const cartModels = require("../model/cart-models")
const router = express.Router()

router.get("/", async ( req,res ) => {
    try {
        const cart = await cartModels.findOne({user:req.user._id});
        res.json(cart)
    } catch ( err ) {
        res.json({ message : err })
    }  
})

router.post("/", async (req,res) => {
    try {
        const savedCart = await cartModels.findOneAndUpdate(
            { user:req.user._id },
            { itemsInCart:req.body.itemsInCart },
            null,
            async function ( err , result ) {
                if(!result) {
                    const cart = new cartModels({
                        user:req.user._id,
                        itemsInCart:req.body.itemsInCart,
                    })
                    try {
                        const savedCart = await cart.save()
                        res.json(savedCart)
                    } catch( err)  {
                        res.status(400).json({ message : err })
                    }
                }
            }
        );
        res.send(savedCart)
    } catch (err) {
        res.status(400).json({ message:err })
}
})

module.exports = router