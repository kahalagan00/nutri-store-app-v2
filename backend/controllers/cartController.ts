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
    const doc = await Cart.findById(req.params.id);

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
    let doc: any = await Cart.find({ user: req.user.id });

    let statusCode;
    console.log(doc.length);
    if (doc.length > 0) {
      console.log('This user already has a cart. No modification done');
      statusCode = 200;
    } else {
      console.log('No cart detected from this user. Creating one now...');
      doc = await Cart.create({
        userId: req.user.id,
        ...req.body,
      });
      statusCode = 201;
    }

    res.status(statusCode).json({
      status: 'success',
      data: doc,
    });
  } catch (err) {
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
    const doc = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      {
        $inc: { totalPrice: req.body.price * req.body.quantity },
        $push: { cartItems: req.body },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      throw new Error('Current user does not have a cart');
    }

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

export { getAllCarts, getCart, createCart, updateCart };
