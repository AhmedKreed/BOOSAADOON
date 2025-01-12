import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create an order
// @route   POST /api/order
// @access  Public
export const createOrder = asyncHandler(async (req, res) => {
  const { name, pickOrDelivery, meals, message, fullPrice, phone } = req.body;
  const order = await Order.create({
    name,
    pickOrDelivery,
    meals,
    message,
    fullPrice,
    phone,
  });

  if (order) {
    res
      .status(201)
      .json({ message: "تمت عملية الطلب بنجاح", id: order._id.toHexString() });
  } else {
    res.status(400);
    throw new Error("خطأ في ادخال البيانات");
  }
});

// @desc    Get orders
// @route   GET /api/order
// @access  Private
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  if (orders.length > 0) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("لا يوجد اي طلبات");
  }
});

// @desc    Order status
// @route   PUT /api/order/:id
// @access  Private
export const orderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(id, { status });

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("الطلبية غير موجودة");
  }
});

// @desc    Delete order
// @route   DELETE /api/order/:id
// @access  Private
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findByIdAndDelete(id, { status });

  if (order) {
    res.json({ message: "تم حذف الطلب بنجاح" });
  } else {
    res.status(404);
    throw new Error("الطلبية غير موجودة");
  }
});

// @desc    Get order
// @route   GET /api/order/:id
// @access  Private
export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("الطلب غير موجود");
  }
});
