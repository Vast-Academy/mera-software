// components/Profile.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { setUserDetails, logout } from '../store/userSlice';
import { FaEdit } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import EditProfileModal from '../components/EditProfileModal';
import { Link, useNavigate } from 'react-router-dom';
import TriangleMazeLoader from '../components/TriangleMazeLoader';
import Context from '../context';
import CookieManager from '../utils/cookieManager';
import StorageService from '../utils/storageService';
import { useDatabase } from '../context/DatabaseContext';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { hybridCache } = useDatabase();
    const user = useSelector(state => state?.user?.user);
    const context = useContext(Context);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.current_user.url, {
                method: SummaryApi.current_user.method,
                credentials: 'include'
            });
            const data = await response.json();
            if(data.success) {
                dispatch(setUserDetails(data.data));
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
          // 1. BEFORE ANYTHING ELSE - Save guest slides to multiple locations
          const guestSlides = StorageService.getGuestSlides();
          if (guestSlides && guestSlides.length > 0) {
            console.log('Preserving guest slides before logout');
            try {
              // Make sure to save as plain arrays for consistency
              sessionStorage.setItem('sessionGuestSlides', JSON.stringify(guestSlides));
              localStorage.setItem('preservedGuestSlides', JSON.stringify(guestSlides));
              localStorage.setItem('guestSlides', JSON.stringify(guestSlides)); 
              // Mark logout timestamp for post-refresh detection
              localStorage.setItem('lastLogoutTimestamp', Date.now().toString());
            } catch (backupError) {
              console.error('Failed to backup slides before logout:', backupError);
            }
          }
      
          // 2. Call logout API
          const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'
          });
      
          const data = await fetchData.json();
      
          if (data.success) {
            try {
              // 3. Clear cookies
              CookieManager.clearAll();
              
              // 4. Clear only user data with the improved method
              StorageService.clearUserData();
              
              // 5. Do a controlled clear of hybridCache to preserve guest slides
              if (hybridCache && typeof hybridCache.clearAll === 'function') {
                await hybridCache.clearAll();
              }
              
              // 6. Extra verification that guest slides are preserved
              // Get from the preserved location and restore to main locations
              const preserved = localStorage.getItem('preservedGuestSlides');
              const sessionBackup = sessionStorage.getItem('sessionGuestSlides');
              
              if (!localStorage.getItem('guestSlides')) {
                console.log('Restoring guest slides after cache clear');
                
                // Try preserved first, then session backup
                if (preserved) {
                  localStorage.setItem('guestSlides', preserved);
                } else if (sessionBackup) {
                  localStorage.setItem('guestSlides', sessionBackup);
                }
              }
              
              // 7. Dispatch Redux logout
              dispatch(logout());
              
              // 8. Reset component states
            //   setMenuDisplay(false);
            //   setSearch('');
              
              toast.success(data.message);
              navigate("/");
            } catch (cacheError) {
              console.error("Cache clearing error:", cacheError);
              // Still proceed with logout even if cache clearing fails
              dispatch(logout());
              navigate("/");
            }
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Error during logout:", error);
          toast.error("Logout failed. Please try again.");
        }
      };

    const handleProfileUpdate = async (updatedData) => {
        setUpdateLoading(true);
        try {
            const response = await fetch(SummaryApi.updateProfile.url, {
                method: SummaryApi.updateProfile.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();
            
            if (data.success) {
                CookieManager.setUserDetails({
                    _id: data.data._id,
                    name: data.data.name,
                    email: data.data.email,
                    role: data.data.role
                  });
                dispatch(setUserDetails(data.data));
                setShowEditModal(false);
                toast.success("Profile updated successfully");
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setUpdateLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 mb-20">
            {(loading || updateLoading) && (
                <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
                    <div className="rounded-lg p-8">
                        <TriangleMazeLoader />
                    </div>
                </div>
            )}

            {/* User Profile Header */}
            <div className="bg-white rounded-lg shadow-sm max-w-2xl mx-auto mb-4">
                <div className="p-6">
                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16">
                            {user?.profilePic ? (
                                <img 
                                    src={user.profilePic}
                                    alt={user.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-2xl text-gray-500">
                                        {user?.name?.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-xl font-semibold">{user?.name}</h1>
                                    <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Phone: </span>
                                            {user?.phone || 'Not set'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Age: </span>
                                            {user?.age || 'Not set'}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowEditModal(true)}
                                    className="text-gray-600 hover:text-gray-900 p-2"
                                >
                                    <FaEdit size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white rounded-lg shadow-sm max-w-2xl mx-auto">
                {/* Orders Section */}
                <Link to="/order" className="block">
                    <div className="p-4 border-b hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-base font-medium">Your Orders</h2>
                                <p className="text-sm text-gray-600">Track, return, or buy things again</p>
                            </div>
                            <span className="text-gray-400 text-xl">›</span>
                        </div>
                    </div>
                </Link>

                {/* Cart Section */}
                <Link to="/cart" className="block">
                    <div className="p-4 border-b hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <IoCartOutline className="w-6 h-6" />
                                    {context?.cartProductCount > 0 && (
                                        <div className="absolute -top-2 -right-2 bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center">
                                            <p className="text-xs">{context?.cartProductCount}</p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-base font-medium">Your Cart</h2>
                                    <p className="text-sm text-gray-600">
                                        {context?.cartProductCount || 0} items in cart
                                    </p>
                                </div>
                            </div>
                            <span className="text-gray-400 text-xl">›</span>
                        </div>
                    </div>
                </Link>

                {/* Wallet Section */}
                <Link to="/wallet" className="block">
                    <div className="p-4 border-b hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <IoWalletOutline className="w-6 h-6" />
                                <div>
                                    <h2 className="text-base font-medium">Your Wallet</h2>
                                    <p className="text-sm text-gray-600">
                                        Balance: ₹{context?.walletBalance || 0}
                                    </p>
                                </div>
                            </div>
                            <span className="text-gray-400 text-xl">›</span>
                        </div>
                    </div>
                </Link>

                {/* Logout Section */}
                <button 
                    onClick={handleLogout}
                    className="w-full text-left"
                >
                    <div className="p-4 hover:bg-gray-50 flex justify-between items-center text-red-600">
                        <div className="flex items-center gap-3">
                            <IoLogOutOutline className="w-6 h-6" />
                            <div>
                                <h2 className="text-base font-medium">Logout</h2>
                                <p className="text-sm">Sign out of your account</p>
                            </div>
                        </div>
                        <span className="text-gray-400 text-xl">›</span>
                    </div>
                </button>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <EditProfileModal
                    user={user}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={handleProfileUpdate}
                    loading={updateLoading}
                />
            )}
        </div>
    );
};

export default Profile;