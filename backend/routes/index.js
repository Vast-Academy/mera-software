const express = require('express')

const router = express.Router()
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
const DeleteBannerController = require('../controller/ads/deleteBanner')
const DeleteCategoryController = require('../controller/product/deleteCategory')
const addWalletBalanceController = require('../controller/admin/addWalletBalanceController')
const getWalletBalanceController = require('../controller/admin/getWalletBalanceController')
const deductWalletController = require('../controller/admin/deductWalletController ')
const updateUserProfileController = require('../controller/user/updateUserProfileController')
const uploadDeveloperController = require('../controller/admin/uploadDeveloper')
const getAllDevelopersController = require('../controller/admin/getDeveloper')
const createOrder = require('../controller/order/createOrder')
const getUserOrders = require('../controller/order/getUserOrder')
const getOrderDetails = require('../controller/order/getOrderDetails')
const getProjectsController = require('../controller/admin/getProjectController')
const updateProgressController = require('../controller/admin/updateProgressController')
const sendMessageController = require('../controller/admin/sendMessageController')
const getWalletHistoryController = require('../controller/admin/getWalletHistoryController')
const getCompatibleFeaturesController = require('../controller/product/getCompatibleFeatures')
const getGuestSlidesController = require('../controller/welcomeBanner/getGuestSlidesController')
const uploadGuestSlidesController = require('../controller/welcomeBanner/uploadGuestSlidesController')
const getUserWelcomeController = require('../controller/welcomeBanner/getUserWelcomeController')
const uploadUserWelcomeController = require('../controller/welcomeBanner/uploadUserWelcomeController')
const adminDeleteOrderController = require('../controller/admin/deleteOrderController')
const validateUpdatePlan = require('../controller/order/validateUpdatePlan')
const toggleUpdatePlan = require('../controller/order/toggleUpdatePlan')
const editDeveloperController = require('../controller/admin/editDeveloperController')
const updateGuestSlidesController = require('../controller/welcomeBanner/updateGuestSlidesController')
const updateUserWelcomeController = require('../controller/welcomeBanner/updateUserWelcomeController')
const deleteUserWelcomeController = require('../controller/welcomeBanner/deleteUserWelcomeController')
const deleteGuestSlidesController = require('../controller/welcomeBanner/deleteGuestSlidesController')
const updatePlanProgressController = require('../controller/admin/updatePlanProgressController')
const adminUpdatePlansController = require('../controller/admin/adminUpdatePlansController')
const assignDeveloperController = require('../controller/admin/assignDeveloperController')
const getSingleDeveloperController = require('../controller/admin/getSingleDeveloperController')
const getUserUpdatePlans = require('../controller/user/getUserUpdatePlans');
const submitUpdateRequest = require('../controller/user/submitUpdateRequest');
const getUserUpdateRequests = require('../controller/user/getUserUpdateRequests');
const getAllUpdateRequests = require('../controller/admin/getAllUpdateRequests');
const assignUpdateRequestDeveloper = require('../controller/admin/assignUpdateRequestDeveloper');
const sendUpdateRequestMessage = require('../controller/admin/sendUpdateRequestMessage');
const completeUpdateRequest = require('../controller/admin/completeUpdateRequest');
const rejectUpdateRequest = require('../controller/admin/rejectUpdateRequest');
const getAssignedUpdates = require('../controller/developer/getAssignedUpdates');
const sendUpdateMessage = require('../controller/developer/sendUpdateMessage');
const addDeveloperNote = require('../controller/developer/addDeveloperNote');
const completeUpdate = require('../controller/developer/completeUpdate');

const ensureDirectoryExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)){
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Get userId from auth middleware
    const userId = req.userId;
    // Get planId from request body
    const planId = req.body.planId;
    
    if (!userId || !planId) {
      return cb(new Error('User ID or Plan ID missing'));
    }
    
    const uploadDir = path.join(__dirname, '../uploads/updates', userId.toString(), planId.toString());
    
    ensureDirectoryExists(uploadDir);
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueFilename = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    cb(null, uniqueFilename);
  }
});

// File filter function
const fileFilter = function(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.txt' || ext === '.rtf') {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, TXT, RTF files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
    files: 10 // Max 10 files per request
  }
});


// user
router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)
router.post("/update-profile", authToken, updateUserProfileController)
router.get("/user-update-plans", authToken, getUserUpdatePlans)
router.post("/user-request-update", authToken, upload.any(), submitUpdateRequest)
router.get("/get-update-requests", authToken, getUserUpdateRequests)

//admin panel
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)
router.post("/wallet/add-balance", authToken, addWalletBalanceController)
router.get("/wallet/balance", authToken, getWalletBalanceController)
router.post("/wallet/deduct", authToken, deductWalletController);
router.get("/wallet/history", authToken, getWalletHistoryController)
router.post("/upload-developer", authToken, uploadDeveloperController)
router.get("/get-developer", getAllDevelopersController)
router.post("/edit-developer/:id", authToken, editDeveloperController)
router.get("/get-projects", authToken, getProjectsController)
router.post("/update-project-progress", authToken, updateProgressController)
router.get("/get-update-plans", authToken, adminUpdatePlansController)
router.post("/update-plan-progress", authToken, updatePlanProgressController)
router.post("/project-message", authToken, sendMessageController)
router.post("/assign-developer", authToken, assignDeveloperController)
router.get("/get-single-developer/:id", getSingleDeveloperController)
router.get("/get-admin-update-requests", authToken, getAllUpdateRequests)
router.post("/assign-update-developer", authToken, assignUpdateRequestDeveloper)
router.post("/update-request-message", authToken, sendUpdateRequestMessage)
router.post("/complete-update-request", authToken, completeUpdateRequest)
router.post("/reject-update-request", authToken, rejectUpdateRequest)

// developer
router.get("/assigned-updates", authToken, getAssignedUpdates)
router.post("/developer-update-message", authToken, sendUpdateMessage)
router.post("/developer-add-note", authToken, addDeveloperNote)
router.post("/developer-complete-update", authToken, completeUpdate)

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
router.delete("/delete-category", authToken, DeleteCategoryController)
router.get("/compatible-features", getCompatibleFeaturesController)

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

router.post("/create-order", authToken, createOrder)
router.post("/validate-update-plan", authToken, validateUpdatePlan)
router.post("/toggle-update-plan", authToken, toggleUpdatePlan)
router.get("/get-order", authToken, getUserOrders)
router.get("/order-details/:orderId", authToken, getOrderDetails)
router.delete("/delete-order/:orderId", authToken, adminDeleteOrderController)

// ads
router.post("/upload-ad", authToken, UploadAdController)
router.post("/upload-banner", authToken, UploadBannerController)
router.get("/get-banner", getBannersController)
router.post("/update-banner/:id", authToken, updateBannerController)
router.delete("/delete-banner", authToken, DeleteBannerController)

// welcome banner
router.get("/get-guest-slides", getGuestSlidesController)
router.post("/upload-guest-slides", authToken, uploadGuestSlidesController)
router.post("/update-guest-slides/:id", authToken, updateGuestSlidesController)
router.delete("/delete-guest-slides/:id", authToken, deleteGuestSlidesController)

// User Welcome Routes
router.get("/get-user-welcome", getUserWelcomeController)
router.post("/upload-user-welcome", authToken, uploadUserWelcomeController)
router.post("/update-user-welcome/:id", authToken, updateUserWelcomeController)
router.delete("/delete-user-welcome/:id", authToken, deleteUserWelcomeController)

module.exports = router;
