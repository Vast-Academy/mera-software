import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
// import { GoPlus } from "react-icons/go";

const VerticalCard = ({loading, data = []}) => {
    const loadingList = new Array(8).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart() 
    }
  return (
    <div className='grid grid-cols-1 gap-4 px-2 pb-4'>

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
                <Link key={product._id} to={"/product/"+product?._id} className="bg-white p-3 rounded-lg shadow block">
   <div className="space-y-2.5">
       <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full w-fit">
           MOST POPULAR  
       </div>

       <div className="flex justify-between items-start gap-2">
           <div>
               <h3 className="font-bold text-lg">{product?.serviceName}</h3>
               <p className="text-gray-600 text-sm">{product?.category.split('_').join(' ')}</p>
           </div>
           <button className="shrink-0 border border-blue-500 text-blue-500 px-3 py-1 rounded-lg text-sm">
               ADD +
           </button>
       </div>

       <ul className="space-y-1.5 text-gray-600 text-sm">
           {/* Static bullet points if no details */}
           {(!product?.details ? [
               "3 Pages",
               "SEO Configuration", 
               "Custom Design",
               "1 Month Support"
           ] : product.details).map((detail, idx) => (
               <li key={idx} className="flex items-center gap-2">
                   <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                   {detail}
               </li>
           ))}
       </ul>

       <div className="flex items-baseline gap-2">
           <span className="text-lg">₹</span>
           <span className="text-2xl font-bold">{(product?.sellingPrice || 15999).toLocaleString()}</span>
           <div className="ml-1 flex items-center gap-2">
               <span className="text-gray-400 text-sm line-through">₹{(product?.price || 34000).toLocaleString()}</span>
               <span className="text-green-600 text-sm">25% OFF</span>
           </div>
       </div>
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
