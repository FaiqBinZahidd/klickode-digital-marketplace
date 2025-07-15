# Klickode Developer Guide

## Overview
Klickode is a full-stack digital marketplace platform built with React, TypeScript, and Node.js. This guide provides a comprehensive overview of the codebase structure, architecture, and development workflow.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript, Vite for bundling
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **Authentication**: Supabase Auth (optional) or custom auth system
- **AI Integration**: Google Gemini API for AI-powered tools

### Directory Structure

```
├── client/src/               # Frontend React application
│   ├── components/          # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   ├── pages/              # Page components for routing
│   └── main.tsx            # React app entry point
├── server/                  # Backend Express application
│   ├── db.ts               # Database connection and configuration
│   ├── gemini.ts           # Google Gemini AI integration
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes definition
│   ├── storage.ts          # Data access layer
│   └── vite.ts             # Vite development server setup
├── shared/                  # Shared types and schemas
│   └── schema.ts           # Database schemas and TypeScript types
├── public/                  # Static assets
└── attached_assets/         # Project documentation and assets
```

## Frontend Architecture

### Components Structure

#### Core Layout Components
- **`navigation.tsx`**: Main navigation bar with dropdown menus and search
- **`footer.tsx`**: Site footer with links and company information
- **`landing-page.tsx`**: Main landing page wrapper component

#### Section Components
- **`hero-section.tsx`**: Main hero section with "Build Sell Succeed" title
- **`features-section.tsx`**: Feature cards showcasing platform capabilities
- **`ai-tools-section.tsx`**: AI tools showcase section

#### Page Components (client/src/pages/)
- **`browse.tsx`**: Asset marketplace browsing page
- **`dashboard.tsx`**: User dashboard for buyers
- **`seller-dashboard.tsx`**: Seller dashboard for asset management
- **`ai-tools.tsx`**: AI tools interface page
- **`learn.tsx`**: Learning platform with AI tutor
- **`playground.tsx`**: Code playground with live preview
- **`login.tsx`** / **`register.tsx`**: Authentication pages
- **`about.tsx`**, **`contact.tsx`**, **`privacy.tsx`**, **`terms.tsx`**: Static pages

#### Utility Components
- **`ai-chat.tsx`**: Floating AI chat interface
- **`ai-response-formatter.tsx`**: AI response formatting with syntax highlighting
- **`code-syntax-highlighter.tsx`**: Code syntax highlighting component
- **`file-upload.tsx`**: File upload component with drag-and-drop
- **`klickode-logo.tsx`**: Brand logo component

### Styling System

#### Design Tokens
- **Primary Color**: `#ff3434` (red accent)
- **Background**: `bg-space-dark` (dark theme)
- **Font**: Space Mono (monospace programming font)
- **Theme**: Dark space-themed design with minimal approach

#### CSS Classes
- **Layout**: Uses Tailwind utility classes
- **Components**: shadcn/ui component library
- **Custom Styles**: Defined in `client/src/index.css`

#### Key Design Patterns
- Clean blank backgrounds (no star animations)
- Red accent color for interactive elements
- Space Mono font for technical consistency
- Minimal design approach with subtle hover effects

### State Management

#### TanStack Query
- **Query Keys**: Use array format for hierarchical caching
- **API Requests**: Centralized in `lib/queryClient.ts`
- **Cache Invalidation**: Automatic after mutations

#### Example Query Usage
```typescript
const { data: assets, isLoading } = useQuery({
  queryKey: ['/api/assets'],
  retry: false,
});
```

### Routing System

#### Wouter Router
- **Client-side routing**: Uses `wouter` for navigation
- **Route definition**: In `client/src/App.tsx`
- **Navigation**: Use `Link` component or `useLocation` hook

#### Available Routes
- `/` - Landing page
- `/browse` - Asset marketplace
- `/dashboard` - User dashboard
- `/seller-dashboard` - Seller dashboard
- `/ai-tools` - AI tools interface
- `/learn` - Learning platform
- `/playground` - Code playground
- `/login` / `/register` - Authentication

## Backend Architecture

### Express Server Structure

#### Core Files
- **`server/index.ts`**: Server entry point with middleware setup
- **`server/routes.ts`**: API route definitions and handlers
- **`server/storage.ts`**: Data access layer with storage interfaces
- **`server/db.ts`**: Database connection and Drizzle setup

#### API Endpoints

##### Authentication
- `GET /api/auth/user` - Get current user
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

##### Assets
- `GET /api/assets` - Get all published assets
- `GET /api/assets/:id` - Get specific asset
- `POST /api/assets` - Create new asset
- `PUT /api/assets/:id` - Update asset

##### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category

##### AI Tools
- `POST /api/ai-tools` - Process AI tool requests
- `POST /api/learn` - Generate learning content
- `POST /api/explain-code` - Explain code snippets

### Database Schema

#### Core Tables
- **`users`**: User accounts with authentication
- **`assets`**: Digital assets and products
- **`categories`**: Asset categorization
- **`purchases`**: Purchase transactions
- **`reviews`**: Asset reviews and ratings
- **`likes`**: User likes for assets

#### Schema Definition
Located in `shared/schema.ts` using Drizzle ORM:

```typescript
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  // ... other fields
});
```

#### Database Operations
- **Storage Interface**: `IStorage` in `server/storage.ts`
- **Implementation**: `DatabaseStorage` class
- **Migrations**: Run `npm run db:push` to apply schema changes

## AI Integration

### Google Gemini API

#### Configuration
- **API Key**: Set `GEMINI_API_KEY` environment variable
- **Model**: Uses `gemini-2.5-flash` and `gemini-2.5-pro`
- **Implementation**: `server/gemini.ts`

#### AI Features
- **Code Generation**: Natural language to code
- **Code Translation**: Between programming languages
- **Code Optimization**: Performance improvements
- **Code Explanation**: Detailed explanations
- **Learning Content**: Educational materials

#### Usage Example
```typescript
import { generateCodeExplanation } from '../server/gemini';

const explanation = await generateCodeExplanation(code, language);
```

## Development Workflow

### Getting Started

1. **Install Dependencies**
```bash
npm install
```

2. **Set Up Environment**
```bash
cp .env.example .env
# Add your environment variables
```

3. **Database Setup**
```bash
npm run db:push
```

4. **Start Development Server**
```bash
npm run dev
```

### Environment Variables

#### Required Variables
- `DATABASE_URL`: PostgreSQL connection string
- `GEMINI_API_KEY`: Google Gemini API key
- `SESSION_SECRET`: Session encryption secret

#### Optional Variables
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

### Build Process

#### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx with auto-reload
- **Database**: Local PostgreSQL or Neon

#### Production
- **Frontend**: `vite build` creates static files
- **Backend**: `tsx server/index.ts` for production
- **Database**: PostgreSQL or Neon database

### Code Style Guidelines

#### TypeScript
- **Strict mode**: Enabled for type safety
- **Interfaces**: Use for component props
- **Types**: Import from `shared/schema.ts`

#### React
- **Functional Components**: Use with hooks
- **Props**: TypeScript interfaces
- **State**: useState and useQuery hooks

#### Styling
- **Tailwind**: Utility-first approach
- **Components**: shadcn/ui components
- **Custom**: Minimal custom CSS

## File Organization Guide

### Finding Specific Features

#### UI Components
- **Navigation**: `client/src/components/navigation.tsx`
- **Hero Section**: `client/src/components/hero-section.tsx`
- **Feature Cards**: `client/src/components/features-section.tsx`
- **AI Tools**: `client/src/components/ai-tools-section.tsx`

#### Page Logic
- **Browse Page**: `client/src/pages/browse.tsx`
- **Dashboard**: `client/src/pages/dashboard.tsx`
- **AI Tools**: `client/src/pages/ai-tools.tsx`
- **Playground**: `client/src/pages/playground.tsx`

#### Backend Logic
- **API Routes**: `server/routes.ts`
- **Database**: `server/storage.ts`
- **AI Integration**: `server/gemini.ts`

#### Configuration
- **Tailwind**: `tailwind.config.ts`
- **Vite**: `vite.config.ts`
- **Database**: `drizzle.config.ts`

### Common Tasks

#### Adding New Page
1. Create component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Update navigation in `client/src/components/navigation.tsx`

#### Adding New API Endpoint
1. Add route in `server/routes.ts`
2. Add storage method in `server/storage.ts`
3. Update types in `shared/schema.ts`

#### Modifying Database Schema
1. Update schema in `shared/schema.ts`
2. Run `npm run db:push`
3. Update storage interface if needed

#### Adding New Component
1. Create component in `client/src/components/`
2. Export from relevant page or component
3. Add TypeScript interface for props

## Testing and Debugging

### Development Tools
- **React DevTools**: Browser extension
- **Network Tab**: Monitor API calls
- **Console**: Check for errors and logs

### Common Issues
- **Database Connection**: Check `DATABASE_URL`
- **API Errors**: Verify routes and authentication
- **Build Issues**: Check TypeScript errors
- **Styling**: Verify Tailwind classes

### Performance Optimization
- **React Query**: Caching and background updates
- **Code Splitting**: Dynamic imports for large components
- **Image Optimization**: Proper sizing and formats
- **Bundle Analysis**: Use Vite bundle analyzer

## Deployment

### Netlify Deployment
- **Build Command**: `npm run build`
- **Publish Directory**: `dist/public`
- **Functions**: `netlify/functions/`

### Environment Setup
- **Production Database**: Neon or PostgreSQL
- **Environment Variables**: Set in hosting platform
- **API Keys**: Secure storage required

## Contributing Guidelines

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Follow configured rules
- **Prettier**: Code formatting
- **Commits**: Clear, descriptive messages

### Pull Request Process
1. **Feature Branch**: Create from main
2. **Testing**: Ensure all features work
3. **Documentation**: Update if needed
4. **Review**: Request code review

### File Naming Conventions
- **Components**: `kebab-case.tsx`
- **Pages**: `kebab-case.tsx`
- **Utilities**: `camelCase.ts`
- **Types**: `PascalCase` interfaces

## Security Considerations

### Authentication
- **Session Management**: Secure session storage
- **Password Hashing**: bcrypt for passwords
- **API Protection**: Authentication middleware

### Data Validation
- **Input Validation**: Zod schemas
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Input sanitization

### Environment Security
- **API Keys**: Environment variables only
- **CORS**: Properly configured
- **HTTPS**: Required for production

## Maintenance

### Regular Tasks
- **Dependency Updates**: Monthly security updates
- **Database Backups**: Regular automated backups
- **Log Monitoring**: Error tracking and alerts
- **Performance Monitoring**: Response time tracking

### Troubleshooting
- **Database Issues**: Check connection and queries
- **API Errors**: Verify endpoints and data
- **Frontend Issues**: Check console errors
- **Build Problems**: Verify dependencies

This guide provides a comprehensive overview of the Klickode codebase. For specific implementation details, refer to the individual files and their inline comments.