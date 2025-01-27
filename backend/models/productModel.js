const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    serviceName : String,
    category : String,
    packageIncludes: [String], 
    perfectFor : [String],
    serviceImage : [],
    price : Number,
    sellingPrice : Number,
    description : String,
    websiteTypeDescription : String,  
},{
    timestamps: true
})

const productModel = mongoose.model("product",productSchema)

module.exports = productModel