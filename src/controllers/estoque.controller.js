import { Products } from "../models/estoque.models.js";

export const limitedProducts = async (req, res) => {
  // Get pagination parameters from query string with defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Validate pagination parameters
  if (page < 1) {
    return res.status(400).json({ message: "Page must be a positive integer" });
  }

  if (limit < 1 || limit > 100) {
    return res.status(400).json({ message: "Limit must be between 1 and 100" });
  }

  try {
    const { count, rows } = await Products.findAndCountAll({
      limit,
      offset,
      order: [["codigo", "ASC"]],
    });
    
    res.json({
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      pageSize: limit,
      data: rows,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
};

export const getProducts = async (req, res) => {
  const { id } = req.params;

  if (!Number.isInteger(Number(id))) {
    return res
      .status(400)
      .json({ message: "ID inválido. Deve ser um número inteiro." });
  }

  try {
    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return res.status(500).json({ message: "Erro ao buscar produto" });
  }
};

export const getPositionByCodigo = async (req, res) => {
  const { codigo } = req.params;

  try {
    const product = await Products.findOne({
      where: { codigo },
    });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    return res.json({
      codigo: product.codigo,
      position: product.posicao,
    });
  } catch (error) {
    console.error("Erro ao buscar posição do produto:", error);
    return res
      .status(500)
      .json({ message: "Erro ao buscar posição do produto" });
  }
};

export const productPosition = async (req, res) => {
  const position = req.params.position;
  try {
    const product = await Products.findOne({
      where: { position },
    });

    if (!product) {
      return res.status(404).json({ message: "Produto sem posição" });
    }

    res.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return res.status(500).json({ message: "Erro ao buscar produto", error });
  }
};
