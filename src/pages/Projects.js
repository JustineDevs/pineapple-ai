import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  Archive,
  MessageCircle,
  Settings
} from 'lucide-react';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMenu, setShowMenu] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX',
      status: 'In Progress',
      progress: 75,
      startDate: '2024-01-15',
      dueDate: '2024-02-15',
      budget: '$15,000',
      team: ['John D.', 'Sarah M.', 'Mike R.'],
      priority: 'high',
      tasks: [
        { id: 1, name: 'Design Mockups', status: 'Completed', assignee: 'Sarah M.' },
        { id: 2, name: 'Frontend Development', status: 'In Progress', assignee: 'Mike R.' },
        { id: 3, name: 'Backend Integration', status: 'Pending', assignee: 'John D.' }
      ],
      milestones: [
        { id: 1, name: 'Design Approval', date: '2024-01-25', status: 'Completed' },
        { id: 2, name: 'Development Complete', date: '2024-02-10', status: 'In Progress' },
        { id: 3, name: 'Testing & Launch', date: '2024-02-15', status: 'Pending' }
      ]
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'iOS and Android mobile application for customer engagement',
      status: 'Planning',
      progress: 25,
      startDate: '2024-02-01',
      dueDate: '2024-03-01',
      budget: '$25,000',
      team: ['Alex K.', 'Lisa T.'],
      priority: 'medium',
      tasks: [
        { id: 1, name: 'Requirements Gathering', status: 'Completed', assignee: 'Alex K.' },
        { id: 2, name: 'UI/UX Design', status: 'In Progress', assignee: 'Lisa T.' },
        { id: 3, name: 'Development Planning', status: 'Pending', assignee: 'Alex K.' }
      ],
      milestones: [
        { id: 1, name: 'Requirements Complete', date: '2024-02-05', status: 'Completed' },
        { id: 2, name: 'Design Complete', date: '2024-02-20', status: 'In Progress' },
        { id: 3, name: 'Development Start', date: '2024-02-25', status: 'Pending' }
      ]
    },
    {
      id: 3,
      name: 'Database Migration',
      description: 'Migrate legacy database to cloud-based solution',
      status: 'Completed',
      progress: 100,
      startDate: '2024-01-01',
      dueDate: '2024-01-30',
      budget: '$8,000',
      team: ['David L.', 'Emma W.'],
      priority: 'low',
      tasks: [
        { id: 1, name: 'Data Backup', status: 'Completed', assignee: 'David L.' },
        { id: 2, name: 'Migration Scripts', status: 'Completed', assignee: 'Emma W.' },
        { id: 3, name: 'Testing & Validation', status: 'Completed', assignee: 'David L.' }
      ],
      milestones: [
        { id: 1, name: 'Backup Complete', date: '2024-01-10', status: 'Completed' },
        { id: 2, name: 'Migration Complete', date: '2024-01-25', status: 'Completed' },
        { id: 3, name: 'Validation Complete', date: '2024-01-30', status: 'Completed' }
      ]
    },
    {
      id: 4,
      name: 'Marketing Campaign',
      description: 'Q1 digital marketing campaign across social media platforms',
      status: 'In Progress',
      progress: 60,
      startDate: '2024-01-20',
      dueDate: '2024-03-31',
      budget: '$12,000',
      team: ['Rachel B.', 'Tom H.', 'Jenny L.'],
      priority: 'medium',
      tasks: [
        { id: 1, name: 'Content Creation', status: 'Completed', assignee: 'Rachel B.' },
        { id: 2, name: 'Social Media Setup', status: 'In Progress', assignee: 'Tom H.' },
        { id: 3, name: 'Campaign Launch', status: 'Pending', assignee: 'Jenny L.' }
      ],
      milestones: [
        { id: 1, name: 'Content Ready', date: '2024-02-01', status: 'Completed' },
        { id: 2, name: 'Platform Setup', date: '2024-02-15', status: 'In Progress' },
        { id: 3, name: 'Campaign Live', date: '2024-03-01', status: 'Pending' }
      ]
    },
    {
      id: 5,
      name: 'Security Audit',
      description: 'Comprehensive security assessment and vulnerability testing',
      status: 'Planning',
      progress: 15,
      startDate: '2024-02-15',
      dueDate: '2024-04-15',
      budget: '$18,000',
      team: ['Mark S.', 'Anna K.'],
      priority: 'high',
      tasks: [
        { id: 1, name: 'Scope Definition', status: 'In Progress', assignee: 'Mark S.' },
        { id: 2, name: 'Tool Selection', status: 'Pending', assignee: 'Anna K.' },
        { id: 3, name: 'Testing Schedule', status: 'Pending', assignee: 'Mark S.' }
      ],
      milestones: [
        { id: 1, name: 'Scope Defined', date: '2024-02-25', status: 'In Progress' },
        { id: 2, name: 'Tools Selected', date: '2024-03-10', status: 'Pending' },
        { id: 3, name: 'Testing Complete', date: '2024-04-15', status: 'Pending' }
      ]
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Hold':
        return 'bg-gray-100 text-gray-800';
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

  // Menu toggle handler
  const toggleMenu = (projectId) => {
    setShowMenu(showMenu === projectId ? null : projectId);
  };

  // Action handlers
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
    setShowMenu(null);
  };

  const handleEditProject = (projectId) => {
    addNotification('Edit project feature coming soon!', 'info');
    setShowMenu(null);
  };

  const handleDeleteProject = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      addNotification('Project deleted successfully!', 'success');
      setShowMenu(null);
    }
  };

  const handleDownloadReport = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    const reportData = {
      project,
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name}-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addNotification('Project report downloaded!', 'success');
    setShowMenu(null);
  };

  const handleShareProject = (projectId) => {
    addNotification('Share feature coming soon!', 'info');
    setShowMenu(null);
  };

  const handleArchiveProject = (projectId) => {
    addNotification('Project archived successfully!', 'success');
    setShowMenu(null);
  };

  const handleMessageTeam = (projectId) => {
    addNotification('Team messaging feature coming soon!', 'info');
    setShowMenu(null);
  };

  const handleCreateProject = () => {
    addNotification('Create project feature coming soon!', 'info');
  };

  const handleExportAll = () => {
    const allProjectsData = {
      projects: filteredProjects,
      filters: { searchTerm, filterStatus },
      generatedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(allProjectsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all-projects-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addNotification('All projects exported successfully!', 'success');
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Projects</h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage and track all your projects in one place.
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
                onClick={handleCreateProject}
                className="btn-primary flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
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
                  placeholder="Search projects..."
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
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(project.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                  {showMenu === project.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                      <div className="py-1">
                        <button
                          onClick={() => handleViewDetails(project)}
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
                          onClick={() => handleDownloadReport(project.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </button>
                        <button
                          onClick={() => handleShareProject(project.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Project
                        </button>
                        <button
                          onClick={() => handleMessageTeam(project.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message Team
                        </button>
                        <button
                          onClick={() => handleArchiveProject(project.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Archive className="w-4 h-4 mr-2" />
                          Archive Project
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

              <div className="space-y-3">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900 font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Budget:</span>
                    <span className="ml-1 font-medium text-gray-900">{project.budget}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Team:</span>
                    <span className="ml-1 font-medium text-gray-900">{project.team.length} members</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Start:</span>
                    <span className="ml-1 font-medium text-gray-900">{project.startDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Due:</span>
                    <span className="ml-1 font-medium text-gray-900">{project.dueDate}</span>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <span className="text-sm text-gray-600">Team:</span>
                  <div className="flex -space-x-1 mt-1">
                    {project.team.slice(0, 3).map((member, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white"
                      >
                        <span className="text-xs font-medium text-blue-700">
                          {member.split(' ')[0][0]}
                        </span>
                      </div>
                    ))}
                    {project.team.length > 3 && (
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-xs font-medium text-gray-600">
                          +{project.team.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Project Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Description:</span>
                      <p className="text-sm text-gray-900 mt-1">{selectedProject.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                          {selectedProject.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Priority:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedProject.priority)}`}>
                          {selectedProject.priority}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Budget:</span>
                        <span className="ml-2 text-sm font-medium text-gray-900">{selectedProject.budget}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Progress:</span>
                        <span className="ml-2 text-sm font-medium text-gray-900">{selectedProject.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
                  <div className="space-y-2">
                    {selectedProject.team.map((member, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-700">
                            {member.split(' ')[0][0]}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{member}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tasks</h3>
                  <div className="space-y-2">
                    {selectedProject.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{task.name}</span>
                          <p className="text-xs text-gray-600">Assigned to {task.assignee}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Milestones</h3>
                  <div className="space-y-2">
                    {selectedProject.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{milestone.name}</span>
                          <p className="text-xs text-gray-600">{milestone.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </span>
                      </div>
                    ))}
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

export default Projects;
