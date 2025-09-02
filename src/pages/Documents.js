import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  FileText,
  Image,
  File,
  Folder,
  Download,
  Share2,
  Eye,
  Calendar,
  User,
  HardDrive
} from 'lucide-react';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const documents = [
    {
      id: 1,
      name: 'Project Requirements Document',
      type: 'PDF',
      size: '2.4 MB',
      category: 'Project Planning',
      project: 'Website Redesign',
      uploadedBy: 'John Doe',
      uploadDate: '2024-01-15',
      lastModified: '2024-01-20',
      tags: ['Requirements', 'Planning', 'Design'],
      downloads: 45,
      shared: true,
    },
    {
      id: 2,
      name: 'Design Mockups - Homepage',
      type: 'Figma',
      size: '15.7 MB',
      category: 'Design Assets',
      project: 'Website Redesign',
      uploadedBy: 'Sarah Miller',
      uploadDate: '2024-01-18',
      lastModified: '2024-01-25',
      tags: ['Design', 'Mockups', 'UI/UX'],
      downloads: 23,
      shared: true,
    },
    {
      id: 3,
      name: 'API Documentation v2.1',
      type: 'Markdown',
      size: '156 KB',
      category: 'Technical Docs',
      project: 'Mobile App Development',
      uploadedBy: 'Alex Kim',
      uploadDate: '2024-01-20',
      lastModified: '2024-01-28',
      tags: ['API', 'Documentation', 'Technical'],
      downloads: 67,
      shared: false,
    },
    {
      id: 4,
      name: 'Database Schema Diagram',
      type: 'PNG',
      size: '892 KB',
      category: 'Technical Docs',
      project: 'Database Migration',
      uploadedBy: 'David Lee',
      uploadDate: '2024-01-22',
      lastModified: '2024-01-22',
      tags: ['Database', 'Schema', 'Technical'],
      downloads: 34,
      shared: true,
    },
    {
      id: 5,
      name: 'Marketing Campaign Brief',
      type: 'DOCX',
      size: '1.2 MB',
      category: 'Marketing',
      project: 'Marketing Campaign',
      uploadedBy: 'Rachel Brown',
      uploadDate: '2024-01-25',
      lastModified: '2024-01-30',
      tags: ['Marketing', 'Campaign', 'Brief'],
      downloads: 18,
      shared: true,
    },
    {
      id: 6,
      name: 'Security Audit Report',
      type: 'PDF',
      size: '3.8 MB',
      category: 'Reports',
      project: 'Security Audit',
      uploadedBy: 'Mark Smith',
      uploadDate: '2024-01-28',
      lastModified: '2024-01-28',
      tags: ['Security', 'Audit', 'Report'],
      downloads: 12,
      shared: false,
    },
    {
      id: 7,
      name: 'User Research Findings',
      type: 'PDF',
      size: '4.2 MB',
      category: 'Research',
      project: 'Website Redesign',
      uploadedBy: 'Sarah Miller',
      uploadDate: '2024-01-30',
      lastModified: '2024-01-30',
      tags: ['Research', 'User Experience', 'Findings'],
      downloads: 29,
      shared: true,
    },
    {
      id: 8,
      name: 'Development Timeline',
      type: 'XLSX',
      size: '89 KB',
      category: 'Project Planning',
      project: 'Mobile App Development',
      uploadedBy: 'John Doe',
      uploadDate: '2024-02-01',
      lastModified: '2024-02-01',
      tags: ['Timeline', 'Planning', 'Development'],
      downloads: 31,
      shared: true,
    },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'Figma':
        return <Image className="w-8 h-8 text-purple-500" alt="Figma file" />;
      case 'PNG':
        return <Image className="w-8 h-8 text-green-500" alt="PNG file" />;
      case 'DOCX':
        return <FileText className="w-8 h-8 text-blue-500" />;
      case 'XLSX':
        return <FileText className="w-8 h-8 text-green-600" />;
      case 'Markdown':
        return <File className="w-8 h-8 text-gray-500" />;
      default:
        return <File className="w-8 h-8 text-gray-400" />;
    }
  };

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-100 text-red-700';
      case 'Figma':
        return 'bg-purple-100 text-purple-700';
      case 'PNG':
        return 'bg-green-100 text-green-700';
      case 'DOCX':
        return 'bg-blue-100 text-blue-700';
      case 'XLSX':
        return 'bg-green-100 text-green-700';
      case 'Markdown':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const categories = [...new Set(documents.map(doc => doc.category))];
  const fileTypes = [...new Set(documents.map(doc => doc.type))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage and organize all your project documents.</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Upload Document
        </button>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">{documents.length}</div>
          <div className="text-sm text-gray-600">Total Documents</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {documents.filter(d => d.shared).length}
          </div>
          <div className="text-sm text-gray-600">Shared</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(documents.reduce((acc, d) => acc + d.downloads, 0) / documents.length)}
          </div>
          <div className="text-sm text-gray-600">Avg Downloads</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {categories.length}
          </div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          {fileTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <div className="flex border border-gray-300 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 text-sm font-medium ${
              viewMode === 'grid'
                ? 'bg-primary-50 text-primary-700 border-r border-gray-300'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 text-sm font-medium ${
              viewMode === 'list'
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Documents Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="card hover:shadow-md transition-shadow duration-200">
              {/* Document Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getFileIcon(doc.type)}
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-2">{doc.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(doc.type)}`}>
                      {doc.type}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Document Meta */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Folder className="w-4 h-4 mr-2" />
                  <span>{doc.category}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <HardDrive className="w-4 h-4 mr-2" />
                  <span>{doc.size}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>{doc.uploadedBy}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Modified: {doc.lastModified}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {doc.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {doc.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{doc.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{doc.downloads} downloads</span>
                  {doc.shared && (
                    <span className="text-green-600">Shared</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-4">
                {getFileIcon(doc.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{doc.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{doc.category}</span>
                        <span>{doc.size}</span>
                        <span>{doc.uploadedBy}</span>
                        <span>Modified: {doc.lastModified}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{doc.downloads} downloads</span>
                      {doc.shared && (
                        <span className="text-sm text-green-600">Shared</span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(doc.type)}`}>
                        {doc.type}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-wrap gap-2">
                      {doc.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria.
          </p>
          <button className="btn-primary">Upload Document</button>
        </div>
      )}

      {/* Document Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Summary by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(category => (
            <div key={category} className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {documents.filter(d => d.category === category).length}
              </div>
              <div className="text-sm text-gray-600">{category}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Documents;
