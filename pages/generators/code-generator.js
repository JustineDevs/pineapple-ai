import React, { useState } from 'react'
import Link from 'next/link'
import { Loader2, RefreshCw, Copy, Download, ArrowLeft } from 'lucide-react'
import { generateContent } from '../../src/utils/apiClient'

export default function CodeGeneratorPage() {
  const [formData, setFormData] = useState({
    language: 'JavaScript',
    task: '',
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
      const prompt = `Write ${formData.language} code that accomplishes the following task: ${formData.task}. ${formData.constraints ? 'Constraints: ' + formData.constraints : ''}. Include inline comments explaining key steps.`
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
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Constraints (optional)</label>
                <input 
                  name="constraints" 
                  value={formData.constraints} 
                  onChange={handleChange} 
                  placeholder="e.g., no external libs, O(n)" 
                  className="input-field" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
              <textarea 
                name="task" 
                value={formData.task} 
                onChange={handleChange} 
                rows="4" 
                className="input-field" 
                placeholder="e.g., parse CSV and output JSON" 
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
