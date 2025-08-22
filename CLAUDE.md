# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application built with TanStack Router for creating a simple page with table of content links that deep link into a video via timestamps. The project uses modern React with TypeScript and is configured for file-based routing.

## Technology Stack

- **React 19** with TypeScript
- **TanStack Router** - File-based routing system with devtools
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling framework
- **Vitest** - Testing framework with jsdom environment
- **Shadcn/ui** - Component library (New York style, Lucide icons)

## Common Commands

```bash
# Development
npm run dev          # Start dev server on port 3000
npm run start        # Same as dev

# Testing
npm run test         # Run tests with Vitest

# Building
npm run build        # Build for production (runs vite build && tsc)
npm run serve        # Preview production build

# Add Shadcn components
pnpx shadcn@latest add button  # Example: add button component
```

## Architecture

### Routing Structure
- File-based routing using TanStack Router
- Routes are defined in `src/routes/` directory
- Root layout in `src/routes/__root.tsx` includes Header component and devtools
- Route definitions use `createFileRoute()` pattern

### Key Files
- `src/routes/__root.tsx` - Root layout with Header and TanStack devtools
- `src/routes/index.tsx` - Main page component
- `src/components/Header.tsx` - Navigation header component
- `src/lib/utils.ts` - Utility functions (likely for Tailwind class merging)

### Path Aliases
- `@/*` maps to `./src/*` (configured in tsconfig.json and vite.config.ts)
- Shadcn components use `@/components/ui/` structure

### Styling
- Tailwind CSS 4 with CSS variables enabled
- Main styles in `src/styles.css`
- Zinc color palette, New York component style

### Development Features
- TypeScript with strict mode enabled
- Auto code splitting enabled in TanStack Router
- React and Router devtools integrated in development
- Hot module replacement via Vite

## Adding New Routes

Create new files in `src/routes/` directory. TanStack Router will automatically generate route definitions. Use `Link` component from `@tanstack/react-router` for navigation.

## Component Development

Follow the existing patterns in the codebase. Use Shadcn components when possible, and leverage the configured path aliases for imports.