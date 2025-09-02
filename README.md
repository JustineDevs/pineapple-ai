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
```
Business Type: E-commerce
Industry: Online Retail
Customer Issue: "My order hasn't arrived after 2 weeks"
Tone: Professional
Language: English
Response Length: Medium
```

### 2. Sales Assistant Bot
```
Product: AI-powered CRM platform
Customer Profile: Small business owner
Objection: "It's too expensive for my budget"
Tone: Consultative
Language: English
Response Length: Long
```

### 3. Blog Content Writer
```
Topic: "10 Ways to Improve Customer Retention"
Industry: SaaS
Target Audience: Business owners
Tone: Educational
Language: English
Content Type: Blog post
```

### 4. Email Campaign Generator
```
Campaign Type: Onboarding
Goal: Welcome new users and guide them through setup
Audience: New trial users
Product: Project management tool
Tone: Friendly
Language: English
```

### 5. Logo Design Generator
```
Brand Name: TechFlow
Tagline: "Streamline your workflow"
Core Values: Innovation, efficiency, collaboration
Style: Modern
Color Preferences: Blues and greens
Primary Usage: Web and mobile apps
```

### 6. Code Generator
```
Language: JavaScript
Task: Create a function to validate email addresses
Constraints: No external libraries, must handle edge cases
Include: Inline comments explaining key steps
```

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
