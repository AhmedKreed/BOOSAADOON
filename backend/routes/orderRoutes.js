import express from "express";
import {
  createOrder,
  getOrders,
  orderStatus,
  deleteOrder,
  getOrder,
} from "../controllers/orderControllers.js";

const router = express.Router();

router.route("/").get(getOrders).post(createOrder);
router.route("/:id").put(orderStatus).delete(deleteOrder).get(getOrder);

export default router;
