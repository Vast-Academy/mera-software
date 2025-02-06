  import React, { useState, useEffect } from 'react';
  import { BsCalendar3 } from 'react-icons/bs';
  import { IoBarChartSharp } from 'react-icons/io5';
  import { BsChatDots } from 'react-icons/bs';
  import SummaryApi from '../common';
  import { Link, useNavigate } from 'react-router-dom';
  import { toast } from 'react-toastify';
  import TriangleMazeLoader from '../components/TriangleMazeLoader';
  import { useLoading } from '../context/LoadingContext';

  const OrderPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { setIsNavigating } = useLoading();

    const handleOrderClick = (orderId) => {
      setIsNavigating(true);  // Show loader
      navigate(`/project-details/${orderId}`);
    };

    useEffect(() => {
      fetchOrders();
      // Set up polling for updates every 3 seconds
      const interval = setInterval(fetchOrders, 3000);
      return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
      try {
        const response = await fetch(SummaryApi.ordersList.url, {
          method: SummaryApi.ordersList.method,
          credentials: 'include',
        });
        const data = await response.json();
        
        if (data.success) {
          setOrders(data.data);
        } else {
          toast.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };

    const formatTime = (date) => {
      return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };

    const isWebsiteService = (category = '') => {
      return ['static_websites', 'standard_websites', 'dynamic_websites'].includes(category?.toLowerCase());
    };

    const MessagesSection = ({ messages }) => {
      if (!messages || messages.length === 0) return null;

      return (
        
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center space-x-2 mb-3">
            <BsChatDots className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">Project Updates</h3>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg ${
                  msg.sender === 'admin' 
                    ? 'bg-blue-50 ml-4'
                    : 'bg-gray-50'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {formatTime(msg.timestamp)} - {formatDate(msg.timestamp)}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {msg.sender}
                  </span>
                </div>
                {/* Show edit history if exists */}
                {msg.editHistory && msg.editHistory.length > 0 && (
                  <div className="mt-2 pl-3 border-l-2 border-gray-200">
                    {msg.editHistory.map((edit, editIndex) => (
                      <div key={editIndex} className="mt-1 text-sm text-gray-600">
                        <p>{edit.message}</p>
                        <span className="text-xs text-gray-400">
                          Edited on {formatDate(edit.editedAt)} {formatTime(edit.editedAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    };

    const CheckpointsProgress = ({ checkpoints }) => {
      if (!checkpoints || checkpoints.length === 0) return null;

      return (
        <div className="mt-6 space-y-2">
          <h3 className="font-medium text-sm text-gray-700">Project Milestones</h3>
          <div className="space-y-2">
            {checkpoints.map((checkpoint) => (
              <div 
                key={checkpoint.checkpointId}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <span className="text-sm">{checkpoint.name}</span>
                {checkpoint.completed ? (
                  <span className="text-green-600 text-sm">✓ Complete</span>
                ) : (
                  <span className="text-gray-400 text-sm">Pending</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="container mx-auto p-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
          
          {loading ? (
              <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="  rounded-lg p-8">
                <TriangleMazeLoader />
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No orders found</p>
              <Link to="/" className="text-blue-500 hover:text-blue-600">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleOrderClick(order._id)} >
                  <div className="bg-gray-50 p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-semibold">
                          {order.productId?.serviceName}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.productId?.category?.split('_').join(' ')}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        Order #{order._id.slice(-6)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {isWebsiteService(order.productId?.category) ? (
                      <div className="space-y-6">
                        {order.projectProgress === 0 ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-700 text-center font-medium">
                              Congratulations! Your website project has been initiated successfully.
                            </p>
                          </div>
                        ) : (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-blue-700 text-center font-medium">
                              Your project is in progress. Check updates below.
                            </p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex items-center space-x-3">
                            <BsCalendar3 className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm text-gray-500">Project Start</p>
                              <p className="font-medium">{formatDate(order.createdAt)}</p>
                              <p className="text-sm text-gray-500">{formatTime(order.createdAt)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <IoBarChartSharp className="h-5 w-5 text-blue-500" />
                            <div className="flex-1">
                              <p className="text-sm text-gray-500">Project Progress</p>
                              <div className="mt-2">
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                  <div 
                                    className="h-2 bg-blue-500 rounded-full transition-all duration-1000" 
                                    style={{ width: `${order.projectProgress}%` }}
                                  />
                                </div>
                                <p className="text-sm font-medium mt-1">{order.projectProgress}% Complete</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Show Checkpoints Progress */}
                        <CheckpointsProgress checkpoints={order.checkpoints} />

                        {/* Show Messages */}
                        <MessagesSection messages={order.messages} />
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-500">Ordered on {formatDate(order.createdAt)}</p>
                          <div className="flex flex-col mt-2 gap-1">
                            <p className="font-medium">
                              Quantity: {order.quantity}
                            </p>
                            <p className="font-medium text-red-600">
                              Total: ₹{order.price}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full capitalize">
                          {order.status}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default OrderPage;