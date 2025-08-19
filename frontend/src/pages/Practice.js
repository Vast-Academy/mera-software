import React, { useState } from 'react';
import { Search, Eye, Check, X, Clock, AlertTriangle, User, FileText, MapPin, Camera } from 'lucide-react';

const KYCAdminPanel = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rejectReason, setRejectReason] = useState({
    document: false,
    address: false,
    selfie: false,
    customReason: ''
  });
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Mock data for demonstration
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      status: 'pending',
      submittedAt: '2025-08-15T10:30:00Z',
      documents: {
        idDocument: {
          type: 'Aadhaar Card',
          url: '/api/placeholder/400/300',
          status: 'pending'
        },
        addressProof: {
          type: 'Utility Bill',
          url: '/api/placeholder/400/300',
          status: 'pending'
        },
        selfie: {
          url: '/api/placeholder/300/400',
          status: 'pending'
        }
      }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      status: 'approved',
      submittedAt: '2025-08-14T14:20:00Z',
      documents: {
        idDocument: {
          type: 'Pan Card',
          url: '/api/placeholder/400/300',
          status: 'approved'
        },
        addressProof: {
          type: 'Bank Statement',
          url: '/api/placeholder/400/300',
          status: 'approved'
        },
        selfie: {
          url: '/api/placeholder/300/400',
          status: 'approved'
        }
      }
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      status: 'rejected',
      submittedAt: '2025-08-13T09:15:00Z',
      rejectionReasons: ['Document unclear', 'Address proof expired'],
      documents: {
        idDocument: {
          type: 'Driving License',
          url: '/api/placeholder/400/300',
          status: 'rejected'
        },
        addressProof: {
          type: 'Rent Agreement',
          url: '/api/placeholder/400/300',
          status: 'rejected'
        },
        selfie: {
          url: '/api/placeholder/300/400',
          status: 'approved'
        }
      }
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <Check className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'approved' }
        : user
    ));
    setSelectedUser(null);
  };

  const handleReject = () => {
    const reasons = [];
    if (rejectReason.document) reasons.push('ID Document issue');
    if (rejectReason.address) reasons.push('Address proof issue');
    if (rejectReason.selfie) reasons.push('Selfie issue');
    if (rejectReason.customReason) reasons.push(rejectReason.customReason);

    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, status: 'rejected', rejectionReasons: reasons }
        : user
    ));
    
    setShowRejectModal(false);
    setSelectedUser(null);
    setRejectReason({ document: false, address: false, selfie: false, customReason: '' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-2xl font-bold text-gray-900">KYC Admin Panel</h1>
            <p className="text-gray-600">Review and manage user KYC submissions</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* User List Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">User Submissions</h2>
                
                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* User List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">{formatDate(user.submittedAt)}</p>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        <span className="ml-1 capitalize">{user.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review Panel */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h2>
                      <p className="text-gray-600">{selectedUser.email}</p>
                      <p className="text-sm text-gray-500">Phone: {selectedUser.phone}</p>
                    </div>
                    <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedUser.status)}`}>
                      {getStatusIcon(selectedUser.status)}
                      <span className="ml-2 capitalize">{selectedUser.status}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitted Documents</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ID Document */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                        <h4 className="font-medium text-gray-900">ID Document</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{selectedUser.documents.idDocument.type}</p>
                      <div className="bg-gray-100 rounded-md p-3 mb-3">
                        <img 
                          src={selectedUser.documents.idDocument.url} 
                          alt="ID Document"
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${getStatusColor(selectedUser.documents.idDocument.status)}`}>
                        {getStatusIcon(selectedUser.documents.idDocument.status)}
                        <span className="ml-1">{selectedUser.documents.idDocument.status}</span>
                      </div>
                    </div>

                    {/* Address Proof */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-5 h-5 text-green-600 mr-2" />
                        <h4 className="font-medium text-gray-900">Address Proof</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{selectedUser.documents.addressProof.type}</p>
                      <div className="bg-gray-100 rounded-md p-3 mb-3">
                        <img 
                          src={selectedUser.documents.addressProof.url} 
                          alt="Address Proof"
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${getStatusColor(selectedUser.documents.addressProof.status)}`}>
                        {getStatusIcon(selectedUser.documents.addressProof.status)}
                        <span className="ml-1">{selectedUser.documents.addressProof.status}</span>
                      </div>
                    </div>

                    {/* Selfie */}
                    <div className="border rounded-lg p-4 md:col-span-2">
                      <div className="flex items-center mb-2">
                        <Camera className="w-5 h-5 text-purple-600 mr-2" />
                        <h4 className="font-medium text-gray-900">Selfie Verification</h4>
                      </div>
                      <div className="flex justify-center mb-3">
                        <div className="bg-gray-100 rounded-md p-3">
                          <img 
                            src={selectedUser.documents.selfie.url} 
                            alt="User Selfie"
                            className="w-32 h-40 object-cover rounded"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${getStatusColor(selectedUser.documents.selfie.status)}`}>
                          {getStatusIcon(selectedUser.documents.selfie.status)}
                          <span className="ml-1">{selectedUser.documents.selfie.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rejection Reasons */}
                  {selectedUser.status === 'rejected' && selectedUser.rejectionReasons && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-900 mb-2">Rejection Reasons:</h4>
                      <ul className="text-sm text-red-700">
                        {selectedUser.rejectionReasons.map((reason, index) => (
                          <li key={index} className="flex items-center">
                            <X className="w-3 h-3 mr-2" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {selectedUser.status === 'pending' && (
                    <div className="mt-6 flex space-x-3">
                      <button
                        onClick={() => handleApprove(selectedUser.id)}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                      >
                        <Check className="w-4 h-4 inline mr-2" />
                        Approve KYC
                      </button>
                      <button
                        onClick={() => setShowRejectModal(true)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                      >
                        <X className="w-4 h-4 inline mr-2" />
                        Reject & Request Resubmission
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-4" />
                  <p>Select a user to review their KYC submission</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specify Rejection Reasons</h3>
            
            <div className="space-y-3 mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rejectReason.document}
                  onChange={(e) => setRejectReason({...rejectReason, document: e.target.checked})}
                  className="mr-3"
                />
                ID Document Issue
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rejectReason.address}
                  onChange={(e) => setRejectReason({...rejectReason, address: e.target.checked})}
                  className="mr-3"
                />
                Address Proof Issue
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rejectReason.selfie}
                  onChange={(e) => setRejectReason({...rejectReason, selfie: e.target.checked})}
                  className="mr-3"
                />
                Selfie Issue
              </label>
            </div>

            <textarea
              placeholder="Additional comments (optional)"
              value={rejectReason.customReason}
              onChange={(e) => setRejectReason({...rejectReason, customReason: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
              rows={3}
            />

            <div className="flex space-x-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Send Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCAdminPanel;