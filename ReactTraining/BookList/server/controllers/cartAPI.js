const Cart = require("../models/cartSchmea")

const getCartItem = async (req, res) => {
  try {
    const userId = req?.user?.id; // From the authenticate middleware (req.user is populated)
    const cart = await Cart.findOne({ userId });

    console.log(cart,"cart");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
  
    res.status(200).json(cart.cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while getting cart items" });
  }
};

// **Add Item to Cart**
const cartAddItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, bookName, coverImageUrl, price, quantity } = req.body;

    console.log("ALL is WELL");

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the user doesn't have a cart yet, create a new one
      const newCart = new Cart({
        userId,
        cartItems: [{ bookId, bookName, coverImageUrl, price, quantity }],
      });
      await newCart.save();
      return res.status(201).json({ message: "Item added to cart" });
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cart.cartItems.findIndex(
      (item) => item.bookId === bookId
    );

    if (existingItemIndex !== -1) {
      // If the item exists, update its quantity
      cart.cartItems[existingItemIndex].quantity += quantity;
    } else {
      // If the item doesn't exist, add it to the cart
      cart.cartItems.push({ bookId, bookName, coverImageUrl, price, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding item to cart" });
  }
};

// **Remove Item from Cart**
const cartDeleteItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const updatedCartItems = cart.cartItems.filter(
      (item) => item.bookId !== bookId
    );

    cart.cartItems = updatedCartItems;
    await cart.save();

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while removing item from cart" });
  }
};

// **Update Item in Cart**
const cartUpdatItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.cartItems.findIndex(
      (item) => item.bookId === bookId
    );

    if (itemIndex !== -1) {
      // Update the item's quantity
      cart.cartItems[itemIndex].quantity = quantity;

      // Ensure quantity is at least 1
      if (cart.cartItems[itemIndex].quantity < 1) {
        cart.cartItems[itemIndex].quantity = 1;
      }

      await cart.save();
      res.status(200).json({ message: "Item quantity updated" });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating item in cart" });
  }
};

const bulkRemoveItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookIds } = req.body; //array of bookids

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filtering out all the items with the given bookIds
    cart.cartItems = cart.cartItems.filter(
      (item) => !bookIds.includes(item.bookId)
    );
 
    await cart.save();
    res.status(200).json({ message: "Items removed from cart" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while removing items from cart" });
  }
};

module.exports = {
  getCartItem,
  cartAddItem,
  cartDeleteItem,
  cartUpdatItem,
  bulkRemoveItem,
};