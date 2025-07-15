# Snipify - Digital Marketplace Platform

## Overview

Snipify is a full-stack digital marketplace web application for developers, designers, and creators to buy and sell digital assets. The platform features AI-powered development tools, a comprehensive asset marketplace, and robust seller/buyer management systems.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom dark theme and shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL sessions with connect-pg-simple

### Key Design Decisions
- **Monorepo Structure**: Shared schema and types between client and server
- **Type Safety**: Full TypeScript coverage with Zod for runtime validation
- **Modern React**: Uses React 18 features without RSC (rsc: false)
- **Component Library**: shadcn/ui for consistent, accessible components

## Key Components

### Database Schema
- **Users**: Authentication, roles (buyer/seller/admin), Stripe integration
- **Assets**: Digital products with metadata, pricing, and status tracking
- **Categories**: Hierarchical organization of assets
- **Purchases**: Transaction records linking buyers and assets
- **Reviews**: User feedback and ratings system
- **Likes**: User engagement tracking

### Authentication & Authorization
- **Roles**: Guest, Buyer, Seller, Admin with distinct permissions
- **User Management**: Profile management with avatar and bio support
- **Stripe Integration**: Account connection for sellers via Stripe Connect

### Marketplace Features
- **Asset Browsing**: Grid-based display with filtering and search
- **Categories**: Organized asset classification system
- **Purchase System**: Stripe Checkout integration
- **Seller Dashboard**: Asset management and analytics
- **Admin Panel**: Content moderation and user management

### AI-Powered Tools
- **Code Generator**: Natural language to code conversion
- **Code Translator**: Multi-language code translation
- **Code Optimizer**: Performance and readability improvements
- **Code Explainer**: Detailed code documentation
- **Code Debugger**: Bug detection and fixing suggestions

## Data Flow

### Asset Management Flow
1. Sellers upload assets through dashboard
2. Assets enter "draft" status
3. Admin reviews and approves/rejects assets
4. Approved assets become "published" and visible to buyers
5. Buyers can purchase assets through Stripe Checkout
6. Sellers receive 80% of sale price (20% platform commission)

### User Journey
1. **Guest**: Browse public assets, limited access
2. **Registration**: Create account, become Buyer
3. **Buyer**: Purchase assets, access AI tools, manage library
4. **Seller Upgrade**: Connect Stripe account, upload assets
5. **Admin**: Full platform management capabilities

## External Dependencies

### Payment Processing
- **Stripe**: Handle all financial transactions
- **Stripe Checkout**: Individual asset purchases
- **Stripe Connect**: Seller onboarding and payouts

### Database & Hosting
- **PostgreSQL**: Production-ready database (Supabase or Neon)
- **Supabase**: Full-stack platform with authentication, file storage, and real-time features
- **Drizzle ORM**: Type-safe database operations
- **Database Migrations**: Automated schema management
- **File Storage**: Secure file uploads with CDN delivery

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Consistent icon library
- **Custom Theme**: Dark-themed "space" design system

### Development Tools
- **Vite**: Fast development and building
- **TypeScript**: Type safety across the stack
- **ESBuild**: Production bundling
- **Replit Integration**: Development environment optimization

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push`

### Environment Configuration
- **Development**: `NODE_ENV=development` with Vite dev server
- **Production**: `NODE_ENV=production` with static file serving
- **Database**: `DATABASE_URL` environment variable required

### File Structure
```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── migrations/      # Database migrations
├── dist/           # Built application
└── attached_assets/ # Project documentation
```

### Key Features
- **Commission Model**: 20% platform fee, 80% to sellers
- **Asset Types**: Code snippets, UI kits, templates, 3D models
- **AI Integration**: Powered by Gemini AI with Google API
- **Learn System**: Klicko AI learning assistant with personalized content
- **Playground**: Multi-language code editor with live preview and AI explanations
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Custom space-themed design system with 3D animations

### Recent Changes (January 2025)
- **✓ Database Integration**: Connected PostgreSQL database and migrated from memory storage
- **✓ Branding Update**: Changed from "Snipify" to "Klickode" across all components
- **✓ Navigation Enhancement**: Added 3D pop-out effect with rounded corners and shadow
- **✓ Advanced 3D Animations**: Integrated complex cube animations with hover effects
- **✓ AI Learning System**: Implemented Klicko AI tutor with Gemini integration
- **✓ Code Playground**: Built multi-language editor with live preview and AI code explanation
- **✓ Gemini AI Integration**: Added Google Gemini API for learning content generation
- **✓ Parallax Stars Background**: Implemented user-provided SASS code for parallax pixel stars with multiple layers
- **✓ Enhanced 3D Effects**: Added comprehensive 3D hover effects, floating animations, and glow effects to all sections
- **✓ Improved Layout**: Aligned all content margins to match navbar positioning with proper spacing
- **✓ Updated Hero Section**: Changed from rotating animated text to static "Build, Sell, Inspire." title with red accent
- **✓ Enhanced Cube Design**: Enlarged cubes to 80x80px, improved colors with darker theme tones, and better positioning
- **✓ Cube Positioning**: Reduced skew angle to -8deg and scaled up cubes 1.2x for better prominence and alignment
- **✓ Browse Dropdown Menu**: Added comprehensive dropdown with 6 categories (UI Kits, Templates, Icons, Mobile, Web Apps, All Templates) matching design specifications
- **✓ Navigation Improvements**: Removed dropdown arrow, improved hover effects to red, added extra spacing above navbar
- **✓ Layout Consistency**: Aligned all page content with navbar padding/margins for consistent spacing across all pages
- **✓ Size Adjustments**: Reduced hero text size and cube dimensions for better proportions
- **✓ Spacey Background**: Added light blue gradient glow from bottom with radial blur effects for enhanced space theme
- **✓ Netlify-Inspired Effects**: Implemented sophisticated glass-morphism cards, floating animations, gradient borders, text gradients, and pulse glow effects
- **✓ Advanced Background**: Added NetlifyBackground component with animated gradient orbs, floating geometric shapes, grid lines, and moving light rays
- **✓ Enhanced Typography**: Applied gradient text effects to headings and improved button hover states with smooth animations
- **✓ Premium Card Design**: Replaced basic cards with glass-morphism Netlify-style cards featuring backdrop blur, gradient backgrounds, and sophisticated hover effects
- **✓ Space Theme System-Wide**: Extended sophisticated space theme across all pages including Browse, AI Tools, Learn, Playground, and Seller Dashboard with consistent Netlify-inspired visual effects
- **✓ 3D Text Effects**: Added text-3d-pop class to all page titles for enhanced visual depth and consistency
- **✓ Removed Rotation Effects**: Eliminated rotation animations from cards and elements as requested, maintaining static positioning with hover effects
- **✓ Parallax Integration**: Added ParallaxStars and NetlifyBackground components to all pages for consistent atmospheric effects
- **✓ Full AI Integration**: Implemented complete Google Gemini AI functionality for all tools (code generation, translation, optimization, explanation, debugging, review)
- **✓ Enhanced Hero Design**: Updated main title to display "Build Sell Inspire" in 2 rows with large decorative brackets as requested
- **✓ Reviews & Widgets Section**: Added comprehensive Reviews page with interactive widget demo, customizable layouts, and multi-platform review integration inspired by Elfsight functionality
- **✓ System-Wide Space Mono Typography**: Implemented consistent Space Mono robotic programming font throughout the entire application for unified technical aesthetic, replacing all serif fonts
- **✓ Minimal Theme Guidelines**: Removed excessive 3D effects, glow effects, and heavy animations from Learn, Playground, and Tools pages for cleaner, professional appearance
- **✓ Logo Branding Update**: Changed navigation logo from "KLIKCODE" to "Klickode" for proper brand consistency
- **✓ Optimized Star Background**: Further reduced star quantities and opacity for ultra-subtle presence (Canvas: 50 stars, CSS: 15 stars, Parallax: 0.1-0.2 opacity)
- **✓ Consistent Background System**: Applied same SpaceStars, SimpleStars, and ParallaxStars across all pages with minimal visual interference
- **✓ Enhanced Space Theme**: Maintained immersive space atmosphere while removing NetlifyBackground from secondary pages for cleaner design focus
- **✓ AI Tools Tabbed Interface**: Reorganized tools page with tabbed sections for better organization and user experience
- **✓ Database Architecture**: Confirmed PostgreSQL/Neon database setup compatible with Netlify hosting for seamless deployment
- **✓ Browse Section Development**: Implemented comprehensive browse page with real database integration, product filtering, search, and sorting functionality
- **✓ Asset Detail Pages**: Created detailed product pages with purchase functionality, reviews system, and comprehensive asset information
- **✓ Page Heading Alignment**: Updated all page headings to be left-aligned and appropriately sized (except index page) for consistent visual hierarchy
- **✓ Forum Section**: Developed complete forum system with post listings, categories, search functionality, and community features
- **✓ Footer Page Implementation**: Created all footer pages including About, Contact, Privacy Policy, and Terms of Service with proper routing and content
- **✓ Complete Page Ecosystem**: Established full navigation structure with all major sections and legal pages properly linked and functional
- **✓ Business Services Page**: Created comprehensive "Business with Klickode" page with web development packages, WordPress solutions, and digital marketing services
- **✓ Thailand Localization**: Updated all currency references to Thai Baht (฿) throughout the platform for Thailand-based market
- **✓ SEO Optimization**: Added comprehensive meta tags, Open Graph data, structured data, and Thailand-focused content for search engine visibility
- **✓ Security Audit**: Conducted thorough security check - no insecure HTTP links, dangerous code patterns, or vulnerabilities found
- **✓ Functionality Testing**: Verified all routes, components, and features work correctly with proper error handling
- **✓ Narrower Content Layout**: Reduced content width with increased padding (px-8 sm:px-12 lg:px-16) and smaller max-width containers (max-w-4xl/3xl) for better reading experience and longer page layout, with consistent 60px top margin across all pages excluding the Build Sell Create section
- **✓ Design Consistency Audit**: Conducted comprehensive design review and fixed font inconsistencies (Space Mono throughout), background theme issues (bg-space-dark standardization), card styling uniformity, and color consistency across all pages
- **✓ Layout Optimization**: Reduced navbar width to max-w-7xl and adjusted content width by +3% for optimal proportions and better readability
- **✓ Purple Element Removal**: Removed blue-purple gradient from hero section cube, replaced with minimal gray design that turns red on hover
- **✓ Star Density Enhancement**: Increased star count from 8 to 15 in SimpleStars, 25 to 50 in SpaceStars, and 4 to 10 extra scattered stars for better visual depth
- **✓ Index Page Boxes Redesign**: Transformed colorful gradient boxes to minimal space theme with red accent logos, consistent gray-to-red hover effects, and subtle 3D depth
- **✓ Footer Height Optimization**: Reduced footer padding from py-12 to py-10 (-5% height reduction) for better page proportions
- **✓ Universal Footer Implementation**: Added Footer component to all pages missing it (Dashboard, Learn, Playground) ensuring consistent page structure
- **✓ AI Functionality Verification**: Tested and confirmed all AI tools are working properly with Gemini integration
- **✓ Enhanced AI Tools UI**: Implemented typing effect, syntax highlighting, and formatted response display
- **✓ AI Response Formatting**: Added proper heading styling (red **headings**), code highlighting, and organized output structure
- **✓ Interactive AI Features**: Added language selector, character counter, copy functionality, and improved loading states
- **✓ Professional AI Interface**: Created structured response cards with timestamps, actions, and better readability
- **✓ Learn Page Layout Update**: Changed from 2-column to 2-row layout with learning setup on top and AI output below
- **✓ Enhanced Learn Page AI Response**: Integrated AIResponseFormatter component for better organized, paragraphed AI explanations
- **✓ Interactive Code Tests**: Converted AI Suggested Topics into interactive coding challenges with automated scoring and feedback
- **✓ Test Progress Tracking**: Added completion status, retake functionality, and visual feedback for learning assessments
- **✓ Browse Dropdown Enhancement**: Redesigned with 2-column layout (Left: Asset Categories, Right: Popular Sections) with darker background and improved spacing
- **✓ Page-Footer Spacing**: Added consistent 12px spacing between all page content and footer across entire platform
- **✓ AI Chat Interface Implementation**: Created persistent AI chat system with:
  - Floating chat button with minimize/maximize functionality
  - Context-aware responses based on current code and page
  - Message history within sessions
  - Code syntax highlighting in chat responses
  - Copy-to-clipboard functionality for AI responses
  - Integrated across Playground, AI Tools, and Learn pages
  - Real-time typing indicators and smooth UX
  - Leverages existing Gemini AI integration for responses
- **✓ Take Tour Component Removal**: Removed TakeTour component and Take Tour button from landing page for cleaner design
- **✓ Learn Page Bug Fix**: Fixed undefined selectedLanguage error by adding proper state management
- **✓ Interactive Code Tests Enhancement**: Completely redesigned learning interface with:
  - Professional popup dialog for better code testing experience
  - Split-screen layout: code editor on left, live output on right
  - Functional "Run Code" button with realistic code execution simulation
  - Enhanced AI response formatting with red ** text highlights and glow effects
  - Better organization with instruction panels and progress tracking
  - Improved visual feedback with loading states and animations
  - Professional test results display with score badges and detailed feedback
- **✓ Mobile Responsive Design**: Fixed mobile viewport issues and improved mobile UX with:
  - Smaller navbar height and optimized spacing for mobile devices
  - Full-width button layout and proper mobile font sizing
  - Responsive grid layouts with appropriate gaps and padding
  - Mobile-optimized navigation menu with improved touch targets
  - Better animated heading sizing starting from 1.5rem on mobile
- **✓ Netlify Deployment Ready**: Configured project for static hosting with:
  - Created netlify.toml configuration file with proper build settings
  - Added _redirects file for SPA routing and API function routing
  - Set up netlify/functions/api.js for serverless API endpoints
  - Updated query client for production URL handling
  - Created comprehensive deployment documentation (README_NETLIFY.md)
  - Built static version ready for drag-and-drop deployment
  - Maintained all UI/UX features and responsive design in static mode
- **✓ AI Learning System Optimization**: Enhanced learning session functionality with:
  - Fixed language selection state management with proper selectedLanguage handling
  - Improved AI response formatting with proper code highlighting and structure
  - Enhanced interactive code tests with real Gemini AI integration for evaluation
  - Added proper error handling and loading states for AI operations
  - Implemented consistent Space Mono typography and red accent theming
  - Added hover effects and transitions for better user experience
  - Successfully tested all AI endpoints (learn, ai-tools, explain-code) with Gemini API
  - Verified comprehensive learning content generation with explanations, code examples, exercises, tips, and next topics
- **✓ Production Database Migration**: Fully transitioned from mock data to production-ready database system:
  - Migrated from MemStorage to DatabaseStorage for all data operations
  - Implemented proper slug generation for categories and assets
  - Added production-level error handling and logging
  - Created asset seeding endpoint for initial content setup
  - Filtered public API to only show published assets
  - Established proper database initialization with required categories
  - Successfully connected PostgreSQL database with 6 categories and production assets
  - Removed all mock data dependencies and placeholder systems
  - Platform ready for real user data and transactions
- **✓ Supabase Integration**: Implemented comprehensive Supabase authentication and file storage system:
  - Created enhanced Supabase client with file storage helpers (uploadFile, getPublicUrl, deleteFile)
  - Implemented authentication functions (signUp, signIn, signOut, social login with Google/GitHub)
  - Added useSupabaseAuth hook for seamless authentication state management
  - Created professional login and register pages with social authentication options
  - Added auth callback handling for OAuth flows
  - Implemented file upload component with drag-and-drop, progress tracking, and multi-file support
  - Updated navigation with user profile dropdown and authentication state
  - Added user synchronization API endpoint for database integration
  - Created storage bucket policies for secure file access (avatars, assets, thumbnails, previews)
  - Comprehensive setup documentation with step-by-step Supabase configuration
  - Platform now supports both database-only and full Supabase deployment options
- **✓ Minimal Design Implementation**: Applied eye-pleasing and minimal design approach with:
  - Redesigned search as pop-out dropdown from navbar to save space
  - Removed diamond shapes from hero section background
  - Replaced complex cube animations with minimal floating red dots
  - Simplified hero section feature cards with smaller padding and reduced visual weight
  - Updated browse page alignment to match consistent theme and max-width containers
  - Added click-outside functionality to close search dropdown
  - Reduced visual clutter while maintaining space theme aesthetic
  - Optimized for better readability and cleaner user experience
- **✓ ShootingStars Universal Implementation**: Successfully added ShootingStars component to ALL pages:
  - Implemented consistent shooting stars animation across entire platform
  - Added to all 15+ pages including dashboard, browse, learn, playground, forum, etc.
  - Maintained proper z-index layering with existing background elements
  - Ensured compatibility with all existing star components (SpaceStars, SimpleStars, ParallaxStars)
  - Created cohesive animated background system platform-wide
- **✓ Netlify Deployment Verified**: Confirmed static build working perfectly:
  - Static build completed successfully with vite build
  - All assets properly bundled and optimized
  - _redirects file copied to build output
  - Netlify functions configured for serverless API endpoints
  - Ready for drag-and-drop deployment to Netlify
  - All UI/UX features preserved in static mode
- **✓ Final UI/UX Improvements**: Completed all user-requested refinements:
  - Widened "Everything You Need" section from max-w-4xl to max-w-7xl for better content display
  - Removed "Search" text from navbar, keeping only the search icon for cleaner design
  - Updated index page with actual Klickode service descriptions instead of placeholder content
  - Implemented provided 3D animated star background with zoom effects and layered star animations
  - Enhanced content with Thailand-focused messaging and real service offerings
  - Replaced all placeholder content with authentic Klickode marketplace descriptions
  - Added proper service descriptions for AI tools, marketplace, learning platform, and code playground
  - Maintained red accent color (#ff3434) and Space Mono typography throughout all updates
- **✓ Minimal Clean Design Implementation**: Complete visual overhaul for cleaner interface:
  - Removed all star background animations and elements completely from entire platform
  - Eliminated "Trusted by 10,000+ developers" badge entirely
  - Removed AI Tools section background styling for cleaner appearance
  - Reduced section spacing from 60px to 40px margins for better visual flow
  - Added 120px top padding to hero section for better navbar spacing
  - Standardized page layouts between Browse and AI Tools pages with consistent margins
  - Made Build section smaller and more organized with reduced padding and text sizes
  - Implemented clean blank backgrounds throughout all pages
- **✓ Developer Documentation**: Created comprehensive DEVELOPER_GUIDE.md with:
  - Complete project architecture overview and tech stack explanation
  - Detailed file structure guide with component organization
  - Database schema documentation with all tables and relationships
  - API endpoints documentation with authentication and data flow
  - Frontend architecture guide with routing, state management, and styling
  - Backend structure with Express routes, storage layer, and AI integration
  - Development workflow guide with setup, environment variables, and deployment
  - Code style guidelines and contribution standards
  - Security considerations and maintenance procedures
- **✓ AI Tools Section Background**: Added matching background gradient to AI Tools section:
  - Applied same gradient background as Build Sell Succeed section
  - Added relative positioning and z-index layering for proper content display
  - Maintained consistent visual styling between hero and AI tools sections
- **✓ Version X Checkpoint**: Saved current state with:
  - Checkered background with interactive bubble hover effects
  - Optimized bubble performance with 50ms throttling and smooth animations
  - Enhanced hero section with better spacing and pop-out card animations
  - Redesigned "Your Development Superpower" section with 2-column horizontal layout
  - All backgrounds using CheckeredBackground component with gradient overlay
- **✓ Universal Checkered Background Implementation**: Successfully updated ALL pages platform-wide with:
  - Landing page with CheckeredBackground wrapper and interactive bubbles
  - Business page with improved professional layout using checkered background
  - About page with consistent checkered background theming
  - Browse page with checkered background and maintained search functionality
  - AI Tools page with checkered background and preserved AI chat integration
  - Learn page with checkered background and interactive learning interface
  - Forum page with checkered background and community features
  - Dashboard page with checkered background and user profile management
  - Seller Dashboard with checkered background and analytics display
  - Asset Detail page with checkered background and product showcase
  - Reviews page with checkered background and widget demonstrations
  - Home page with checkered background and full section layouts
  - Privacy Policy page with checkered background and legal content
  - Terms of Service page with checkered background and terms sections
  - All 15+ pages now feature consistent interactive bubble effects on hover
  - Maintained red accent color (#ff3434) and Space Mono typography throughout
  - Performance optimized with 50ms throttling for smooth bubble animations
  - Proper JSX structure with CheckeredBackground wrapper components