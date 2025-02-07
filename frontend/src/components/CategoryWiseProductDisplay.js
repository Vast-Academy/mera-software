import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategoryWiseProductDisplay = ({category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(3).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e,id) => {
        await addToCart(e,id)
        fetchUserAddToCart() 
    }

    const fetchData = async() => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='container mx-auto px-4 py-8'>
            <h2 className='text-2xl font-semibold mb-6'>{heading}</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={`loading-${index}`} className='bg-white border border-gray-200 rounded'>
                            <div className='h-48 bg-gray-100 animate-pulse'></div>
                            <div className='p-4 space-y-3'>
                                <div className='h-4 bg-gray-100 rounded animate-pulse'></div>
                                <div className='h-4 w-2/3 bg-gray-100 rounded animate-pulse'></div>
                                <div className='h-4 w-1/2 bg-gray-100 rounded animate-pulse'></div>
                                <div className='h-8 bg-gray-100 rounded animate-pulse'></div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <div key={product._id} className='bg-white border border-gray-200 rounded overflow-hidden'>
                            <Link to={"/product/"+product?._id} onClick={scrollTop}>
                                <div className='h-48 bg-gray-50 p-4'>
                                    <img 
                                        src={product?.serviceImage[0]} 
                                        className='w-full h-full object-contain mix-blend-multiply'
                                        alt={product?.serviceName}
                                    />
                                </div>
                                <div className='p-4'>
                                    <h3 className='text-lg font-medium mb-2 line-clamp-1'>
                                        {product?.serviceName}
                                    </h3>
                                    <p className='text-gray-600 text-sm mb-3'>
                                        {product?.category}
                                    </p>
                                    <div className='flex items-center gap-2 mb-4'>
                                        <span className='text-red-600 font-semibold'>
                                            {displayINRCurrency(product?.sellingPrice)}
                                        </span>
                                        <span className='text-gray-400 text-sm line-through'>
                                            {displayINRCurrency(product?.price)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <div className='px-4 pb-4'>
                                <button 
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                    className='w-full py-2 bg-red-600 text-white text-sm rounded'
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay