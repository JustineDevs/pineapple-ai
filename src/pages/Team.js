import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  MoreVertical,
  UserPlus
} from 'lucide-react';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Project Manager',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      avatar: 'JD',
      status: 'Online',
      projects: ['Website Redesign', 'Mobile App Development'],
      skills: ['Project Management', 'Agile', 'Scrum'],
      joinDate: '2023-01-15',
      availability: 'Full-time',
      performance: 95,
    },
    {
      id: 2,
      name: 'Sarah Miller',
      role: 'UI/UX Designer',
      email: 'sarah.miller@company.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      avatar: 'SM',
      status: 'Online',
      projects: ['Website Redesign', 'Marketing Campaign'],
      skills: ['Figma', 'Adobe Creative Suite', 'User Research'],
      joinDate: '2023-03-20',
      availability: 'Full-time',
      performance: 92,
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      role: 'Frontend Developer',
      email: 'mike.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      avatar: 'MR',
      status: 'Away',
      projects: ['Website Redesign', 'Database Migration'],
      skills: ['React', 'TypeScript', 'Node.js'],
      joinDate: '2023-02-10',
      availability: 'Full-time',
      performance: 88,
    },
    {
      id: 4,
      name: 'Alex Kim',
      role: 'Backend Developer',
      email: 'alex.kim@company.com',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      avatar: 'AK',
      status: 'Online',
      projects: ['Mobile App Development', 'Security Audit'],
      skills: ['Python', 'Django', 'PostgreSQL'],
      joinDate: '2023-04-05',
      availability: 'Full-time',
      performance: 90,
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'QA Engineer',
      email: 'lisa.thompson@company.com',
      phone: '+1 (555) 567-8901',
      location: 'Boston, MA',
      avatar: 'LT',
      status: 'Offline',
      projects: ['Mobile App Development', 'Website Redesign'],
      skills: ['Selenium', 'Jest', 'Manual Testing'],
      joinDate: '2023-05-12',
      availability: 'Part-time',
      performance: 87,
    },
    {
      id: 6,
      name: 'David Lee',
      role: 'DevOps Engineer',
      email: 'david.lee@company.com',
      phone: '+1 (555) 678-9012',
      location: 'Denver, CO',
      avatar: 'DL',
      status: 'Online',
      projects: ['Database Migration', 'Security Audit'],
      skills: ['Docker', 'Kubernetes', 'AWS'],
      joinDate: '2023-01-30',
      availability: 'Full-time',
      performance: 93,
    },
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Online':
        return 'bg-green-100 text-green-800';
      case 'Away':
        return 'bg-yellow-100 text-yellow-800';
      case 'Offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Project Manager':
        return 'bg-purple-100 text-purple-700';
      case 'UI/UX Designer':
        return 'bg-pink-100 text-pink-700';
      case 'Frontend Developer':
        return 'bg-blue-100 text-blue-700';
      case 'Backend Developer':
        return 'bg-indigo-100 text-indigo-700';
      case 'QA Engineer':
        return 'bg-orange-100 text-orange-700';
      case 'DevOps Engineer':
        return 'bg-teal-100 text-teal-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const roles = [...new Set(teamMembers.map(member => member.role))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600">Manage your team members and their collaboration.</p>
        </div>
        <button className="btn-primary flex items-center">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{teamMembers.length}</div>
          <div className="text-sm text-gray-600">Total Members</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {teamMembers.filter(m => m.status === 'Online').length}
          </div>
          <div className="text-sm text-gray-600">Online Now</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">
            {teamMembers.filter(m => m.availability === 'Full-time').length}
          </div>
          <div className="text-sm text-gray-600">Full-time</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(teamMembers.reduce((acc, m) => acc + m.performance, 0) / teamMembers.length)}
          </div>
          <div className="text-sm text-gray-600">Avg Performance</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Roles</option>
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="card hover:shadow-md transition-shadow duration-200">
            {/* Member Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary-700">{member.avatar}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{member.location}</span>
              </div>
            </div>

            {/* Performance and Availability */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">{member.performance}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">{member.availability}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {member.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {member.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{member.skills.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Projects */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Current Projects</h4>
              <div className="space-y-1">
                {member.projects.slice(0, 2).map((project, index) => (
                  <div key={index} className="text-sm text-primary-600">
                    • {project}
                  </div>
                ))}
                {member.projects.length > 2 && (
                  <div className="text-sm text-gray-500">
                    +{member.projects.length - 2} more
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 btn-secondary text-sm py-2">
                <Mail className="w-4 h-4 mr-1" />
                Message
              </button>
              <button className="flex-1 btn-primary text-sm py-2">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria.
          </p>
          <button className="btn-primary">Add New Member</button>
        </div>
      )}

      {/* Team Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Summary by Role</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {roles.map(role => (
            <div key={role} className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {teamMembers.filter(m => m.role === role).length}
              </div>
              <div className="text-sm text-gray-600">{role}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Team;
