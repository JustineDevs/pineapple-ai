// Client-side API utility for static deployment
// This replaces server-side API routes with client-side calls

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.openai.com/v1'

export class APIClient {
  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
  }

  async generateContent(prompt, options = {}) {
    const {
      businessType = '',
      industry = '',
      tone = 'professional',
      language = 'English',
      responseLength = 'medium',
      specificScenario = '',
      customerQuery = '',
      generatorType = 'customer-service'
    } = options

    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured. Please set NEXT_PUBLIC_OPENAI_API_KEY in your environment variables.')
    }

    // Build the system prompt based on generator type
    let systemPrompt = this.getSystemPrompt(generatorType)
    
    // Build the full prompt
    let fullPrompt = ''
    
    if (businessType) fullPrompt += `Business Type: ${businessType}\n`
    if (industry) fullPrompt += `Industry: ${industry}\n`
    if (tone) fullPrompt += `Tone: ${tone}\n`
    if (language) fullPrompt += `Language: ${language}\n`
    if (responseLength) fullPrompt += `Response Length: ${responseLength}\n`
    if (specificScenario) fullPrompt += `Specific Scenario: ${specificScenario}\n`
    if (customerQuery) fullPrompt += `Customer Query: ${customerQuery}\n`
    
    fullPrompt += `\n${prompt}`

    try {
      const response = await fetch(`${API_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: fullPrompt
            }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'API request failed')
      }

      const data = await response.json()
      let generatedText = data.choices[0].message.content

      // Clean up markdown formatting
      generatedText = generatedText
        .replace(/```markdown\n/g, '')
        .replace(/```\n/g, '')
        .replace(/```/g, '')
        .trim()

      return {
        success: true,
        text: generatedText,
        usage: data.usage,
        model: data.model
      }
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  getSystemPrompt(generatorType) {
    const prompts = {
      'customer-service': `You are a professional customer service representative. Provide helpful, empathetic, and solution-oriented responses. Always maintain a positive tone and focus on resolving the customer's issue.`,
      'sales-assistant': `You are a professional sales assistant. Help prospects understand the value proposition, address objections, and guide them toward making a purchase decision. Be persuasive but not pushy.`,
      'blog-writer': `You are a professional content writer. Create engaging, informative, and SEO-friendly blog content. Use proper formatting, include relevant keywords, and maintain a consistent tone throughout.`,
      'email-campaign': `You are a professional email marketing specialist. Create compelling email campaigns that drive engagement and conversions. Use persuasive copy, clear CTAs, and proper email formatting.`,
      'logo-design': `You are a professional logo designer. Provide detailed design briefs, color recommendations, and style guidelines for creating effective logos that represent the brand's identity.`,
      'code-generator': `You are a professional software developer. Generate clean, efficient, and well-documented code. Follow best practices, include proper error handling, and provide clear explanations.`
    }
    
    return prompts[generatorType] || prompts['customer-service']
  }
}

// Export a default instance
export const apiClient = new APIClient()

// Export utility functions
export const generateContent = (prompt, options) => apiClient.generateContent(prompt, options)
