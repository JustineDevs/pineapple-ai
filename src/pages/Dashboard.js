import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock,
  Calendar,
  AlertCircle,
  Plus,
  MoreVertical,
  ArrowRight,
  Download,
  Eye,
  Edit,
  Trash2,
  MessageCircle,
  FileText,
  Settings
} from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showProjectMenu, setShowProjectMenu] = useState(null);
  const [showDeadlineMenu, setShowDeadlineMenu] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle menu toggles
  const toggleProjectMenu = (projectId) => {
    setShowProjectMenu(showProjectMenu === projectId ? null : projectId);
    setShowDeadlineMenu(null);
  };

  const toggleDeadlineMenu = (deadlineId) => {
    setShowDeadlineMenu(showDeadlineMenu === deadlineId ? null : deadlineId);
    setShowProjectMenu(null);
  };

  // Action handlers
  const handleExportReport = () => {
    const reportData = {
      stats,
      recentProjects,
      upcomingDeadlines,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addNotification('Report exported successfully!', 'success');
  };

  const handleCreateProject = () => {
    window.location.href = '/projects';
  };

  const handleCreateTask = () => {
    window.location.href = '/tasks';
  };

  const handleScheduleMeeting = () => {
    addNotification('Meeting scheduler coming soon!', 'info');
  };

  const handleUploadDocument = () => {
    addNotification('Document upload feature coming soon!', 'info');
  };

  const handleViewAllProjects = () => {
    window.location.href = '/projects';
  };

  const handleViewAllDeadlines = () => {
    window.location.href = '/tasks';
  };

  const handleViewAllTasks = () => {
    window.location.href = '/tasks';
  };

  // Project actions
  const handleViewProject = (projectId) => {
    window.location.href = `/projects?id=${projectId}`;
    setShowProjectMenu(null);
  };

  const handleEditProject = (projectId) => {
    window.location.href = `/projects?edit=${projectId}`;
    setShowProjectMenu(null);
  };

  const handleDeleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      addNotification('Project deleted successfully!', 'success');
      setShowProjectMenu(null);
    }
  };

  // Deadline actions
  const handleViewDeadline = (deadlineId) => {
    window.location.href = `/tasks?id=${deadlineId}`;
    setShowDeadlineMenu(null);
  };

  const handleEditDeadline = (deadlineId) => {
    window.location.href = `/tasks?edit=${deadlineId}`;
    setShowDeadlineMenu(null);
  };

  const handleDeleteDeadline = (deadlineId) => {
    if (confirm('Are you sure you want to delete this deadline?')) {
      addNotification('Deadline deleted successfully!', 'success');
      setShowDeadlineMenu(null);
    }
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

  const stats = [
    {
      name: 'Active Projects',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      name: 'Team Members',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Completed Tasks',
      value: '156',
      change: '+12',
      changeType: 'positive',
      icon: CheckCircle,
    },
    {
      name: 'Pending Tasks',
      value: '23',
      change: '-5',
      changeType: 'negative',
      icon: Clock,
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'Website Redesign',
      status: 'In Progress',
      progress: 75,
      dueDate: '2024-02-15',
      team: ['John D.', 'Sarah M.', 'Mike R.'],
    },
    {
      id: 2,
      name: 'Mobile App Development',
      status: 'Planning',
      progress: 25,
      dueDate: '2024-03-01',
      team: ['Alex K.', 'Lisa T.'],
    },
    {
      id: 3,
      name: 'Database Migration',
      status: 'Completed',
      progress: 100,
      dueDate: '2024-01-30',
      team: ['David L.', 'Emma W.'],
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      task: 'Finalize Design Mockups',
      project: 'Website Redesign',
      dueDate: '2024-02-10',
      priority: 'high',
    },
    {
      id: 2,
      task: 'API Documentation Review',
      project: 'Mobile App Development',
      dueDate: '2024-02-12',
      priority: 'medium',
    },
    {
      id: 3,
      task: 'User Testing Session',
      project: 'Website Redesign',
      dueDate: '2024-02-14',
      priority: 'low',
    },
  ];

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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-sm text-gray-700">
                Welcome back! Here's what's happening with your projects today.
              </p>
              {mounted && currentTime && (
                <p className="text-xs text-gray-500 mt-1">
                  {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
                </p>
              )}
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button 
                onClick={handleExportReport}
                className="btn-secondary flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
              <Link href="/projects" className="btn-primary flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.name} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <stat.icon className={`w-6 h-6 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Projects */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
                  <button 
                    onClick={handleViewAllProjects}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-500">{project.status}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex -space-x-1">
                            {project.team.map((member, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center border-2 border-white"
                              >
                                <span className="text-xs font-medium text-primary-700">
                                  {member.split(' ')[0][0]}
                                </span>
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-2">{project.team.length} members</span>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-2">
                        <div>
                          <div className="flex items-center mb-2">
                            <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">{project.dueDate}</span>
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{project.progress}%</span>
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => toggleProjectMenu(project.id)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                          {showProjectMenu === project.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                              <div className="py-1">
                                <button
                                  onClick={() => handleViewProject(project.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleEditProject(project.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Project
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(project.id)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Project
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div>
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
                  <button 
                    onClick={handleViewAllDeadlines}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{deadline.task}</h4>
                          <p className="text-xs text-gray-500">{deadline.project}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            deadline.priority === 'high' ? 'bg-red-100 text-red-700' :
                            deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {deadline.priority}
                          </div>
                          <div className="relative">
                            <button
                              onClick={() => toggleDeadlineMenu(deadline.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                            {showDeadlineMenu === deadline.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                <div className="py-1">
                                  <button
                                    onClick={() => handleViewDeadline(deadline.id)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </button>
                                  <button
                                    onClick={() => handleEditDeadline(deadline.id)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Task
                                  </button>
                                  <button
                                    onClick={() => handleDeleteDeadline(deadline.id)}
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
                      <div className="flex items-center mt-2">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{deadline.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={handleCreateTask}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Task
                  </button>
                  <button 
                    onClick={handleScheduleMeeting}
                    className="w-full btn-secondary flex items-center justify-center"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </button>
                  <button 
                    onClick={handleUploadDocument}
                    className="w-full btn-secondary flex items-center justify-center"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
