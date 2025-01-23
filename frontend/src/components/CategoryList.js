import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct,setCategoryProduct] = useState([])
    const [loading,setLoading] = useState(false)

    const categoryLoading = new Array(3).fill(null)

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])
  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-3 overflow-scroll scrollbar-none'>   
            {
                loading ? (
                        categoryLoading.map((el,index)=>{
                            return(
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                                </div>
                            )
                        })
                    
                ):
                (
                    categoryProduct.map((product,index)=>{
                    return(
                        <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
                            <div className='flex flex-col mb-4'>
                            <div className="bg-white p-4 rounded-lg w-28 shadow-md flex-1 flex flex-col items-center">
                             <div className="w-8 h-8 bg-gray-100 rounded-full mb-2"></div>
                            <span className="text-sm text-gray-600">{product?.category.split('_').join(' ')}</span>
                             </div>
                        </div>
                        </Link>
                    )
                })
                )
               
            }
        </div>
    </div>
  )
}

export default CategoryList
