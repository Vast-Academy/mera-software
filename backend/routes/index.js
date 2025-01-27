const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSignIn")
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadPoduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/paymentController')
const orderController = require('../controller/order/order.controller')
const allOrderController = require('../controller/order/allOrder.controller')
const UploadCategoryController = require('../controller/product/uploadCategory')
const getCategoryController = require('../controller/product/getCategories')
const updateCategoryController = require('../controller/product/updateCategory')
const deleteProductController = require('../controller/product/deleteProduct')
const UploadAdController = require('../controller/ads/uploadAd')
const UploadBannerController = require('../controller/ads/uploadBanner')
const getBannersController = require('../controller/ads/getBanner')
const updateBannerController = require('../controller/ads/updateBanner')


router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)


//admin panel
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

// product
router.post("/upload-product", authToken, UploadProductController )
router.get("/get-product",getProductController)
router.post("/update-product", authToken, updateProductController)
router.delete("/delete-product", authToken, deleteProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)
router.post("/upload-category",authToken, UploadCategoryController)
router.get("/get-categories", getCategoryController)
router.post("/update-category/:id",authToken, updateCategoryController)

//user add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-card-product", authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)

// payment and order
router.post("/checkout",authToken,paymentController)
router.get("/order-list", authToken, orderController)
router.get("/all-order",authToken, allOrderController)

// ads
router.post("/upload-ad", authToken, UploadAdController)
router.post("/upload-banner", authToken, UploadBannerController)
router.get("/get-banner", getBannersController)
router.post("/update-banner/:id", authToken, updateBannerController)

module.exports = router;
