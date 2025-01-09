// controllers/productController.js
const Product = require("../routes/productRoutes");

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      minPrice,
      maxPrice,
    } = req.query;

    // Tạo điều kiện tìm kiếm và bộ lọc
    const query = {
      ...(search && {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }),
      ...(category && { category: category }), // Lọc theo chủng loại
      ...(minPrice &&
        !isNaN(minPrice) && {
          priceAfterDiscount: { $gte: Number(minPrice) }, // Lọc theo giá từ
        }),
      ...(maxPrice &&
        !isNaN(maxPrice) && {
          priceAfterDiscount: { $lte: Number(maxPrice) }, // Lọc theo giá đến
        }),
    };

    // Lấy danh sách sản phẩm theo phân trang và bộ lọc
    const products = await Product.find(query)
      .limit(limit)
      .skip((page - 1) * limit);

    // Tính tổng số sản phẩm để tính số trang
    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.log("Lỗi khi lấy danh sách sản phẩm:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm." });
  }
};

module.exports = {
  getProducts,
};
