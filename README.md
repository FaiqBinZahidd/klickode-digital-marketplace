# 🚀 Klickode - Digital Marketplace Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.0+-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-18.0+-green.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/PostgreSQL-14.0+-blue.svg" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Tailwind-3.0+-blue.svg" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</div>

## 🌟 Overview

**Klickode** is a cutting-edge digital marketplace platform designed for developers, designers, and creators in Thailand. Built with modern web technologies and featuring an immersive space-themed design, Klickode combines powerful marketplace functionality with AI-driven development tools to create a comprehensive ecosystem for digital asset trading and learning.

### ✨ Key Features

- **🛍️ Digital Marketplace**: Buy and sell UI kits, templates, icons, mobile components, and web applications
- **🤖 AI-Powered Tools**: Code generation, translation, optimization, explanation, and debugging with Google Gemini
- **📚 Klicko Learning Assistant**: Personalized AI tutor for programming topics with interactive exercises
- **🎮 Code Playground**: Multi-language code editor with live preview and AI explanations
- **⭐ Reviews & Widgets**: Customer testimonial systems and review widgets
- **💬 Community Forum**: Discussion boards for developers and designers
- **📱 Business Services**: Web development packages and digital marketing solutions

## 🎨 Design Philosophy

Klickode features a **sophisticated space-themed design** with:
- **Dark Theme**: Deep space colors with subtle star animations
- **Space Mono Typography**: Consistent robotic programming font throughout
- **3D Visual Effects**: Floating animations, glass-morphism cards, and gradient accents
- **Red Accent Colors**: Primary brand color (#E53935) for buttons and highlights
- **Parallax Stars**: Multi-layered pixel star background animations
- **Responsive Design**: Mobile-first approach with seamless device adaptation

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Wouter** for lightweight client-side routing
- **Tailwind CSS** with custom dark theme configuration
- **shadcn/ui** for accessible, consistent components
- **TanStack Query** for server state management
- **Vite** for fast development and optimized builds

### Backend
- **Node.js** with Express.js framework
- **TypeScript** with ES modules support
- **PostgreSQL** with Neon Database (serverless)
- **Drizzle ORM** for type-safe database operations
- **Session Management** with PostgreSQL storage

### AI Integration
- **Google Gemini API** for AI-powered learning content
- **Code Generation**: Natural language to code conversion
- **Multi-language Support**: JavaScript, Python, React, and more
- **Real-time Explanations**: AI-powered code analysis and documentation

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.0 or higher
- PostgreSQL database (or Neon Database account)
- Google Gemini API key

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/klickode-marketplace.git
   cd klickode-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   GEMINI_API_KEY=your_google_gemini_api_key
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 🏗️ Project Structure

```
klickode-marketplace/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions
├── server/                # Express backend application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── db.ts            # Database configuration
│   └── gemini.ts        # AI integration
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schema definitions
└── package.json         # Project dependencies
```

## 🎯 Core Features

### 1. Digital Marketplace
- **Asset Categories**: UI Kits, Templates, Icons, Mobile Components, Web Apps
- **Search & Filter**: Advanced filtering by category, price, rating
- **Seller Dashboard**: Asset management, sales analytics, revenue tracking
- **Purchase System**: Secure transactions with detailed receipts
- **Review System**: User ratings and feedback for assets

### 2. AI-Powered Development Tools
- **Code Generator**: Convert natural language to functional code
- **Code Translator**: Multi-language code translation
- **Code Optimizer**: Performance and readability improvements
- **Code Explainer**: Detailed documentation generation
- **Code Debugger**: Bug detection and fixing suggestions

### 3. Klicko Learning Assistant
- **Personalized Learning**: AI tutor adapted to skill level
- **Interactive Exercises**: Hands-on coding challenges
- **Progress Tracking**: Learning analytics and achievements
- **Multi-language Support**: JavaScript, Python, React, and more

### 4. Code Playground
- **Multi-language Editor**: Support for 10+ programming languages
- **Live Preview**: Real-time code execution and output
- **AI Explanations**: Instant code analysis and documentation
- **Template Library**: Pre-built code templates and examples

## 🌐 Localization & SEO

### Thailand Market Focus
- **Thai Baht (฿)** currency integration
- **SEO Optimization** for Thai market
- **Local Business Services** section
- **Thailand-focused content** and meta tags

### Search Engine Optimization
- **Comprehensive Meta Tags** for all pages
- **Open Graph Integration** for social media sharing
- **Structured Data** for better search visibility
- **Performance Optimization** for fast loading

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Database
npm run db:push      # Push schema changes to database
npm run db:studio    # Open database studio

# Type Checking
npm run type-check   # Run TypeScript compiler
```

### Code Standards
- **TypeScript**: Strict typing throughout the codebase
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Space Mono Font**: Consistent typography across all components

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Ensure all required environment variables are set:
- `DATABASE_URL`: PostgreSQL connection string
- `GEMINI_API_KEY`: Google Gemini API key
- `NODE_ENV`: Set to 'production'

## 📊 Platform Statistics

- **15+ Complete Pages**: Landing, Browse, Learn, Playground, Tools, Forum, etc.
- **AI-Powered Features**: 5 major AI tools with Gemini integration
- **Responsive Design**: Optimized for all device sizes
- **Type Safety**: 100% TypeScript coverage
- **Performance**: Optimized for fast loading and smooth interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the learning and development tools
- **Neon Database** for serverless PostgreSQL hosting
- **Tailwind CSS** for the utility-first styling approach
- **shadcn/ui** for the component library foundation
- **Radix UI** for accessible component primitives

## 📞 Support

For support and questions:
- Create an issue in this repository
- Visit the [Klickode Community Forum](https://klickode.com/forum)
- Contact us at support@klickode.com

---

<div align="center">
  <p>Built with ❤️ for the Thailand developer community</p>
  <p><strong>Klickode - Build, Sell, Inspire</strong></p>
</div>