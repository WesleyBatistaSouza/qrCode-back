import { Router } from "express";
import {
  getPositionByCodigo,
  getProducts,
  limitedProducts,
  productPosition,
} from "../controllers/estoque.controller.js";

const router = Router();

router.get("/products", limitedProducts);
router.get("/products/codigo/:codigo/position", getPositionByCodigo);
router.get("/products/position/:position", productPosition);
router.get("/products/:id", getProducts);

export default router;
