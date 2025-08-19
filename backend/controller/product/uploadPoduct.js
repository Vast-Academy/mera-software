const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req,res){
    try {
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        // Allow setting isHidden field if present
        const productData = { ...req.body }
        if (typeof req.body.isHidden !== 'undefined') {
            productData.isHidden = req.body.isHidden
        }

        const uploadProduct = new productModel(productData)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message : "Product Uploaded Successfully",
            error : false,
            success : true,
            data : saveProduct
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = UploadProductController
