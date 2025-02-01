import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
// import { IoIosCode } from "react-icons/io";
import { Link } from 'react-router-dom'
// import addToCart from '../helpers/addToCart'
// import Context from '../context'

const VerticalCardProduct = ({category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(8).fill(null)
    const scrollElement = useRef()
    // const { fetchUserAddToCart } = useContext(Context)

    const colorStyles = {
        'static_websites': {
            bg: "bg-white",
            border: "border-emerald-100",
            text: "text-emerald-950",
            textSecondary: "text-emerald-600",
            icon: "text-emerald-600",
            tagBg: "bg-white text-emerald-600 border-emerald-100",
            gradient: "bg-white"
        },
        'standard_websites': {
            bg: "bg-white",
            border: "border-indigo-100",
            text: "text-cyan-950",
            textSecondary: "text-blue-600",
            icon: "text-blue-600",
            tagBg: "bg-white text-blue-600 border-indigo-100",
            gradient: "bg-white"
        },
        'dynamic_websites': {
            bg: "bg-white",
            border: "border-amber-100",
            text: "text-purple-1000",
            textSecondary: "text-indigo-800",
            icon: "text-indigo-800",
            tagBg: "bg-white text-indigo-800 border-indigo-100",
            gradient: "bg-white"
        }
    }

    const getColorStyle = (productCategory) => {
        return colorStyles[productCategory] || colorStyles.standard_websites
    }

    // const handleAddToCart = async (e, id) => {
    //     e.preventDefault()
    //     await addToCart(e, id)
    //     fetchUserAddToCart() 
    // }

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

    const techStacks = {
        'static_websites': ['HTML5', 'CSS3', 'JS'],
        'standard_websites': ['JS', 'Node.js', 'Express.js'],
        'dynamic_websites': ['React.js', 'Tailwind CSS', 'Node.js', 'MongoDB']
    }

    return (
        <div className='container mx-auto px-4 my-1 mb-6 relative'>
            <h2 className='text-2xl font-semibold py-3'>{heading}</h2>

            <div className='flex items-center gap-4 lg:gap-6 rounded-xl overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
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
                    data.map((product) => {
                        const style = getColorStyle(product?.category)
                        return (
                            <div key={product?._id} className={`bg-gradient-to-br ${style.bg} rounded-xl shadow-lg border ${style.border}
                                w-full min-w-[320px] max-w-[320px] 
                                lg:min-w-[250px] lg:max-w-[250px]`}>
                                
                                {/* Mobile Layout (Horizontal) */}
                                <div className="lg:hidden">
                                    <div className="flex gap-3 p-3">
                                        <Link to={`product/${product?._id}`} className="relative w-28 flex-shrink-0">
                                            <div className={`rounded-lg overflow-hidden bg-gradient-to-r ${style.gradient}`}>
                                                <img 
                                                    src={product?.serviceImage[0]} 
                                                    alt={product?.serviceName}
                                                    className="w-full h-full object-cover opacity-90"
                                                />
                                            </div>
                                        </Link>
                                        
                                        <div className="flex-1">
                                            <Link to={`product/${product?._id}`}>
                                                <h3 className={`${style.text} font-bold text-base mb-0.5 line-clamp-1`}>
                                                    {product?.serviceName}
                                                </h3>
                                            </Link>

                                            <div className=" mb-3">
                                            <span className={`text-xs capitalize line-clamp-1 ${style.textSecondary}`}>{product?.packageIncludes?.[0]}</span>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {techStacks[product?.category]?.map((tech) => (
                                                    <span key={tech} className={`text-xs font-medium ${style.tagBg} px-1.5 py-0.5 rounded-md shadow-sm border`}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            <div className={`pt-2 border-t ${style.border}`}>
                                                <p className={`text-base font-bold ${style.text}`}>
                                                    {displayINRCurrency(product?.sellingPrice)}
                                                    <span className={`text-xs font-normal ${style.icon} ml-1`}>onwards</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Layout (Vertical) */}
                                <div className="hidden lg:block">
                                    <Link to={`product/${product?._id}`} className="block">
                                        <div className={`h-40 rounded-t-xl overflow-hidden bg-gradient-to-r ${style.gradient} p-4`}>
                                            <img 
                                                src={product?.serviceImage[0]} 
                                                alt={product?.serviceName}
                                                className="w-full h-full object-cover object-top opacity-90 hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    </Link>
                                    
                                    <div className="p-4">
                                        <Link to={`product/${product?._id}`}>
                                            <h3 className={`${style.text} font-bold text-base mb-2 line-clamp-1`}>
                                                {product?.serviceName}
                                            </h3>
                                        </Link>
                                        
                                        <div className=" mb-3">
                                            <span className={`text-xs capitalize line-clamp-1 ${style.textSecondary}`}>Suitable For: {product?.perfectFor?.join(', ')}</span>
                                            </div>
                                        
                                        <div className="flex flex-wrap gap-1 mb-2">
                                                {techStacks[product?.category]?.map((tech) => (
                                                    <span key={tech} className={`text-xs font-medium ${style.tagBg} px-1.5 py-0.5 rounded-md shadow-sm border`}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        
                                        <div className={`pt-3 border-t ${style.border}`}>
                                            <p className={`text-base font-bold ${style.text}`}>
                                                {displayINRCurrency(product?.sellingPrice)}
                                                <span className={`text-xs font-normal ${style.icon} ml-1`}>onwards</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default VerticalCardProduct