import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  User,
  Flag,
  Clock,
  CheckCircle,
  Circle,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  Archive,
  MessageCircle,
  Settings,
  Play,
  Pause,
  StopCircle
} from 'lucide-react';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showMenu, setShowMenu] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [timeTracking, setTimeTracking] = useState({});

  const tasks = [
    {
      id: 1,
      title: 'Design Homepage Layout',
      description: 'Create wireframes and mockups for the new homepage design',
      project: 'Website Redesign',
      assignee: 'Sarah M.',
      status: 'In Progress',
      priority: 'high',
      dueDate: '2024-02-10',
      estimatedHours: 8,
      actualHours: 5,
      tags: ['Design', 'UI/UX'],
      comments: [
        { id: 1, user: 'Sarah M.', text: 'Started working on the wireframes', timestamp: '2024-02-08 10:30' },
        { id: 2, user: 'John D.', text: 'Looking good! Can you add mobile responsiveness?', timestamp: '2024-02-08 14:15' }
      ],
      attachments: [
        { id: 1, name: 'wireframes.pdf', size: '2.3 MB', type: 'pdf' },
        { id: 2, name: 'design-specs.docx', size: '1.1 MB', type: 'docx' }
      ],
      timeEntries: [
        { id: 1, date: '2024-02-08', hours: 3, description: 'Wireframe creation' },
        { id: 2, date: '2024-02-09', hours: 2, description: 'Mockup design' }
      ]
    },
    {
      id: 2,
      title: 'API Integration Testing',
      description: 'Test the new payment gateway API integration',
      project: 'Mobile App Development',
      assignee: 'Alex K.',
      status: 'To Do',
      priority: 'medium',
      dueDate: '2024-02-12',
      estimatedHours: 6,
      actualHours: 0,
      tags: ['Testing', 'API'],
      comments: [
        { id: 1, user: 'Alex K.', text: 'Ready to start testing', timestamp: '2024-02-07 09:00' }
      ],
      attachments: [],
      timeEntries: []
    },
    {
      id: 3,
      title: 'Database Schema Review',
      description: 'Review and approve the new database schema design',
      project: 'Database Migration',
      assignee: 'David L.',
      status: 'Completed',
      priority: 'low',
      dueDate: '2024-01-30',
      estimatedHours: 4,
      actualHours: 4,
      tags: ['Database', 'Review'],
      comments: [
        { id: 1, user: 'David L.', text: 'Schema review completed', timestamp: '2024-01-30 16:45' },
        { id: 2, user: 'Emma W.', text: 'Approved and ready for implementation', timestamp: '2024-01-30 17:20' }
      ],
      attachments: [
        { id: 1, name: 'schema-review.pdf', size: '3.1 MB', type: 'pdf' }
      ],
      timeEntries: [
        { id: 1, date: '2024-01-30', hours: 4, description: 'Complete schema review' }
      ]
    },
    {
      id: 4,
      title: 'Content Writing for Blog',
      description: 'Write 5 blog posts for the marketing campaign',
      project: 'Marketing Campaign',
      assignee: 'Rachel B.',
      status: 'In Progress',
      priority: 'medium',
      dueDate: '2024-02-15',
      estimatedHours: 10,
      actualHours: 6,
      tags: ['Content', 'Marketing'],
      comments: [
        { id: 1, user: 'Rachel B.', text: 'Completed 3 out of 5 blog posts', timestamp: '2024-02-09 11:30' },
        { id: 2, user: 'Tom H.', text: 'Great work! The content looks engaging', timestamp: '2024-02-09 15:20' }
      ],
      attachments: [
        { id: 1, name: 'blog-post-1.docx', size: '45 KB', type: 'docx' },
        { id: 2, name: 'blog-post-2.docx', size: '52 KB', type: 'docx' },
        { id: 3, name: 'blog-post-3.docx', size: '38 KB', type: 'docx' }
      ],
      timeEntries: [
        { id: 1, date: '2024-02-08', hours: 3, description: 'Blog post 1 & 2' },
        { id: 2, date: '2024-02-09', hours: 3, description: 'Blog post 3' }
      ]
    },
    {
      id: 5,
      title: 'Security Vulnerability Scan',
      description: 'Run automated security scans on production environment',
      project: 'Security Audit',
      assignee: 'Mark S.',
      status: 'To Do',
      priority: 'high',
      dueDate: '2024-02-08',
      estimatedHours: 3,
      actualHours: 0,
      tags: ['Security', 'Testing'],
      comments: [
        { id: 1, user: 'Mark S.', text: 'Scheduled for tomorrow morning', timestamp: '2024-02-07 16:00' }
      ],
      attachments: [],
      timeEntries: []
    },
    {
      id: 6,
      title: 'User Acceptance Testing',
      description: 'Conduct UAT sessions with key stakeholders',
      project: 'Website Redesign',
      assignee: 'Mike R.',
      status: 'To Do',
      priority: 'medium',
      dueDate: '2024-02-14',
      estimatedHours: 8,
      actualHours: 0,
      tags: ['Testing', 'UAT'],
      comments: [
        { id: 1, user: 'Mike R.', text: 'UAT session scheduled for next week', timestamp: '2024-02-07 14:30' }
      ],
      attachments: [],
      timeEntries: []
    },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'To Do':
        return 'bg-gray-100 text-gray-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <Flag className="w-4 h-4 text-red-600" />;
      case 'medium':
        return <Flag className="w-4 h-4 text-yellow-600" />;
      case 'low':
        return <Flag className="w-4 h-4 text-green-600" />;
      default:
        return <Flag className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'In Progress':
        return <Play className="w-4 h-4 text-blue-600" />;
      case 'To Do':
        return <Circle className="w-4 h-4 text-gray-600" />;
      case 'On Hold':
        return <Pause className="w-4 h-4 text-yellow-600" />;
      default:
        return <Circle className="w-4 h-4 text-gray-600" />;
    }
  };

  // Menu toggle handler
  const toggleMenu = (taskId) => {
    setShowMenu(showMenu === taskId ? null : taskId);
  };

  // Action handlers
  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
    setShowMenu(null);
  };

  const handleEditTask = (taskId) => {
    addNotification('Edit task feature coming soon!', 'info');
    setShowMenu(null);
  };

  const handleDeleteTask = (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      addNotification('Task deleted successfully!', 'success');
      setShowMenu(null);
    }
  };

  const handleDownloadReport = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    const reportData = {
      task,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${task.title}-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addNotification('Task report downloaded!', 'success');
    setShowMenu(null);
  };

  const handleShareTask = (taskId) => {
    addNotification('Share feature coming soon!', 'info');
    setShowMenu(null);
  };

  const handleArchiveTask = (taskId) => {
    addNotification('Task archived successfully!', 'success');
    setShowMenu(null);
  };

  const handleMessageAssignee = (taskId) => {
    addNotification('Messaging feature coming soon!', 'info');
    setShowMenu(null);
  };

  const handleStartTimeTracking = (taskId) => {
    setTimeTracking(prev => ({
      ...prev,
      [taskId]: { startTime: Date.now(), isRunning: true }
    }));
    addNotification('Time tracking started!', 'success');
    setShowMenu(null);
  };

  const handleStopTimeTracking = (taskId) => {
    const tracking = timeTracking[taskId];
    if (tracking && tracking.isRunning) {
      const duration = Math.round((Date.now() - tracking.startTime) / 1000 / 60); // minutes
      setTimeTracking(prev => ({
        ...prev,
        [taskId]: { ...tracking, isRunning: false, duration }
      }));
      addNotification(`Time tracking stopped. Duration: ${duration} minutes`, 'success');
    }
    setShowMenu(null);
  };

  const handleCreateTask = () => {
    addNotification('Create task feature coming soon!', 'info');
  };

  const handleExportAll = () => {
    const allTasksData = {
      tasks: filteredTasks,
      filters: { searchTerm, filterStatus, filterPriority },
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(allTasksData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-tasks-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addNotification('All tasks exported successfully!', 'success');
  };

  // Notification system
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-2 rounded-lg shadow-lg text-white text-sm ${
              notification.type === 'success' ? 'bg-green-500' :
              notification.type === 'error' ? 'bg-red-500' :
              'bg-blue-500'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tasks</h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage and track all your tasks and assignments.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button 
                onClick={handleExportAll}
                className="btn-secondary flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All
              </button>
              <button 
                onClick={handleCreateTask}
                className="btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <div className="sm:w-48">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(task.status)}
                      {getPriorityIcon(task.priority)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {task.assignee}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due: {task.dueDate}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {task.actualHours}/{task.estimatedHours}h
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500">{task.project}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(task.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                  {showMenu === task.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                      <div className="py-1">
                        <button
                          onClick={() => handleViewDetails(task)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleEditTask(task.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Task
                        </button>
                        {timeTracking[task.id]?.isRunning ? (
                          <button
                            onClick={() => handleStopTimeTracking(task.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <StopCircle className="w-4 h-4 mr-2" />
                            Stop Timer
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStartTimeTracking(task.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Timer
                          </button>
                        )}
                        <button
                          onClick={() => handleDownloadReport(task.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </button>
                        <button
                          onClick={() => handleShareTask(task.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Task
                        </button>
                        <button
                          onClick={() => handleMessageAssignee(task.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message Assignee
                        </button>
                        <button
                          onClick={() => handleArchiveTask(task.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Archive className="w-4 h-4 mr-2" />
                          Archive Task
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Task
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Task Details Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedTask.title}</h2>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Task Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Overview</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Description:</span>
                      <p className="text-sm text-gray-900 mt-1">{selectedTask.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                          {selectedTask.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Priority:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTask.priority)}`}>
                          {selectedTask.priority}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Project:</span>
                        <span className="ml-2 text-sm font-medium text-gray-900">{selectedTask.project}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Assignee:</span>
                        <span className="ml-2 text-sm font-medium text-gray-900">{selectedTask.assignee}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Due Date:</span>
                        <span className="ml-2 text-sm font-medium text-gray-900">{selectedTask.dueDate}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Time:</span>
                        <span className="ml-2 text-sm font-medium text-gray-900">{selectedTask.actualHours}/{selectedTask.estimatedHours}h</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
                  <div className="space-y-3">
                    {selectedTask.comments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{comment.user}</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
                  <div className="space-y-2">
                    {selectedTask.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{attachment.name}</span>
                          <span className="text-xs text-gray-500">({attachment.size})</span>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-800">Download</button>
                      </div>
                    ))}
                    {selectedTask.attachments.length === 0 && (
                      <p className="text-sm text-gray-500">No attachments</p>
                    )}
                  </div>
                </div>

                {/* Time Entries */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Entries</h3>
                  <div className="space-y-2">
                    {selectedTask.timeEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{entry.date}</span>
                          <p className="text-xs text-gray-600">{entry.description}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{entry.hours}h</span>
                      </div>
                    ))}
                    {selectedTask.timeEntries.length === 0 && (
                      <p className="text-sm text-gray-500">No time entries</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
