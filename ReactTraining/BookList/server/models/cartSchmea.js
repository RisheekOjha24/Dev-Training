const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, // Store email directly
  items: [
    {
      bookId: { type: String, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
