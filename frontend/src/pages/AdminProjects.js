import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);

  // Fetch all website projects
  const fetchProjects = async () => {
    try {
      const response = await fetch(SummaryApi.adminProjects.url, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if(data.success) {
        setProjects(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle sending update and message
  const handleSendUpdate = async (projectId) => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      // If a checkpoint is selected, update progress first
      if (selectedCheckpoint) {
        const progressResponse = await fetch(SummaryApi.updateProjectProgress.url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            projectId,
            checkpointId: selectedCheckpoint.checkpointId,
            name: selectedCheckpoint.name,
            completed: true
          })
        });

        const progressData = await progressResponse.json();
        if (!progressData.success) {
          toast.error(progressData.message || 'Failed to update progress');
          return;
        }
      }

      // Send message update
      const messageResponse = await fetch(SummaryApi.sendProjectMessage.url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId,
          message: message.trim(),
          messageId: editingMessageId,
          isEdit: Boolean(editingMessageId) // Add flag to indicate if this is an edit
        })
      });

      const messageData = await messageResponse.json();
      
      if(messageData.success) {
        toast.success('Update sent successfully');
        setMessage('');
        setSelectedCheckpoint(null);
        setEditingMessageId(null);
        setIsModalOpen(false);
        fetchProjects();
      } else {
        toast.error(messageData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send update');
    }
  };

  // Find the next available checkpoint
  const getNextCheckpoint = (checkpoints) => {
    for (let i = 0; i < checkpoints.length; i++) {
      if (!checkpoints[i].completed) {
        return i;
      }
    }
    return checkpoints.length; // All completed
  };

  const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-lg">{project.productId?.serviceName}</h3>
          <p className="text-sm text-gray-600">Client: {project.userId?.name}</p>
          <p className="text-sm text-gray-600">
            Ordered: {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedProject(project);
            setSelectedCheckpoint(null);
            setMessage('');
            setEditingMessageId(null);
            setIsModalOpen(true);
          }}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Edit
        </button>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-gray-600">{project.projectProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${project.projectProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Preview latest message */}
      {project.messages && project.messages.length > 0 && (
        <div className="mt-4 text-sm text-gray-600 border-t pt-3">
          <p className="font-medium">Latest Update:</p>
          <p className="mt-1">{project.messages[project.messages.length - 1].message}</p>
        </div>
      )}
    </div>
  );

  const EditModal = () => {
    if (!selectedProject) return null;

    const nextCheckpointIndex = getNextCheckpoint(selectedProject.checkpoints);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              Edit Project: {selectedProject.productId?.serviceName}
            </h3>
            <button 
              onClick={() => {
                setIsModalOpen(false);
                setSelectedCheckpoint(null);
                setMessage('');
                setEditingMessageId(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Project Details */}
          <div className="mb-6">
            <p className="text-gray-600">Client: {selectedProject.userId?.name}</p>
            <p className="text-gray-600">
              Ordered: {new Date(selectedProject.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Update Progress
            </label>
            <select
              value={selectedCheckpoint ? selectedProject.checkpoints.findIndex(cp => cp.checkpointId === selectedCheckpoint.checkpointId) : ''}
              onChange={(e) => {
                const selectedIndex = parseInt(e.target.value);
                if (selectedIndex >= 0) {
                  setSelectedCheckpoint(selectedProject.checkpoints[selectedIndex]);
                } else {
                  setSelectedCheckpoint(null);
                }
              }}
              className="w-full p-2 border rounded text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Select checkpoint (optional)...</option>
              {selectedProject.checkpoints.map((checkpoint, index) => (
                <option 
                  key={checkpoint.checkpointId} 
                  value={index}
                  disabled={index !== nextCheckpointIndex}
                >
                  {checkpoint.name} {checkpoint.completed ? '(Completed)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Completed Checkpoints */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Completed Steps</h4>
            <div className="space-y-1">
              {selectedProject.checkpoints
                .filter(checkpoint => checkpoint.completed)
                .map((checkpoint) => (
                  <div 
                    key={checkpoint.checkpointId}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <span className="text-green-500 mr-2">✓</span>
                    {checkpoint.name}
                  </div>
                ))}
            </div>
          </div>

          {/* Previous Messages */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Previous Updates</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedProject.messages && selectedProject.messages.map((msg, index) => (
                <div 
                  key={index}
                  className="flex items-start justify-between p-2 bg-gray-50 rounded"
                >
                  <div className="flex-1">
                    <p className="text-sm">{msg.message}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setMessage(msg.message);
                      setEditingMessageId(msg.id || index);
                    }}
                    className="ml-2 text-blue-600 text-sm hover:text-blue-800"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Message Section */}
          <div className="space-y-3">
            {selectedCheckpoint && (
              <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                Updating progress to: {selectedCheckpoint.name}
              </div>
            )}
            {editingMessageId && (
              <div className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded flex justify-between items-center">
                <span>Editing previous message</span>
                <button 
                  onClick={() => {
                    setMessage('');
                    setEditingMessageId(null);
                  }}
                  className="text-xs text-yellow-700 hover:text-yellow-900"
                >
                  Cancel Edit
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={(textArea) => {
                    // Keep focus on textarea if it already has focus
                    if (textArea && textArea === document.activeElement) {
                      const len = textArea.value.length;
                      textArea.setSelectionRange(len, len);
                    }
                  }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    // Prevent losing focus on Tab
                    if (e.key === 'Tab') {
                      e.preventDefault();
                      const start = e.target.selectionStart;
                      const end = e.target.selectionEnd;
                      setMessage(
                        message.substring(0, start) + '    ' + message.substring(end)
                      );
                      // Move cursor after tab
                      setTimeout(() => {
                        e.target.setSelectionRange(start + 4, start + 4);
                      }, 0);
                    }
                  }}
                  placeholder={selectedCheckpoint ? "Message is required for progress update..." : "Send update to client..."}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 min-h-[80px] resize-none"
                  autoFocus
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {message.length} characters
                </div>
              </div>
              <button
                onClick={() => handleSendUpdate(selectedProject._id)}
                disabled={selectedCheckpoint && !message.trim()}
                className={`px-4 py-2 rounded text-sm whitespace-nowrap ${
                  selectedCheckpoint && !message.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {editingMessageId ? 'Save Changes' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="p-4">Loading projects...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Website Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {isModalOpen && <EditModal />}
    </div>
  );
};

export default AdminProjects;