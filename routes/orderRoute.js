import express from "express";
import { tokenRequire } from "../middlewares/authMiddleware.js";
import {
  createOrderController,
  deleteOrderController,
  getAllOrdersController,
  getOrderController,
  updateOrderController,
  searchOrderController,
} from "../controllers/orderController.js";
const router = express.Router();

//place order details
router.post("/create-order", tokenRequire, createOrderController);
//get order details
router.get("/get-order/:id", tokenRequire, getOrderController);
// for admin requiring
router.get("/get-allorder", tokenRequire, getAllOrdersController);
router.delete("/delete-order/:id", tokenRequire, deleteOrderController);
router.put("/update-orderstatus/:id", tokenRequire, updateOrderController);
router.get("/search-order/:value", tokenRequire, searchOrderController);
export default router;
