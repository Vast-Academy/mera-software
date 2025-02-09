import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import Context from '../context';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';
import TriangleMazeLoader from '../components/TriangleMazeLoader'; // Make sure to import the loader

const WalletDetails = () => {
  const [walletHistory, setWalletHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state?.user?.user);
  const context = useContext(Context);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Fetch wallet history
  const fetchWalletHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.wallet.history.url, {
        method: SummaryApi.wallet.history.method,
        credentials: 'include',
        headers: {
          "content-type": 'application/json'
        }
      });
      const responseData = await response.json();
      console.log("Wallet History Response:", responseData); // Debug log
      if (responseData.success) {
        setWalletHistory(responseData.data);
      }
    } catch (error) {
      console.error('Error fetching wallet history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletHistory();
  }, []);

  return (
    <div className='p-4'>
      {/* Greeting & Balance Card */}
      <div className='bg-white rounded-lg p-6 mb-6 shadow'>
        <h1 className="text-2xl font-bold mb-4 capitalize">
          {getGreeting()}, {user?.name}!
        </h1>
        <div className="flex items-center justify-between">
          <span className="text-lg">Current Balance</span>
          <span className="text-red-600 text-2xl font-bold">{displayINRCurrency(context?.walletBalance || 0)}</span>
        </div>
      </div>

      {/* Payment History */}
      <div className='bg-white rounded-lg p-6 shadow'>
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        {loading ? (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
            <div className="rounded-lg p-8">
              <TriangleMazeLoader />
            </div>
          </div>
        ) : walletHistory.length === 0 ? (
          <p className='text-center text-gray-500 py-4'>No transaction history available</p>
        ) : (
          <div className="space-y-4">
            {walletHistory.map((transaction) => (
              <div
                key={transaction._id}
                className="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">
                      {transaction.productId?.serviceName || 'Product Name Not Available'}
                    </div>
                    <div className="text-sm text-gray-600">Quantity: {transaction.quantity}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-red-600 font-semibold">-{displayINRCurrency(transaction.amount)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletDetails;