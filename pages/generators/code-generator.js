import React, { useState } from 'react'
import Link from 'next/link'
import { Loader2, RefreshCw, Copy, Download, ArrowLeft } from 'lucide-react'
import { generateContent } from '../../src/utils/apiClient'

export default function CodeGeneratorPage() {
  const [formData, setFormData] = useState({
    language: 'JavaScript',
    task: '',
    context: '',
    exemplar: '',
    persona: '',
    format: '',
    tone: '',
    constraints: ''
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState('')

  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData(p => ({ ...p, [name]: value })) 
  }

  const generate = async () => {
    setIsGenerating(true); 
    setError(null); 
    setResult('')
    try {
      // Build enhanced prompt using the formula: Task + Context + Exemplar + Persona + Format + Tone
      let prompt = `# Enhanced Code Generation Request\n\n`
      
      // Task [Mandatory]
      prompt += `## Task [Mandatory]\nWrite ${formData.language} code that accomplishes: ${formData.task}\n\n`
      
      // Context [Important]
      if (formData.context) {
        prompt += `## Context [Important]\n${formData.context}\n\n`
      }
      
      // Exemplar [Important]
      if (formData.exemplar) {
        prompt += `## Exemplar [Important]\n${formData.exemplar}\n\n`
      }
      
      // Persona [Nice-to-haves]
      if (formData.persona) {
        prompt += `## Persona [Nice-to-haves]\n${formData.persona}\n\n`
      }
      
      // Format [Nice-to-haves]
      if (formData.format) {
        prompt += `## Format [Nice-to-haves]\n${formData.format}\n\n`
      }
      
      // Tone [Nice-to-haves]
      if (formData.tone) {
        prompt += `## Tone [Nice-to-haves]\n${formData.tone}\n\n`
      }
      
      // Constraints
      if (formData.constraints) {
        prompt += `## Constraints\n${formData.constraints}\n\n`
      }
      
      prompt += `## Output Requirements\n`
      prompt += `Generate comprehensive code following this structure:\n`
      prompt += `1. **Analysis & Planning** - Explain the approach and key considerations\n`
      prompt += `2. **Implementation** - Complete, well-commented code with best practices\n`
      prompt += `3. **Usage Examples** - Practical examples showing how to use the code\n`
      prompt += `4. **Best Practices** - Guidelines for maintainability and performance\n`
      prompt += `5. **Testing** - Unit tests or testing recommendations\n`
      prompt += `6. **Documentation** - Clear documentation and API reference\n\n`
      prompt += `Focus on production-ready, maintainable code with proper error handling, accessibility, and performance considerations.`
      
      const data = await generateContent(prompt, { generatorType: 'code-generator' })
      if (data.success) {
        setResult(data.text)
      } else {
        throw new Error(data.error || 'Generation failed')
      }
    } catch (e) { 
      setError(e.message) 
    } finally { 
      setIsGenerating(false) 
    }
  }

  const copy = async () => { 
    try { 
      await navigator.clipboard.writeText(result) 
    } catch {} 
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4">
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/generator-hub" className="text-gray-500 hover:text-gray-700">
              Pineapple Hub
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Code Generator</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 space-y-4">


            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Code Generator</h2>
              <p className="text-sm sm:text-base text-gray-600">Generate comprehensive, production-ready code using our enhanced formula.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select 
                  name="language" 
                  value={formData.language} 
                  onChange={handleChange} 
                  className="input-field"
                >
                  <option>JavaScript</option>
                  <option>TypeScript</option>
                  <option>Python</option>
                  <option>Go</option>
                  <option>Java</option>
                  <option>React</option>
                  <option>Vue.js</option>
                  <option>Node.js</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone (Nice-to-have)</label>
                <select 
                  name="tone" 
                  value={formData.tone} 
                  onChange={handleChange} 
                  className="input-field"
                >
                  <option value="">Select tone...</option>
                  <option>Professional</option>
                  <option>Educational</option>
                  <option>Beginner-friendly</option>
                  <option>Advanced</option>
                  <option>Concise</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task [Mandatory] <span className="text-red-500">*</span>
              </label>
              <textarea 
                name="task" 
                value={formData.task} 
                onChange={handleChange} 
                rows="3" 
                className="input-field" 
                placeholder="e.g., Create a React component for user authentication with form validation" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Context [Important] <span className="text-orange-500">*</span>
              </label>
              <textarea 
                name="context" 
                value={formData.context} 
                onChange={handleChange} 
                rows="3" 
                className="input-field" 
                placeholder="e.g., This is for a SaaS application using Next.js, TypeScript, and Tailwind CSS. The component should integrate with our existing auth system." 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exemplar [Important] <span className="text-orange-500">*</span>
              </label>
              <textarea 
                name="exemplar" 
                value={formData.exemplar} 
                onChange={handleChange} 
                rows="3" 
                className="input-field" 
                placeholder="e.g., Follow the pattern from shadcn/ui components with proper TypeScript interfaces, accessibility features, and error handling like the Button component." 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Persona (Nice-to-have)</label>
                <input 
                  name="persona" 
                  value={formData.persona} 
                  onChange={handleChange} 
                  placeholder="e.g., Senior React Developer, UI/UX Expert" 
                  className="input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format (Nice-to-have)</label>
                <input 
                  name="format" 
                  value={formData.format} 
                  onChange={handleChange} 
                  placeholder="e.g., Component with TypeScript, Storybook stories, Unit tests" 
                  className="input-field" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Constraints</label>
              <textarea 
                name="constraints" 
                value={formData.constraints} 
                onChange={handleChange} 
                rows="2" 
                className="input-field" 
                placeholder="e.g., No external libraries, must be accessible (WCAG 2.1), performance optimized, include error boundaries" 
              />
            </div>
            
            <button 
              onClick={generate} 
              disabled={isGenerating} 
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Code'
              )}
            </button>
            
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Code</h3>
            {!result ? (
              <p className="text-gray-500">No code yet.</p>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <button 
                    onClick={copy} 
                    className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 flex items-center gap-1"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                  <button 
                    onClick={generate} 
                    disabled={isGenerating} 
                    title="Regenerate" 
                    className="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm whitespace-pre-wrap">
                  <code>{result}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
