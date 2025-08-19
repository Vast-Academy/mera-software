const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")


async function updateProductController (req,res){
    try {

        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }

        const { _id, ...resBody } = req.body

        // Allow updating isHidden field if present
        const updateData = { ...resBody }
        if (typeof resBody.isHidden !== 'undefined') {
            updateData.isHidden = resBody.isHidden
        }

        const updateProduct = await productModel.findByIdAndUpdate(_id, updateData, { new: true })

        res.json({
            message : "Product Updated Successfully",
            success : true,
            error : false,
            data : updateProduct
        })
        
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateProductController
