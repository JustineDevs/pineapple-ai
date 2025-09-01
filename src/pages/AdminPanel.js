import React, { useState } from 'react';
import { 
  Settings,
  FileText,
  Search,
  Globe,
  BarChart3,
  Users,
  Shield,
  Database,
  Edit3,
  Plus,
  Trash2,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'content', name: 'Content Management', icon: FileText },
    { id: 'seo', name: 'SEO Settings', icon: Search },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'system', name: 'System Config', icon: Database },
  ];

  const [generators, setGenerators] = useState([
    {
      id: 1,
      name: 'Customer Service Bot',
      status: 'active',
      category: 'chatbots',
      lastUpdated: '2024-02-01',
      usage: 2340,
      rating: 4.8,
      seoTitle: 'AI Customer Service Bot Generator - Professional Responses',
      seoDescription: 'Generate professional customer service responses with our AI-powered bot generator. Perfect for e-commerce, SaaS, and retail businesses.',
      keywords: ['customer service', 'chatbot', 'AI generator', 'support responses'],
      content: {
        description: 'AI-powered chatbot for handling customer inquiries and support tickets',
        features: ['24/7 Support', 'Multi-language', 'Ticket Integration'],
        examples: [
          'How can I help you with your order?',
          'I understand your concern. Let me assist you with that.',
          'Your request has been logged. A representative will contact you soon.'
        ]
      }
    },
    {
      id: 2,
      name: 'Blog Content Writer',
      status: 'active',
      category: 'content',
      lastUpdated: '2024-01-28',
      usage: 3150,
      rating: 4.7,
      seoTitle: 'AI Blog Writer - SEO Optimized Content Generator',
      seoDescription: 'Create engaging blog posts with our AI content writer. SEO optimized, plagiarism-free, and customizable tone.',
      keywords: ['blog writer', 'content generator', 'AI writing', 'SEO content'],
      content: {
        description: 'AI-powered blog post generator with SEO optimization',
        features: ['SEO Optimized', 'Multiple Tones', 'Plagiarism Free'],
        examples: [
          'How to implement effective SEO strategies',
          'The future of artificial intelligence in business',
          '10 ways to improve customer satisfaction'
        ]
      }
    }
  ]);

  const [seoSettings, setSeoSettings] = useState({
    siteTitle: 'AI Generator Hub - Professional AI Tools',
    siteDescription: 'Discover and use our collection of AI-powered generators for chatbots, content creation, visual design, and technical solutions.',
    defaultKeywords: 'AI generators, chatbot tools, content creation, AI writing',
    ogImage: '/images/og-image.jpg',
    canonicalUrl: 'https://aigeneratorhub.com',
    robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://aigeneratorhub.com/sitemap.xml'
  });

  const [analytics, setAnalytics] = useState({
    totalUsers: 15420,
    totalGenerations: 89234,
    monthlyGrowth: 23.5,
    topGenerators: [
      { name: 'Customer Service Bot', usage: 2340, growth: 15.2 },
      { name: 'Blog Content Writer', usage: 3150, growth: 28.7 },
      { name: 'Code Generator', usage: 4200, growth: 42.1 }
    ],
    userEngagement: {
      averageSession: '4m 32s',
      bounceRate: '23.4%',
      conversionRate: '8.7%'
    }
  });

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add New Generator
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search generators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option value="all">All Categories</option>
          <option value="chatbots">Chatbots</option>
          <option value="content">Content</option>
          <option value="visual">Visual</option>
        </select>
      </div>

      {/* Generators Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {generators.map((generator) => (
                <tr key={generator.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{generator.name}</div>
                      <div className="text-sm text-gray-500">{generator.content.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      generator.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {generator.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {generator.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {generator.usage.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{generator.rating}</span>
                      <span className="text-yellow-400 ml-1">★</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {generator.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">SEO Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic SEO</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
              <input
                type="text"
                value={seoSettings.siteTitle}
                onChange={(e) => setSeoSettings(prev => ({ ...prev, siteTitle: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
              <textarea
                value={seoSettings.siteDescription}
                onChange={(e) => setSeoSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                rows={3}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Keywords</label>
              <input
                type="text"
                value={seoSettings.defaultKeywords}
                onChange={(e) => setSeoSettings(prev => ({ ...prev, defaultKeywords: e.target.value }))}
                className="input-field"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media & Advanced</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
              <input
                type="text"
                value={seoSettings.ogImage}
                onChange={(e) => setSeoSettings(prev => ({ ...prev, ogImage: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
              <input
                type="text"
                value={seoSettings.canonicalUrl}
                onChange={(e) => setSeoSettings(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Robots.txt</label>
              <textarea
                value={seoSettings.robotsTxt}
                onChange={(e) => setSeoSettings(prev => ({ ...prev, robotsTxt: e.target.value }))}
                rows={4}
                className="input-field font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Save SEO Settings
        </button>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{analytics.totalUsers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">{analytics.totalGenerations.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Generations</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-600">{analytics.monthlyGrowth}%</div>
          <div className="text-sm text-gray-600">Monthly Growth</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600">{analytics.userEngagement.conversionRate}</div>
          <div className="text-sm text-gray-600">Conversion Rate</div>
        </div>
      </div>

      {/* Top Generators */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Generators</h3>
        <div className="space-y-4">
          {analytics.topGenerators.map((generator, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-bold">{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{generator.name}</div>
                  <div className="text-sm text-gray-500">{generator.usage.toLocaleString()} uses</div>
                </div>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+{generator.growth}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Engagement */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{analytics.userEngagement.averageSession}</div>
            <div className="text-sm text-gray-600">Average Session</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{analytics.userEngagement.bounceRate}</div>
            <div className="text-sm text-gray-600">Bounce Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{analytics.userEngagement.conversionRate}</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">User Accounts</h3>
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">JD</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-500">john.doe@company.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                <div className="text-sm text-gray-500">Require 2FA for all admin accounts</div>
              </div>
              <button className="btn-primary">Enable</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Session Timeout</div>
                <div className="text-sm text-gray-500">Auto-logout after 30 minutes</div>
              </div>
              <button className="btn-secondary">Configure</button>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Control</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">IP Whitelist</div>
                <div className="text-sm text-gray-500">Restrict admin access to specific IPs</div>
              </div>
              <button className="btn-secondary">Configure</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Audit Logging</div>
                <div className="text-sm text-gray-500">Track all admin actions</div>
              </div>
              <button className="btn-primary">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemConfig = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">System Configuration</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Cache Settings</div>
                <div className="text-sm text-gray-500">Configure response caching</div>
              </div>
              <button className="btn-secondary">Configure</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Rate Limiting</div>
                <div className="text-sm text-gray-500">API request limits</div>
              </div>
              <button className="btn-secondary">Configure</button>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup & Maintenance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Auto Backup</div>
                <div className="text-sm text-gray-500">Daily database backups</div>
              </div>
              <button className="btn-primary">Enable</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Maintenance Mode</div>
                <div className="text-sm text-gray-500">Temporarily disable site</div>
              </div>
              <button className="btn-secondary">Configure</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return renderContentManagement();
      case 'seo':
        return renderSEOSettings();
      case 'analytics':
        return renderAnalytics();
      case 'users':
        return renderUserManagement();
      case 'security':
        return renderSecurity();
      case 'system':
        return renderSystemConfig();
      default:
        return renderContentManagement();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage your AI Generator Hub configuration and content.</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Admin User</span>
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-bold text-sm">A</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-screen">
        {renderTabContent()}
      </div>
      </div>
    </div>
  );
};

export default AdminPanel;
