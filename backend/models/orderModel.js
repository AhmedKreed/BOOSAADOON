import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    pickOrDelivery: {
      type: String,
      required: true,
      enum: ["توصيل", "استلام من المطعم"],
    },
    meals: [
      {
        meal: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    fullPrice: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      default: "الطلب ينتظر",
      enum: ["يتم تحضير الطلب", "الطلب جاهز", "يتم توصيل الطلب", "الطلب ينتظر"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
