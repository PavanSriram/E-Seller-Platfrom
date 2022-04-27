const router = require('express').Router();
const mongoose = require("mongoose");

const Cart = mongoose.model('Cart',require('../schemas/cart.js'), 'cart');

router.route("/:id").get((request,response) => {
    let id = request.params.id;
    Cart.findById(id,(error,cart) => {
        console.log(cart);
        response.json(cart);
    });
});

// router.route("/").get((request,response) => {
//     Cart.find((error,cart) => {
//         if(error){
//             console.log(error);
//         }
//         else{
//             response.json(cart);
//         }
//     });
// });

// add a category to the database
router.route("/addtocart").post((req,res) => {
    const cartItem = new Cart(req.body);
    cartItem.save()
    .then((_user) => {
        res.status(200).json({'cartItem': 'cartItem added successfully'});
    })
    .catch((_error) => {
        res.status(400).send('adding new cartItem failed');
    })
});

module.exports = router;