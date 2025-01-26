import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { IoIosCode } from "react-icons/io";
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(8).fill(null)
    const scrollElement = useRef()
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        e.preventDefault() // Prevent navigation when clicking add to cart
        await addToCart(e, id)
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

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

    // Static tech stack since it's not in your data
    const techStack = ['HTML5', 'CSS3', 'JS']

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 lg:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 hidden md:block' onClick={scrollLeft}>
                    <FaAngleLeft/>
                </button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 hidden md:block' onClick={scrollRight}>
                    <FaAngleRight/>
                </button>

                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl shadow-lg border border-indigo-100 
                            w-full min-w-[280px] max-w-[280px] 
                            lg:min-w-[250px] lg:max-w-[250px]">
                            {/* Mobile Loading (Horizontal) */}
                            <div className="lg:hidden flex gap-3 p-3">
                                <div className="w-28 aspect-[3/4] rounded-lg bg-slate-200 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 bg-slate-200 rounded animate-pulse" />
                                    <div className="h-4 bg-slate-200 rounded animate-pulse w-2/3" />
                                    <div className="flex gap-1 flex-wrap">
                                        {[1, 2, 3].map((n) => (
                                            <div key={n} className="h-5 w-14 bg-slate-200 rounded animate-pulse" />
                                        ))}
                                    </div>
                                    <div className="h-6 bg-slate-200 rounded animate-pulse" />
                                </div>
                            </div>
                            
                            {/* Desktop Loading (Vertical) */}
                            <div className="hidden lg:block">
                                <div className="h-48 bg-slate-200 animate-pulse" />
                                <div className="p-4 space-y-2">
                                    <div className="h-5 bg-slate-200 rounded animate-pulse" />
                                    <div className="h-4 bg-slate-200 rounded animate-pulse w-2/3" />
                                    <div className="flex gap-1 flex-wrap">
                                        {[1, 2, 3].map((n) => (
                                            <div key={n} className="h-5 w-14 bg-slate-200 rounded animate-pulse" />
                                        ))}
                                    </div>
                                    <div className="h-6 bg-slate-200 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <div key={product?._id} className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl shadow-lg border border-indigo-100
                            w-full min-w-[280px] max-w-[280px] 
                            lg:min-w-[250px] lg:max-w-[250px]">
                            
                            {/* Mobile Layout (Horizontal) */}
                            <div className="lg:hidden">
                                <div className="flex gap-3 p-3">
                                    <Link to={`product/${product?._id}`} className="relative w-28 flex-shrink-0">
                                        <div className=" rounded-lg overflow-hidden bg-gradient-to-r from-indigo-100 to-purple-100">
                                            <img 
                                                src={product?.serviceImage[0]} 
                                                alt={product?.serviceName}
                                                className="w-full h-full object-cover opacity-90"
                                            />
                                        </div>
                                    </Link>
                                    
                                    <div className="flex-1">
                                        <Link to={`product/${product?._id}`}>
                                            <h3 className="text-indigo-950 font-bold text-base mb-0.5 line-clamp-1">
                                                {product?.serviceName}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <IoIosCode className="w-3.5 h-3.5 text-indigo-600" />
                                            <span className="text-xs text-indigo-800">
                                                {product?.category || 'Static Website Development'}
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {techStack.map((tech) => (
                                                <span key={tech} className="text-xs font-medium bg-white text-indigo-700 px-1.5 py-0.5 rounded-md shadow-sm border border-indigo-100">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        <div className="pt-2 border-t border-indigo-100">
                                            <p className="text-base font-bold text-indigo-950">
                                                {displayINRCurrency(product?.sellingPrice)}
                                                <span className="text-xs font-normal text-indigo-600 ml-1">onwards</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Layout (Vertical) */}
                            <div className="hidden lg:block">
                                <Link to={`product/${product?._id}`} className="block">
                                    <div className=" h-40 rounded-t-xl overflow-hidden bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
                                        <img 
                                            src={product?.serviceImage[0]} 
                                            alt={product?.serviceName}
                                            className="w-full h-full object-cover object-top opacity-90 hover:scale-105 transition-transform"
                                        />
                                    </div>
                                </Link>
                                
                                <div className="p-4">
                                    <Link to={`product/${product?._id}`}>
                                        <h3 className="text-indigo-950 font-bold text-base mb-2 line-clamp-1">
                                            {product?.serviceName}
                                        </h3>
                                    </Link>
                                    
                                    <div className="flex items-center gap-1.5 mb-3">
                                        <IoIosCode className="w-3.5 h-3.5 text-indigo-600" />
                                        <span className="text-xs text-indigo-800">
                                            {product?.category || 'Static Website Development'}
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {techStack.map((tech) => (
                                            <span key={tech} className="text-xs font-medium bg-white text-indigo-700 px-1.5 py-0.5 rounded-md shadow-sm border border-indigo-100">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="pt-3 border-t border-indigo-100">
                                        <p className="text-base font-bold text-indigo-950">
                                            {displayINRCurrency(product?.sellingPrice)}
                                            <span className="text-xs font-normal text-indigo-600 ml-1">onwards</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default VerticalCardProduct