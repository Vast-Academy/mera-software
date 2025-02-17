import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TriangleMazeLoader from '../components/TriangleMazeLoader';
import CookieManager from '../utils/cookieManager';
// import {loadStripe} from '@stripe/stripe-js'

const Cart = () => {
    const navigate = useNavigate();
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)
    const [paymentLoading, setPaymentLoading] = useState(false);

    const fetchData = async()=>{
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
        })
        

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
    }

    const handleLoading = async () => {
        try {
            setLoading(true);
            await fetchData();
        } catch (error) {
            console.error("Error loading cart:", error);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        handleLoading();
    }, [])

    const increaseQty = async(id,qty)=>{
        try {
            setLoading(true)
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {
                    _id : id,
                    quantity : qty + 1
                }
            )
        })

        const responseData = await response.json()
        if(responseData.success){
            fetchData()
        }

    } catch (error) {
        console.error("Error updating quantity:", error);
    } finally {
        setLoading(false);  // Action complete होने पर loading हटा दें
    }
 }

    const descreaseQty = async(id,qty)=>{
        if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {
                        _id : id,
                        quantity : qty - 1
                    }
                )
            })
    
            const responseData = await response.json()
    
            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        try {
            setLoading(true)
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {
                    _id : id,
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    } catch (error) {
        console.error("Error deleting product:", error);
    } finally {
        setLoading(false);
    }
    }

    const handlePayment = async () => {
        try {
            setPaymentLoading(true); 
          // First check if user has sufficient balance
          if (context.walletBalance < totalPrice) {
            toast.error("Insufficient wallet balance!");
            return;
          }

          CookieManager.setCartItems(data);
      
          // Deduct from wallet
          const deductResponse = await fetch(SummaryApi.wallet.deduct.url, {
            method: SummaryApi.wallet.deduct.method,
            credentials: 'include',
            headers: {
              "content-type": 'application/json'
            },
            body: JSON.stringify({
              amount: totalPrice
            })
          });
      
          const deductData = await deductResponse.json();
      
          if (deductData.success) {
            // Create orders for each item
            for (const item of data) {
              const orderResponse = await fetch(SummaryApi.createOrder.url, {
                method: SummaryApi.createOrder.method,
                credentials: 'include',
                headers: {
                  "content-type": 'application/json'
                },
                body: JSON.stringify({
                  productId: item.productId._id,
                  quantity: item.quantity,
                  price: item.productId.sellingPrice
                })
              });
    
              const orderData = await orderResponse.json();
              if (!orderData.success) {
                throw new Error('Failed to create order');
              }
            }
    
            // Update context and clear cart
            context.fetchWalletBalance();
            await Promise.all(data.map(item => deleteCartProduct(item._id)));
            
            // Go to success page
            navigate('/success');
          } else {
            toast.error(deductData.message || "Payment failed!");
          }
        } catch (error) {
          console.error("Payment error:", error);
          toast.error("Payment failed!");
        }
        finally {
            setPaymentLoading(false); // Stop payment loading
        }
    };

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve,curr)=>preve + (curr.quantity * curr?.productId?.sellingPrice), 0)
  return (
    <div className='container mx-auto'>
        {/* Add payment loading overlay */}
        {paymentLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
                    <div className="rounded-lg p-8  flex flex-col items-center">
                        <TriangleMazeLoader />
                        <p className="text-center mt-4 text-gray-600">Processing Payment...</p>
                    </div>
                </div>
            )}

         {/* Loading overlay - सबसे पहले check करें */}
         {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
                    <div className="rounded-lg p-8">
                        <TriangleMazeLoader />
                    </div>
                </div>
            )}

        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your Cart is Empty!</p>
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              Continue Shopping
            </Link>
          </div>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/* View Product */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingCart.map((el,index) =>{
                            return (
                                <div key={el+"Add To Cart Loading"+index} className='w-full h-32 bg-slate-200 my-2 border border-slate-300 animate-pulse rounded'>

                            </div>
                            )
                        })
                       
                    ) : (
                       data.map((product,index)=>{
                       return (
                        <div key={product?._id+"Add To Cart Loading"} className='w-full h-32 bg-white my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                            <div className='w-32 h-32 bg-slate-200'>
                                <img src={product?.productId?.serviceImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                            </div>
                            <div className='px-4 py-2 relative'>
                                    {/* delete product */}
                                <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                <MdDelete/>
                                </div>

                                <h2 className='text-lg lg:text-xl text-ellipis line-clamp-1'>{product?.productId?.servicetName}</h2>
                                <p className='capitalize text-slate-400 '>{product?.productId?.category}</p>
                                <div className='flex items-center justify-between'>
                                    <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                    <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                </div>
                                <div className='flex items-center gap-3 mt-1'>
                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>descreaseQty(product?._id,product?.quantity)}>-</button>
                                <span>{product?.quantity}</span>
                                <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                </div>
                            </div>
                        </div>
                       )
                       })
                    )
                }
            </div>

            {/* Summary*/}
            {
                data[0] && (
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
            {
                loading ? (
                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                    
                     </div>
                ) : (
                    <div className='h-36 bg-white'>
                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                        <p>Quantity</p>
                        <p>{totalQty}</p>
                    </div>

                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                    <p>Total Price</p>
                    <p>{displayINRCurrency (totalPrice)}</p>
                    </div>

                     <button 
                className={`bg-blue-600 p-2 text-white w-full mt-2 ${paymentLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
                onClick={handlePayment}
                disabled={paymentLoading}
            >
                {paymentLoading ? 'Processing...' : 'Payment'}
            </button>
                 </div>
                )
            }
                    </div>
                )
            }
           
            

        </div>
    </div>
  )
}

export default Cart
