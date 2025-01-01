const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/productModel");
const router = express.Router();

// Cấu hình Multer để lưu trữ tạm thời các tệp trong bộ nhớ
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Kiểm tra trùng lặp sản phẩm
const checkDuplicate = async (name, brand, category) => {
  try {
    const existingProduct = await Product.findOne({ name, brand, category });
    return existingProduct; // Nếu có sản phẩm trùng, sẽ trả về sản phẩm đó
  } catch (err) {
    throw new Error("Lỗi kiểm tra trùng lặp");
  }
};

// Route thêm sản phẩm mới với hình ảnh lên Cloudinary
router.post("/products", upload.array("images", 20), async (req, res) => {
  const {
    name,
    category,
    brand,
    description,
    originalPrice,
    discountPercentage,
    priceAfterDiscount,
    discountCode,
  } = req.body;

  try {
    // Kiểm tra trùng lặp sản phẩm
    const duplicateProduct = await checkDuplicate(name, brand, category);
    if (duplicateProduct) {
      return res.status(400).json({ message: "Sản phẩm này đã tồn tại." });
    }

    // Upload tất cả các hình ảnh lên Cloudinary
    const imageUploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(file.buffer);
      });
    });

    const uploadResults = await Promise.all(imageUploadPromises);
    const images = uploadResults.map((result) => result.secure_url);

    // Tạo mới sản phẩm và lưu vào database
    const newProduct = new Product({
      name,
      category,
      brand,
      description,
      originalPrice,
      discountPercentage,
      priceAfterDiscount,
      discountCode,
      images,
    });

    await newProduct.save();

    // Trả về thông báo thành công
    res.status(201).json({
      message: "Sản phẩm đã được thêm thành công",
      product: newProduct,
    });
  } catch (err) {
    console.error("Lỗi khi upload hình ảnh hoặc lưu sản phẩm:", err);
    res.status(500).json({ message: "Có lỗi xảy ra khi thêm sản phẩm" });
  }
});

// Route lấy danh sách sản phẩm (có phân trang và bộ lọc)
router.get("/products", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      minPrice,
      maxPrice,
      sortPrice, // Thêm tham số sortPrice để điều chỉnh thứ tự sắp xếp giá
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
      ...(category && { category: category }), // Lọc theo danh mục
      ...(minPrice &&
        !isNaN(minPrice) && {
          priceAfterDiscount: { $gte: Number(minPrice) }, // Lọc theo giá từ
        }),
      ...(maxPrice &&
        !isNaN(maxPrice) && {
          priceAfterDiscount: { $lte: Number(maxPrice) }, // Lọc theo giá đến
        }),
    };

    // Xác định phương thức sắp xếp giá
    let sortQuery = {};
    if (sortPrice === "asc") {
      sortQuery = { priceAfterDiscount: 1 }; // Thứ tự tăng dần
    } else if (sortPrice === "desc") {
      sortQuery = { priceAfterDiscount: -1 }; // Thứ tự giảm dần
    }

    // Lấy danh sách sản phẩm theo phân trang, bộ lọc và sắp xếp
    const products = await Product.find(query)
      .sort(sortQuery) // Sắp xếp theo giá
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
    console.error("Lỗi khi lấy danh sách sản phẩm:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm." });
  }
});



// Route xóa sản phẩm
router.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  // Kiểm tra nếu ID không hợp lệ
  if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "ID sản phẩm không hợp lệ." });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }

    res
      .status(200)
      .json({ message: "Sản phẩm đã được xóa.", product: deletedProduct });
  } catch (err) {
    console.error("Lỗi khi xóa sản phẩm:", err);
    res.status(500).json({ message: "Có lỗi xảy ra khi xóa sản phẩm." });
  }
});

// Route sửa sản phẩm (PUT)
router.put("/products/:id", upload.array("images", 20), async (req, res) => {
  const productId = req.params.id;

  // Kiểm tra nếu ID không hợp lệ
  if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "ID sản phẩm không hợp lệ." });
  }

  try {
    const {
      name,
      category,
      brand,
      description,
      originalPrice,
      discountPercentage,
      priceAfterDiscount,
      discountCode,
    } = req.body;

    const updatedProductData = {
      name,
      category,
      brand,
      description,
      originalPrice,
      discountPercentage,
      priceAfterDiscount,
      discountCode,
    };

    // Nếu có tệp hình ảnh mới, upload lên Cloudinary
    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(file.buffer);
        });
      });

      const uploadResults = await Promise.all(imageUploadPromises);
      updatedProductData.images = uploadResults.map(
        (result) => result.secure_url
      );
    }

    // Cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }

    res
      .status(200)
      .json({ message: "Sản phẩm đã được cập nhật.", product: updatedProduct });
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi cập nhật sản phẩm." });
  }
});

module.exports = router;
