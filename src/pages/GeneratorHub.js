import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Zap, 
  Star, 
  ArrowRight, 
  Search, 
  TrendingUp, 
  MessageSquare,
  Bot,
  FileText,
  Code,
  Mail,
  Palette,
  MessageCircle
} from 'lucide-react';

const GeneratorHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', count: 6 },
    { id: 'chatbot', name: 'Chatbot', count: 2 },
    { id: 'content', name: 'Content', count: 2 },
    { id: 'design', name: 'Design', count: 1 },
    { id: 'technical', name: 'Technical', count: 1 },
  ];

  const generators = [
    {
      id: 1,
      name: 'Customer Service Bot',
      description: 'Generate professional customer service responses for common inquiries and support scenarios.',
      category: 'chatbot',
      features: ['Multi-language support', 'Tone customization', 'Industry-specific responses'],
      rating: 4.8,
      usage: '2.3k',
      featured: true,
      url: '/generators/customer-service-bot',
      icon: MessageCircle
    },
    {
      id: 2,
      name: 'Sales Assistant Bot',
      description: 'Create persuasive sales responses that address objections and drive conversions.',
      category: 'chatbot',
      features: ['Objection handling', 'Value proposition', 'Call-to-action optimization'],
      rating: 4.7,
      usage: '1.9k',
      featured: true,
      url: '/generators/sales-assistant-bot',
      icon: Bot
    },
    {
      id: 3,
      name: 'Blog Content Writer',
      description: 'Generate engaging blog posts, articles, and long-form content with SEO optimization.',
      category: 'content',
      features: ['SEO optimization', 'Multiple formats', 'Tone variety'],
      rating: 4.6,
      usage: '3.1k',
      featured: true,
      url: '/generators/blog-content-writer',
      icon: FileText
    },
    {
      id: 4,
      name: 'Email Campaign Generator',
      description: 'Create compelling email campaigns for marketing, onboarding, and customer engagement.',
      category: 'content',
      features: ['Campaign templates', 'A/B testing', 'Personalization'],
      rating: 4.5,
      usage: '2.7k',
      featured: false,
      url: '/generators/email-campaign-generator',
      icon: Mail
    },
    {
      id: 5,
      name: 'Logo Design Generator',
      description: 'Generate creative logo concepts and design briefs for brand identity projects.',
      category: 'design',
      features: ['Style variations', 'Industry themes', 'Color schemes'],
      rating: 4.4,
      usage: '1.5k',
      featured: false,
      url: '/generators/logo-design-generator',
      icon: Palette
    },
    {
      id: 6,
      name: 'Code Generator',
      description: 'Generate code snippets, functions, and scripts in multiple programming languages.',
      category: 'technical',
      features: ['Multiple languages', 'Documentation', 'Best practices'],
      rating: 4.3,
      usage: '4.2k',
      featured: false,
      url: '/generators/code-generator',
      icon: Code
    }
  ];

  const filteredGenerators = useMemo(() => {
    return generators.filter(generator => {
      const matchesSearch = searchTerm === '' || 
        generator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        generator.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || generator.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredGenerators = generators.filter(g => g.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 lg:space-y-6">
          <div className="flex items-center justify-center space-x-2 text-primary-600 mb-4">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Pineapple AI Hub</h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover and use our collection of AI-powered generators for chatbots, content creation, 
            visual design, and technical solutions. Boost your productivity with intelligent automation.
          </p>
          
          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <Link href="/signup" className="btn-primary flex items-center text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto justify-center">
              <Zap className="w-5 h-5 mr-2" />
              Get Started Free
            </Link>
            <button className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto">
              View Examples
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search generators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 text-lg"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Generators */}
        {searchTerm === '' && selectedCategory === 'all' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Featured Generators</h2>
              <Link href="/generators" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGenerators.map((generator) => (
                <div key={generator.id} className="card hover:shadow-lg transition-shadow duration-200 border-2 border-primary-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <generator.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{generator.name}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{generator.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{generator.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {generator.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{generator.usage} uses</span>
                    <Link href={generator.url} className="btn-primary">
                      Try Generator
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Generators Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchTerm || selectedCategory !== 'all' ? 'Search Results' : 'All Generators'}
            </h2>
            <span className="text-gray-500">{filteredGenerators.length} generators</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGenerators.map((generator) => (
              <div key={generator.id} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <generator.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{generator.name}</h3>
                      <span className="text-xs text-gray-500 capitalize">{generator.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{generator.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{generator.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {generator.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{generator.usage} uses</span>
                  <Link href={generator.url} className="btn-primary">
                    Try Generator
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredGenerators.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No generators found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our AI Generators?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                    <p className="text-sm text-gray-600">Generate high-quality content in seconds, not hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">SEO Optimized</h3>
                    <p className="text-sm text-gray-600">Built-in SEO best practices for better search rankings</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Powered</h3>
                    <p className="text-sm text-gray-600">Advanced AI models trained on millions of examples</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Customizable</h3>
                    <p className="text-sm text-gray-600">Tailor outputs to match your brand voice and style</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">How accurate are the AI generators?</h3>
                <p className="text-gray-600">Our AI models are trained on high-quality data and continuously improved. They provide accurate, relevant outputs that can be easily customized for your specific needs.</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Can I use the generated content commercially?</h3>
                <p className="text-gray-600">Yes! All content generated through our platform is free for commercial use. You own the rights to any content you create.</p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">What languages do you support?</h3>
                <p className="text-gray-600">We currently support English, Spanish, French, German, and Italian. More languages are being added regularly.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is there a limit on usage?</h3>
                <p className="text-gray-600">Free accounts have a monthly limit of 100 generations. Premium plans offer unlimited usage with priority support and advanced features.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorHub;
