import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { 
      prompt, 
      businessType, 
      industry, 
      tone, 
      language, 
      responseLength,
      specificScenario,
      customerQuery,
      generatorType 
    } = req.body

    // Build the complete prompt for the AI based on generator type
    let fullPrompt = ''
    let systemPrompt = ''

    switch (generatorType) {
      case 'customer-service':
        systemPrompt = "You are a professional customer service expert. Generate helpful, empathetic, and solution-oriented responses. Use plain text formatting only - no markdown, no asterisks, no bold formatting. Write in clear, professional language."
        fullPrompt = `Generate a professional customer service response for a ${businessType} business in the ${industry} industry.`
        if (tone) fullPrompt += ` Use a ${tone} tone.`
        if (language) fullPrompt += ` Respond in ${language}.`
        if (responseLength) fullPrompt += ` Keep the response ${responseLength}.`
        if (specificScenario) fullPrompt += ` Scenario: ${specificScenario}`
        if (customerQuery) fullPrompt += ` Customer query: ${customerQuery}`
        break

      case 'sales-assistant':
        systemPrompt = "You are a professional sales assistant. Generate persuasive, consultative responses that address customer objections and highlight value propositions. Use plain text formatting only - no markdown, no asterisks, no bold formatting. Write in clear, professional language."
        fullPrompt = `Generate a sales assistant response for a ${businessType} business in the ${industry} industry.`
        if (tone) fullPrompt += ` Use a ${tone} tone.`
        if (language) fullPrompt += ` Respond in ${language}.`
        if (responseLength) fullPrompt += ` Keep the response ${responseLength}.`
        if (specificScenario) fullPrompt += ` Scenario: ${specificScenario}`
        if (customerQuery) fullPrompt += ` Customer objection: ${customerQuery}`
        break

      case 'blog-writer':
        systemPrompt = "You are a professional content writer. Generate engaging, informative blog content that provides value to readers. Use plain text formatting only - no markdown, no asterisks, no bold formatting. Write in clear, professional language with proper paragraph breaks."
        fullPrompt = `Generate blog content for a ${businessType} business in the ${industry} industry.`
        if (tone) fullPrompt += ` Use a ${tone} tone.`
        if (language) fullPrompt += ` Write in ${language}.`
        if (responseLength) fullPrompt += ` Keep the content ${responseLength}.`
        if (specificScenario) fullPrompt += ` Topic: ${specificScenario}`
        break

      case 'email-campaign':
        systemPrompt = "You are a professional email marketing specialist. Generate compelling email campaigns that drive engagement and conversions. Use plain text formatting only - no markdown, no asterisks, no bold formatting. Write in clear, professional language."
        fullPrompt = `Generate an email campaign for a ${businessType} business in the ${industry} industry.`
        if (tone) fullPrompt += ` Use a ${tone} tone.`
        if (language) fullPrompt += ` Write in ${language}.`
        if (responseLength) fullPrompt += ` Keep the email ${responseLength}.`
        if (specificScenario) fullPrompt += ` Campaign type: ${specificScenario}`
        break

      case 'logo-design':
        systemPrompt = "You are a professional logo design consultant. Generate detailed logo design briefs and specifications that help designers create effective brand identities. Use plain text formatting only - no markdown, no asterisks, no bold formatting. Write in clear, professional language."
        fullPrompt = `Generate a logo design brief for a ${businessType} business in the ${industry} industry.`
        if (tone) fullPrompt += ` Use a ${tone} tone.`
        if (language) fullPrompt += ` Write in ${language}.`
        if (responseLength) fullPrompt += ` Keep the brief ${responseLength}.`
        if (specificScenario) fullPrompt += ` Brand details: ${specificScenario}`
        break

      case 'code-generator':
        systemPrompt = "You are a professional software developer. Generate clean, well-commented code that follows best practices. Use plain text formatting only - no markdown, no asterisks, no bold formatting. Write clear, readable code with proper indentation."
        fullPrompt = `Generate code for a ${businessType} business in the ${industry} industry.`
        if (tone) fullPrompt += ` Use a ${tone} tone.`
        if (language) fullPrompt += ` Write in ${language}.`
        if (responseLength) fullPrompt += ` Keep the code ${responseLength}.`
        if (specificScenario) fullPrompt += ` Task: ${specificScenario}`
        break

      default:
        systemPrompt = "You are a professional AI assistant. Generate helpful, accurate responses. Use plain text formatting only - no markdown, no asterisks, no bold formatting. Write in clear, professional language."
        fullPrompt = `Generate a response for a ${businessType} business in the ${industry} industry.`
        if (tone) fullPrompt += ` Use a ${tone} tone.`
        if (language) fullPrompt += ` Respond in ${language}.`
        if (responseLength) fullPrompt += ` Keep the response ${responseLength}.`
        if (specificScenario) fullPrompt += ` Scenario: ${specificScenario}`
        if (customerQuery) fullPrompt += ` Query: ${customerQuery}`
    }
    
    fullPrompt += `\n\n${prompt}`

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using the more affordable model
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: fullPrompt
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
    })

    let generatedText = completion.choices[0].message.content

    // Clean up any remaining markdown formatting
    generatedText = generatedText
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
      .replace(/`(.*?)`/g, '$1') // Remove code markdown
      .replace(/^#+\s*/gm, '') // Remove heading markdown
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove link markdown
      .replace(/^\s*[-*+]\s*/gm, '• ') // Convert list markers to bullets
      .replace(/^\s*\d+\.\s*/gm, '') // Remove numbered list markers
      .trim()

    // Return the generated response
    res.status(200).json({ 
      success: true,
      text: generatedText,
      usage: completion.usage,
      model: completion.model
    })

  } catch (error) {
    console.error('AI Generation Error:', error)
    
    // Handle different types of errors
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: 'API quota exceeded. Please try again later or upgrade your plan.',
        code: 'QUOTA_EXCEEDED'
      })
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: 'Invalid API key. Please check your configuration.',
        code: 'INVALID_API_KEY'
      })
    }

    res.status(500).json({ 
      error: 'AI generation failed. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}
