import { RequestHandler } from 'express';
import Product from '../models/productModel';

const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const doc = await Product.find();
    if (!doc) {
      res.status(404).json({
        status: 'fail',
        message: 'No documents found!',
      });
      return;
    }

    console.log('Yay (getAllProducts) we got Requested 🥳');

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
          : 'An error occured when fetching all products',
    });
    return;
  }
};

const getProduct: RequestHandler = async (req, res) => {
  try {
    const doc = await Product.findById(req.params.id);

    console.log('Yay (getProduct) we got Requested 🥳');

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
          : 'An unknown error occurred when fetching product',
    });
    return;
  }
};

const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const doc = await Product.create(req.body);

    console.log('Yay (createProduct) we got Requested 🥳');

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message:
        err instanceof Error
          ? err.message
          : 'Please fill out all required fields for the product',
    });
  }
};

export { getAllProducts, getProduct, createProduct };
