# React Starter

A modern React starter template with TypeScript, Vite, Tailwind CSS, and comprehensive tooling for building production-ready applications.

## 🚀 Features

- ⚛️ **React 19** - Latest React with new features
- 🎯 **TypeScript** - Type-safe development
- ⚡ **Vite** - Lightning fast HMR and build tool
- 🎨 **Tailwind CSS v4** - Utility-first CSS with Vite plugin
- 🧪 **Vitest** - Fast unit testing with coverage support
- 🧹 **OXLint** - Fast and modern linter
- 🎣 **Husky** - Git hooks for quality checks
- 📦 **Radix UI** - Unstyled, accessible UI components
- 🎭 **shadcn/ui** - Pre-configured with button component
- 📝 **Standard Version** - Automated versioning and CHANGELOG

## 📋 Prerequisites

- [Bun](https://bun.sh) (v1.0 or higher recommended)

## 🛠️ Getting Started

### Installation

```bash
# Install dependencies
bun install

# Set up git hooks
bun run prepare
```

### Development

```bash
# Start dev server
bun run dev
```

The app will be available at `http://localhost:5173`

### Building

```bash
# Type check and build for production
bun run build

# Preview production build
bun run preview
```

## 🧪 Testing

This project uses Vitest for testing with React Testing Library.

```bash
# Run tests
bun test

# Run tests with UI
bun run test:ui

# Generate coverage report
bun run test:coverage
```

## 🧹 Linting

```bash
# Run linter
bun run lint

# Fix linting issues
bun run lint:fix
```

## 📦 Release Management

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for automated versioning and CHANGELOG generation.

```bash
# Create first release
bun run release:first-release

# Create a patch release (0.0.x)
bun run release:patch

# Create a minor release (0.x.0)
bun run release:minor

# Create a major release (x.0.0)
bun run release:major

# Auto-determine version bump
bun run release
```

## 🏗️ Project Structure

```
react-starter/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── test/
│   │   └── setup.ts         # Test configuration
│   ├── App.tsx              # Main app component
│   └── main.tsx             # App entry point
├── public/                  # Static assets
└── coverage/                # Test coverage reports
```

## 🎨 UI Components

This template includes a pre-configured [shadcn/ui](https://ui.shadcn.com/) setup with:

- Button component with variants
- Tailwind CSS v4 with Vite plugin
- CVA (class-variance-authority) for component variants
- Radix UI primitives

Add more components using the shadcn CLI or manually.

## 📝 Tech Stack

### Core
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 5** - Build tool

### Styling
- **Tailwind CSS 4.1** - Utility-first CSS
- **class-variance-authority** - Component variants
- **clsx & tailwind-merge** - Class name utilities
- **lucide-react** - Icon library

### Testing
- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **Happy DOM** - Fast DOM implementation
- **@vitest/coverage-v8** - Coverage reporting

### Tooling
- **OXLint** - Fast linter
- **Husky** - Git hooks
- **Standard Version** - Release management

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.app.json` - App-specific TS config
- `tsconfig.node.json` - Node-specific TS config
- `components.json` - shadcn/ui configuration

## 📄 License

Private project

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write tests
4. Ensure linting passes
5. Submit a pull request
