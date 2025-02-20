import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'
import { toast } from 'react-toastify'
import { FaTrash } from 'react-icons/fa'

const AllOrder = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deletingOrderId, setDeletingOrderId] = useState(null)

    const fetchOrderDetails = async() => {
      setLoading(true)
      try {
        const response = await fetch(SummaryApi.allOrder.url, {
          method: SummaryApi.allOrder.method,
          credentials: 'include'
        })
    
        const responseData = await response.json()
    
        if (responseData.success) {
          setData(responseData.data)
        } else {
          toast.error(responseData.message || 'Failed to fetch orders')
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
        toast.error("Something went wrong while fetching orders")
      } finally {
        setLoading(false)
      }
    }

    const handleDeleteOrder = async (orderId) => {
      if (window.confirm('Are you sure you want to delete this order? The amount will be refunded to user\'s wallet.')) {
        setDeleteLoading(true)
        setDeletingOrderId(orderId)
        
        try {
          const response = await fetch(`${SummaryApi.deleteOrder.url}/${orderId}`, {
            method: SummaryApi.deleteOrder.method,
            credentials: 'include'
          })
          
          const responseData = await response.json()
          
          if (responseData.success) {
            toast.success(responseData.message || 'Order deleted and refunded successfully')
            // Remove the deleted order from state
            setData(data.filter(order => order._id !== orderId))
          } else {
            toast.error(responseData.message || 'Failed to delete order')
          }
        } catch (error) {
          console.error("Error deleting order:", error)
          toast.error("Something went wrong while deleting the order")
        } finally {
          setDeleteLoading(false)
          setDeletingOrderId(null)
        }
      }
    }
  
    useEffect(() => {
      fetchOrderDetails()
    }, [])
  
    return (
      <div className='h-[calc(100vh-190px)] overflow-y-scroll'>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : !data[0] ? (
          <p className="text-center py-8 text-gray-500">No Orders available</p>
        ) : (
          <div className='p-4 w-full'>
            {data.map((item, index) => (
              <div key={item.userId+index} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                  <button
                    onClick={() => handleDeleteOrder(item._id)}
                    disabled={deleteLoading && deletingOrderId === item._id}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${
                      deleteLoading && deletingOrderId === item._id
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {deleteLoading && deletingOrderId === item._id ? (
                      <span className="h-4 w-4 border-2 border-t-transparent border-red-700 rounded-full animate-spin"></span>
                    ) : (
                      <FaTrash size={14} />
                    )}
                    <span>{deleteLoading && deletingOrderId === item._id ? 'Deleting...' : 'Delete & Refund'}</span>
                  </button>
                </div>
                
                <div className='border rounded p-2'>
                  {/* Rest of your existing order display code */}
                  <div className='flex flex-col lg:flex-row justify-between'>
                    {/* Product details section */}
                    <div className='grid gap-1'>
                      {item?.productDetails.map((product, index) => (
                        <div key={product.productId+index} className='flex gap-3 bg-slate-100'>
                          <img 
                            src={product.image[0]}
                            className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                            alt={product.name}
                          />
                          <div>
                            <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                            <div className='flex items-center gap-5 mt-1'>
                              <div className='text-lg text-red-500'>{displayINRCurrency(product.price)}</div>
                              <p>Quantity: {product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Payment and shipping details */}
                    <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                      <div>
                        <div className='text-lg font-medium'>Payment Details:</div>
                        <p className='ml-1'>Payment method: {item.paymentDetails.payment_method_type[0]}</p>
                        <p className='ml-1'>Payment Status: {item.paymentDetails.payment_status}</p>
                      </div>
                      <div>
                        <div className='text-lg font-medium'>Shipping Details:</div>
                        {item.shipping_options.map((shipping, index) => (
                          <div key={shipping.shipping_rate} className='ml-1'>
                            Shipping Amount: {shipping.shipping_amount}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='font-semibold ml-auto w-fit lg:text-lg'>
                    Total Amount: {displayINRCurrency(item.totalAmount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
}

export default AllOrder