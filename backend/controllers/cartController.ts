import { RequestHandler } from 'express';
import Cart from '../models/cartModel';
import Product from '../models/productModel';

const getAllCarts: RequestHandler = async (req, res) => {
  try {
    const doc = await Cart.find();
    if (!doc) {
      res.status(404).json({
        status: 'fail',
        message: 'No documents found!',
      });
      return;
    }

    console.log('Yay (getAllCarts) we got Requested 🥳');

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
    return;
  } catch (err: unknown) {
    res.status(500).json({
      status: 'error',
      message:
        err instanceof Error
          ? err.message
          : 'An error occured when fetching all carts',
    });
    return;
  }
};

const getCart: RequestHandler = async (req, res) => {
  try {
    const doc = await Cart.findOne({ userId: req.user?._id });

    console.log('Yay (getCart) we got Requested 🥳');

    res.status(200).json({
      status: 'success',
      data: doc,
    });
    return;
  } catch (err: unknown) {
    res.status(500).json({
      status: 'error',
      message:
        err instanceof Error
          ? err.message
          : 'An unknown error occurred when fetching cart',
    });
    return;
  }
};

const createCart: RequestHandler = async (req, res, next) => {
  try {
    // Check if there is a cart that already belongs to the current user
    // console.log(req.user);
    let doc: any = await Cart.find({ userId: req.user?._id });

    let statusCode = 200;
    // console.log(doc.length);

    if (doc.length > 0) {
      console.log('This user already has a cart. No modification done');
      statusCode = 200;
    } else {
      console.log('No cart detected from this user. Creating one now...');
      doc = await Cart.create({
        userId: req.user?._id,
        ...req.body,
      });
      statusCode = 201;
    }

    res.status(statusCode).json({
      status: 'success',
      data: doc,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'error',
      message:
        err instanceof Error
          ? err.message
          : 'Please fill out all required fields for the cart',
    });
  }

  return;
};

const updateCart: RequestHandler = async (req, res, next) => {
  try {
    const doc = await Cart.findOne({ userId: req.user?._id });

    if (!doc) {
      throw new Error('Cart not found');
    }

    // Modify the document
    doc.totalPrice += req.body.price * req.body.quantity;

    const isProductInCart = doc.cartItems.some(
      (item) => item.productId.toString() === req.body.productId
    );

    // If the item is already in the cart then just increase the quantity
    if (isProductInCart) {
      doc.cartItems = doc.cartItems.map((item) =>
        item.name === req.body.name
          ? { ...item, quantity: item.quantity + req.body.quantity }
          : item
      );
    } else {
      // console.log('It just pushes...');
      doc.cartItems.push(req.body);
    }

    // Save the updated document
    await doc.save();

    console.log('Yay (updateCart) we got Requested 🥳');

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message:
        err instanceof Error
          ? err.message
          : 'Please fill out all required fields for updating the cart',
    });
  }
};

const deleteCart: RequestHandler = async (req, res) => {
  try {
    const doc = await Cart.findByIdAndDelete(req.params.id);

    console.log('Warning (deleteCart) got Requested 🗑️');

    res.status(204).json({
      status: 'success',
      data: doc,
    });
    return;
  } catch (err: unknown) {
    res.status(404).json({
      status: 'error',
      message: err instanceof Error ? err.message : 'Resource not found',
    });
    return;
  }
};

const clearCart: RequestHandler = async (req, res) => {
  try {
    const doc = await Cart.findOne({ userId: req.user?._id });

    if (!doc) {
      throw new Error('Cart not found');
    }

    console.log('Warning (clearCart) got Requested 🛒❌');

    for (const item of doc.cartItems) {
      const productDoc = await Product.findByIdAndUpdate(item.productId);

      if (!productDoc) {
        throw new Error('Product not found');
      }

      const updatedStockQuantity = productDoc.stockQuantity - item.quantity;
      productDoc.stockQuantity = updatedStockQuantity;

      if (updatedStockQuantity <= 0) {
        productDoc.availability = false;
      }

      await productDoc.save();
    }

    doc.cartItems = [];
    doc.totalPrice = 0;

    // Save the updated document
    await doc.save();

    res.status(200).json({
      status: 'success',
      data: doc,
    });
    return;
  } catch (err: unknown) {
    res.status(404).json({
      status: 'error',
      message: err instanceof Error ? err.message : 'Resource not found',
    });
    return;
  }
};

export { getAllCarts, getCart, createCart, updateCart, deleteCart, clearCart };
