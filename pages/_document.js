import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO Meta Tags */}
        <meta name="description" content="Pineapple AI - AI-powered generator hub for customer service, content creation, and business automation. Generate professional responses, blog content, and more with advanced AI technology." />
        <meta name="keywords" content="AI generator, customer service bot, content creation, blog writer, email campaigns, logo design, code generator, artificial intelligence" />
        <meta name="author" content="Pineapple AI" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pineapple AI - AI Generator Hub" />
        <meta property="og:description" content="Generate professional customer service responses, blog content, email campaigns, and more with our AI-powered tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pineapple-ai.vercel.app" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:site_name" content="Pineapple AI" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pineapple AI - AI Generator Hub" />
        <meta name="twitter:description" content="Generate professional customer service responses, blog content, email campaigns, and more with our AI-powered tools." />
        <meta name="twitter:image" content="/twitter-image.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Pineapple AI",
              "description": "AI-powered generator hub for customer service, content creation, and business automation",
              "url": "https://pineapple-ai.vercel.app",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "Pineapple AI"
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
