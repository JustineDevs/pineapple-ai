# 🍍 Pineapple AI - AI Generator Hub

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

![Pineapple AI](https://img.shields.io/badge/Pineapple_AI-AI_Generator_Hub-blue?style=for-the-badge&logo=robot)
![Status](https://img.shields.io/badge/Status-Production_Ready-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>

A modern, AI-powered platform for generating professional customer service responses and chatbot content. Built with Next.js, React, and Tailwind CSS, featuring seamless integration with OpenAI API and local LLM options.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JustineDevs/pineapple-ai
   cd pineapple-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run clean` - Clean build artifacts
- `npm run preview` - Build and preview production

## 🎯 Core Features

| Feature | Description | Status |
|---------|-------------|---------|
| 🤖 **AI Generation** | OpenAI GPT-4o-mini & Local LLM support | ✅ Ready |
| 📱 **Responsive Design** | Mobile-first, tablet & desktop optimized | ✅ Ready |
| 🔄 **Real-time Generation** | Instant AI response generation | ✅ Ready |
| 🎨 **Multiple Generators** | 6 specialized AI generators | ✅ Ready |
| 🔒 **Secure API** | Environment-based API key management | ✅ Ready |
| 📊 **Dashboard Analytics** | Project management & insights | ✅ Ready |

## 🧪 Example Prompts for Demo

### 1. Customer Service Bot
**Form Fields with Example Data:**

| Field | Example Value |
|-------|---------------|
| **Business Type** | `E-commerce` |
| **Industry** | `Online Retail` |
| **Tone** | `Professional` |
| **Language** | `English` |
| **Response Length** | `Medium` |
| **Specific Scenario** | `Order delivery issue` |
| **Customer Query** | `"My order #12345 hasn't arrived after 2 weeks. I need it urgently for an event this weekend. Can you help me track it or arrange expedited shipping?"` |

**Complete Prompt Generated:**
```
Generate a professional customer service response

Business Type: E-commerce
Industry: Online Retail
Tone: Professional
Language: English
Response Length: Medium
Specific Scenario: Order delivery issue
Customer Query: "My order #12345 hasn't arrived after 2 weeks. I need it urgently for an event this weekend. Can you help me track it or arrange expedited shipping?"
```

---

### 2. Sales Assistant Bot
**Form Fields with Example Data:**

| Field | Example Value |
|-------|---------------|
| **Product** | `AI-powered CRM platform` |
| **Customer Profile** | `SMB e-commerce operations manager` |
| **Key Objection** | `Concerned about migration complexity and hidden costs` |
| **Tone** | `Friendly` |
| **Language** | `English` |
| **Response Length** | `Medium` |

**Complete Prompt Generated:**
```
Act as a SaaS sales assistant. Craft a Medium response in English using a Friendly tone. Product: AI-powered CRM platform. Customer profile: SMB e-commerce operations manager. Handle objection: Concerned about migration complexity and hidden costs. Include one probing question and one CTA to schedule a demo.
```

---

### 3. Blog Content Writer
**Form Fields with Example Data:**

| Field | Example Value |
|-------|---------------|
| **Topic** | `"10 Ways to Improve Customer Retention in 2024"` |
| **Audience** | `SaaS startup founders and marketing managers` |
| **Tone** | `Professional` |
| **Language** | `English` |
| **Outline** | `Introduction, 10 actionable strategies with examples, implementation tips, conclusion with next steps` |
| **Length** | `Medium` |

**Complete Prompt Generated:**
```
Write a blog post about "10 Ways to Improve Customer Retention in 2024" for an audience of SaaS startup founders and marketing managers. Use a Professional tone in English. Target length: Medium. Follow this outline: Introduction, 10 actionable strategies with examples, implementation tips, conclusion with next steps
```

---

### 4. Email Campaign Generator
**Form Fields with Example Data:**

| Field | Example Value |
|-------|---------------|
| **Campaign Type** | `Promotional` |
| **Goal** | `Drive sign-ups for free trial` |
| **Audience** | `Small business owners interested in productivity tools` |
| **Product** | `AI-powered project management software` |
| **Tone** | `Friendly` |
| **Language** | `English` |

**Complete Prompt Generated:**
```
Write a Promotional email in English with a Friendly tone. Goal: Drive sign-ups for free trial. Audience: Small business owners interested in productivity tools. Product/Offer: AI-powered project management software. Include a compelling subject line and a clear CTA button copy.
```

---

### 5. Logo Design Generator
**Form Fields with Example Data:**

| Field | Example Value |
|-------|---------------|
| **Brand** | `TechFlow Solutions` |
| **Tagline** | `"Streamline Your Workflow"` |
| **Values** | `Innovation, efficiency, reliability, user-friendly` |
| **Style** | `Modern` |
| **Colors** | `Blue (#3B82F6) and white with accent orange (#F97316)` |
| **Usage** | `Web and App` |

**Complete Prompt Generated:**
```
Create a professional logo design brief. Brand: TechFlow Solutions. Tagline: "Streamline Your Workflow". Core values: Innovation, efficiency, reliability, user-friendly. Preferred style: Modern. Color preferences: Blue (#3B82F6) and white with accent orange (#F97316). Primary usage: Web and App. Include: concept directions (3), typography suggestions, color palette (hex), usage notes, and negative space/monogram ideas.
```

---

### 6. Code Generator
**Form Fields with Example Data:**

| Field | Example Value |
|-------|---------------|
| **Language** | `React` |
| **Task [Mandatory]** | `Create a reusable toggle switch component with accessibility features` |
| **Context [Important]** | `This is for a SaaS dashboard using Next.js, TypeScript, and Tailwind CSS. The component should integrate with our design system and support theming.` |
| **Exemplar [Important]** | `Follow the pattern from shadcn/ui components with proper TypeScript interfaces, ARIA attributes, keyboard navigation, and error handling like the Button component.` |
| **Persona (Nice-to-have)** | `Senior React Developer with expertise in accessibility and design systems` |
| **Format (Nice-to-have)** | `Component with TypeScript interfaces, Storybook stories, Unit tests, and comprehensive documentation` |
| **Tone (Nice-to-have)** | `Professional` |
| **Constraints** | `Must be accessible (WCAG 2.1), support controlled/uncontrolled modes, include error boundaries, and be performance optimized` |

**Complete Prompt Generated:**
```
# Enhanced Code Generation

## Task [Mandatory]
Write React code that accomplishes: Create a reusable toggle switch component with accessibility features

## Context [Important]
This is for a SaaS dashboard using Next.js, TypeScript, and Tailwind CSS. The component should integrate with our design system and support theming.

## Exemplar [Important]
Follow the pattern from shadcn/ui components with proper TypeScript interfaces, ARIA attributes, keyboard navigation, and error handling like the Button component.

## Persona [Nice-to-haves]
Senior React Developer with expertise in accessibility and design systems

## Format [Nice-to-haves]
Component with TypeScript interfaces, Storybook stories, Unit tests, and comprehensive documentation

## Tone [Nice-to-haves]
Professional

## Constraints
Must be accessible (WCAG 2.1), support controlled/uncontrolled modes, include error boundaries, and be performance optimized

## Output Requirements
Generate comprehensive code following this structure:
1. **Analysis & Planning** - Explain the approach and key considerations
2. **Implementation** - Complete, well-commented code with best practices
3. **Usage Examples** - Practical examples showing how to use the code
4. **Best Practices** - Guidelines for maintainability and performance
5. **Testing** - Unit tests or testing recommendations
6. **Documentation** - Clear documentation and API reference

Focus on production-ready, maintainable code with proper error handling, accessibility, and performance considerations.
```

---

## 🎯 Quick Demo Scenarios

### Scenario 1: E-commerce Support
**Use Case:** Customer service response for delayed order
**Generator:** Customer Service Bot
**Form Fill:**
- Business Type: E-commerce
- Industry: Fashion Retail
- Tone: Empathetic
- Customer Query: "My wedding dress order is late and my wedding is in 3 days!"

### Scenario 2: SaaS Sales
**Use Case:** Overcoming pricing objections
**Generator:** Sales Assistant Bot
**Form Fill:**
- Product: Cloud-based accounting software
- Customer Profile: Restaurant owner
- Key Objection: "I don't trust cloud security with my financial data"
- Tone: Consultative

### Scenario 3: Content Marketing
**Use Case:** SEO blog post creation
**Generator:** Blog Content Writer
**Form Fill:**
- Topic: "Best Practices for Remote Team Management"
- Audience: HR professionals and team leaders
- Tone: Educational
- Outline: Problem statement, 5 key practices, tools recommendations, conclusion

### Scenario 4: Product Launch
**Use Use:** Email campaign for new feature
**Generator:** Email Campaign Generator
**Form Fill:**
- Campaign Type: Product Announcement
- Goal: Increase feature adoption
- Audience: Existing customers
- Product: New AI-powered analytics dashboard

### Scenario 5: Brand Identity
**Use Case:** Logo design for startup
**Generator:** Logo Design Generator
**Form Fill:**
- Brand: GreenTech Innovations
- Tagline: "Sustainable Solutions for Tomorrow"
- Values: Environmental responsibility, innovation, growth
- Style: Clean and modern

### Scenario 6: Development Helper
**Use Case:** Utility function creation
**Generator:** Code Generator
**Form Fill:**
- Language: Python
- Task: Create a function to format phone numbers
- Constraints: Handle multiple formats, return standardized format, include error handling



## 🌐 Deployment

### Vercel Deployment (Recommended)

✅ **Successfully Deployed!** 

**Live URL**: https://pineapple-ai.vercel.app/

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy with Vercel**
   ```bash
   vercel --prod
   ```
   - Connect your GitHub repo to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically on every push

### Environment Variables Required

Set these in your Vercel dashboard:

**For Static Deployment (Recommended):**
- `NEXT_PUBLIC_OPENAI_API_KEY` - Your OpenAI API key (client-side)
- `NEXT_PUBLIC_API_BASE_URL` - API base URL (default: https://api.openai.com/v1)

**For Server-side API (if using server functions):**
- `OPENAI_API_KEY` - Your OpenAI API key (server-side)
- `LOCAL_LLM_API_URL` - (Optional) Local LLM endpoint
- `LOCAL_LLM_API_KEY` - (Optional) Local LLM API key
- `LOCAL_LLM_MODEL` - (Optional) Local LLM model name

### Static Deployment Benefits

✅ **Fixed Issues:**
- ✅ Blank/white screen resolved
- ✅ 404 errors fixed
- ✅ Proper routing with static export
- ✅ Client-side API integration
- ✅ No server-side dependencies

**Note:** The application now uses client-side API calls for AI generation, which works perfectly with static deployment on Vercel.

## 🧪 Testing & Quality Assurance

### Development Testing

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Build for production
npm run build

# Start production server
npm start

# Clean build artifacts
npm run clean
```

### Code Quality Features

- **ESLint Configuration**: Comprehensive linting rules for React, Next.js, and accessibility
- **Error Boundaries**: Graceful error handling with user-friendly error pages
- **Type Safety**: TypeScript support for better development experience
- **Performance Optimizations**: Image optimization, code splitting, and caching
- **Security Headers**: XSS protection, content type validation, and frame options
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

### API Testing

Test the AI generation endpoints:

```bash
# Test OpenAI integration
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Generate a customer service response","businessType":"E-commerce"}'

# Test local LLM integration
curl -X POST http://localhost:3000/api/generate-local \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Generate a customer service response","businessType":"E-commerce"}'
```

## 📚 Documentation

| Document | Description | Link |
|----------|-------------|------|
| 📖 **Configuration** | Environment setup & AI model configuration | [config.md](public/markdown/config.md) |
| 🚀 **Deployment** | Complete deployment guide with Vercel | [DEPLOYMENT.md](public/markdown/DEPLOYMENT.md) |
| 🏗️ **Project** | Architecture & technical details | [project.md](public/markdown/project.md) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

### Documentation

- **Deployment Guide**: See [DEPLOYMENT.md](public/markdown/DEPLOYMENT.md) for detailed deployment instructions
- **API Reference**: Check `pages/api/` for API endpoint documentation
- **Component Library**: Browse `src/components/` for reusable components

### Getting Help

- **Issues**: Create GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub discussions for questions and ideas
- **Documentation**: Check the comprehensive deployment guide

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">

**Built with ❤️ using Next.js, React, and Tailwind CSS**

[![Made with Love](https://img.shields.io/badge/Made_with-Love-red?style=for-the-badge)](https://github.com/your-username/ai-generator-hub)

</div>
