// components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import { FaEdit } from "react-icons/fa";
import EditProfileModal from '../components/EditProfileModal';
import { Link } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.user);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch latest user data when component mounts
    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
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
        }
    };

    const handleProfileUpdate = async (updatedData) => {
        setLoading(true);
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
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 mb-20">
            <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto p-6">
                <div className="flex items-start gap-6">
                    {/* Profile Image */}
                    <div className="w-32 h-32">
                        {user?.profilePic ? (
                            <img 
                                src={user.profilePic}
                                alt={user.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-3xl text-gray-500">
                                    {user?.name?.charAt(0)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* User Details */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h1 className="text-2xl font-bold">{user?.name}</h1>
                            <button 
                                onClick={() => setShowEditModal(true)}
                                className="text-gray-600 hover:text-gray-900 p-2"
                            >
                                <FaEdit size={20} />
                            </button>
                        </div>
                        <div className="mt-4 space-y-2">
                            <p className="text-gray-600">
                                <span className="font-medium">Phone: </span>
                                {user?.phone || 'Not set'}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Age: </span>
                                {user?.age || 'Not set'}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Email: </span>
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

             {/* Orders Section */}
                            <div className="mt-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto p-6">
                <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                <Link 
                    to="/order" 
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <span>View Order History</span>
                    <span className="text-gray-400">›</span>
                </Link>
                </div>         


            {/* Edit Modal */}
            {showEditModal && (
                <EditProfileModal
                    user={user}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={handleProfileUpdate}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default Profile;