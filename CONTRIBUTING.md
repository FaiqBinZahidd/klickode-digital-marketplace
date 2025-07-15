# Contributing to Klickode

Thank you for your interest in contributing to Klickode! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please report unacceptable behavior to support@klickode.com.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a branch for your changes
4. Make your changes
5. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- PostgreSQL database (or Neon Database account)
- Google Gemini API key

### Local Development

1. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/klickode-marketplace.git
   cd klickode-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Making Changes

### Branch Naming

Use descriptive branch names:
- `feature/add-user-authentication`
- `fix/resolve-database-connection`
- `docs/update-api-documentation`
- `refactor/improve-component-structure`

### Commit Messages

Follow conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(auth): add user registration system`
- `fix(ui): resolve mobile navigation issues`
- `docs(readme): update installation instructions`
- `refactor(components): improve button component structure`

### Code Organization

- **Components**: Place reusable UI components in `client/src/components/`
- **Pages**: Add new pages to `client/src/pages/`
- **Hooks**: Custom React hooks go in `client/src/hooks/`
- **API Routes**: Backend routes in `server/routes.ts`
- **Database**: Schema definitions in `shared/schema.ts`

## Code Style

### TypeScript

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use proper typing for all function parameters and returns
- Avoid `any` type unless absolutely necessary

### React

- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused
- Use proper prop types and default values

### Styling

- Use Tailwind CSS for styling
- Follow the established space theme design system
- Use Space Mono font for consistency
- Maintain red accent color (#E53935) for primary actions

### Database

- Use Drizzle ORM for database operations
- Keep schema definitions in `shared/schema.ts`
- Use proper relations and indexes
- Follow PostgreSQL best practices

## Testing

### Running Tests

```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for API endpoints
- Write component tests for React components
- Use descriptive test names and organize tests logically

## Documentation

### Code Documentation

- Add JSDoc comments for public functions
- Document complex algorithms and business logic
- Keep comments up-to-date with code changes
- Use clear, concise language

### README Updates

- Update README.md for new features
- Keep setup instructions current
- Add examples for new functionality
- Update the feature list when adding capabilities

## Submitting Changes

### Pull Request Process

1. **Create a pull request** from your feature branch to the main branch
2. **Fill out the PR template** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Testing instructions
   - Breaking changes (if any)

3. **Ensure all checks pass**:
   - Tests are passing
   - Code builds successfully
   - No TypeScript errors
   - No linting errors

4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Squash commits** before merge (if requested)

### PR Guidelines

- Keep PRs focused and reasonably sized
- Include tests for new functionality
- Update documentation as needed
- Follow the established code style
- Add screenshots for UI changes

## Types of Contributions

### Bug Fixes

- Fix existing functionality that doesn't work as expected
- Improve error handling
- Resolve performance issues
- Fix security vulnerabilities

### New Features

- Add new marketplace functionality
- Enhance AI tools and learning system
- Improve user experience
- Add new UI components

### Documentation

- Improve setup instructions
- Add code examples
- Update API documentation
- Create tutorials and guides

### Performance

- Optimize database queries
- Improve frontend performance
- Reduce bundle size
- Enhance loading times

## Questions and Help

If you have questions about contributing:

1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Join our community discussions
4. Contact maintainers directly for sensitive issues

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation
- Release notes
- Community highlights

Thank you for contributing to Klickode! Your efforts help make the platform better for the entire developer community.