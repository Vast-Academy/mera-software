import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common';

const ProjectDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${SummaryApi.orderDetails.url}/${orderId}`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setOrder(data.data);
      }
    } catch (error) {
      console.error("Error:", error);
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

  if (loading || !order) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto bg-gray-50 min-h-screen p-4">
      {/* Project Header Card */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
        <h1 className="text-xl font-bold">{order.productId?.serviceName}</h1>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>Type:</span>
            <span>{order.productId?.category?.split('_').join(' ')}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Start Date: {formatDate(order.createdAt)}
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last Update: {formatDate(order.lastUpdated)} {formatTime(order.lastUpdated)}
          </div>
        </div>
      </div>

      {/* Progress Card (Full Width) */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Project Progress</h2>
          <button 
            onClick={() => setShowTimeline(true)}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            View Timeline
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className="text-blue-500"
                strokeWidth="10"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - order.projectProgress / 100)}`}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-2xl font-bold">{order.projectProgress}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {order.projectProgress === 0 
              ? 'Project has been initiated' 
              : order.projectProgress < 100 
                ? 'Your project is in progress'
                : 'Project completed successfully!'
            }
          </p>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="font-bold text-lg mb-4">Recent Updates</h2>
        <div className="space-y-4">
          {order.messages?.map((msg, index) => (
            <div 
              key={index} 
              className="relative pl-4 border-l-4 border-blue-500 last:border-yellow-500"
            >
              <h3 className="font-semibold text-base">{msg.title || 'Project Update'}</h3>
              <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {formatTime(msg.timestamp)}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {msg.checkpoint || 'Planning Phase'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Modal */}
      {showTimeline && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-h-[80vh] overflow-y-auto w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Project Timeline</h3>
              <button 
                onClick={() => setShowTimeline(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {order.checkpoints?.map((checkpoint, index) => (
                <div key={checkpoint.checkpointId} className="relative">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${
                      checkpoint.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <div className="ml-3">
                      <h3 className="font-medium">{checkpoint.name}</h3>
                      <div className="text-sm text-gray-500">
                        {checkpoint.completed ? 'Completed' : 'Pending'}
                      </div>
                    </div>
                  </div>
                  {index < order.checkpoints.length - 1 && (
                    <div className="absolute left-2 ml-[-1px] w-0.5 h-8 bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;