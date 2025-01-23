import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading, data = []}) => {
    const loadingList = new Array(3).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart() 
    }
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>

    {
        loading ? (
            loadingList.map((product,index)=>{
            return(
                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                    <div className='bg-slate-200 h-40 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>

                    </div>
                    <div className='p-4 grid gap-3 w-full'>
                        <h2 className='font-medium text-base md:text-lg text-ellipis line-clamp-1 text-black p-1 animate-pulse rounded-full bg-slate-200 py-2'></h2>
                        <p className='capitalize text-slate-500 py-2 animate-pulse rounded-full bg-slate-200 p-1'></p>
                        <div className='flex gap-3 '>
                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'> </p>
                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                        </div>
                        <button className='text-sm text-white px-3 p-1 animate-pulse rounded-full bg-slate-200 py-2'></button>
                    </div>
                </div>
            )
        })
        ) : (
            data.map((product,index)=>{
            return(
                <Link key={product._id} to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow' onClick={scrollTop}>
                    <div className='bg-slate-200 h-40 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                        <img src={product?.serviceImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                    </div>
                    <div className='p-4 grid gap-3'>
                        <h2 className='font-medium text-base md:text-lg text-ellipis line-clamp-1 text-black'>{product?.serviceName}</h2>
                        <p className='capitalize text-slate-500'>{product?.category.split('_').join(' ')}</p>
                        <div className='flex gap-3'>
                            <p className='text-red-600 font-medium'> {displayINRCurrency(product?.sellingPrice) }</p>
                            <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price)}</p>
                        </div>
                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add To Cart</button>
                    </div>
                </Link>
            )
        })
        )
       
    }
    </div>
  )
}

export default VerticalCard
