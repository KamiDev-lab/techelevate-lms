import express from "express";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";
import {
  checkWebhookStatus,
  createCheckoutSession,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
// router.route("/webhook").post(express.raw({ type: "application/json" }), stripeWebhook);
router.route("/webhook").get(checkWebhookStatus);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailWithPurchaseStatus);
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;
