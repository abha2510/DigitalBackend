const express = require("express");
const { CartModel } = require("../Model/Cart.Model");
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  let cart = await CartModel.find();
  res.send(cart);
});

cartRouter.post("/add", async (req, res) => {
  try {
    let data = req.body;
    let cartItem = await CartModel(data);
    await cartItem.save();
    res.send({ msg: "Data saved successfully", sucess: 0 });
  } catch (error) {
    console.log(error.message);
    res.send({ msg: "Error saving", sucess: 1 });
  }
});

cartRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await CartModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Product has been removed from cart" });
  } catch (err) {
    res.send({ msg: "Product not removed from cart" });
  }
});

module.exports = { cartRouter };
