# Frontend Application (React + Vite)

**Port:** 5173 (dev) / Static (prod)  
**Status:** ✅ Custom Design System / 🚧 Integration Needed  
**Framework:** React 18 + Vite

## 📋 Overview

The Frontend application is a React-based web interface for the GuidoGerb platform. It features a custom-built design system with comprehensive UI components, navigation, and layout utilities.

## 🎯 Features

### Implemented ✅
- **Custom Design System**
  - Complete component library (buttons, forms, tables, modals, etc.)
  - Custom header/navigation system
  - Responsive layout components
  - Accessible UI components (ARIA support)
  - Theming and styling utilities

- **Development Tools**
  - Vite for fast development and bundling
  - ESLint for code quality
  - Vitest for testing
  - TypeScript support
  - Hot module replacement (HMR)

- **Testing**
  - Component tests with React Testing Library
  - Vitest test runner
  - Coverage reporting

### Missing Integration 🚧
- Backend API integration (authentication, data fetching)
- State management (Redux/Zustand)
- API client setup (Axios/Fetch wrapper)
- User authentication flow
- Service-specific UI pages (blockchain voting, vector search, etc.)
- Real-time updates (WebSocket integration)
- Error boundary and error handling
- Loading states and skeleton screens
- Form validation integration

## 🏗️ Architecture

```
frontend/
├── src/
│   ├── design-system/           # Custom UI component library
│   │   ├── react/
│   │   │   ├── components/      # Reusable components
│   │   │   ├── contexts/        # React contexts
│   │   │   └── hooks/           # Custom hooks
│   │   └── test/                # Component tests
│   ├── design-system-header/    # Header/navigation components
│   ├── react/                   # Application-specific components
│   ├── hooks/                   # Application hooks
│   ├── css/                     # Stylesheets
│   ├── static/                  # Static assets
│   ├── App.jsx                  # Root component
│   └── main.jsx                 # Entry point
├── public/                      # Public assets
├── test/                        # Application tests
├── package.json                 # Dependencies
├── vite.config.js               # Vite configuration
└── vitest.config.js             # Test configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
cd guidogerb/app/frontend
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Run tests
npm run test

# Run tests with coverage
npm run testc

# Build for production
npm run build

# Preview production build
npm run preview
```

### Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run testc` - Run tests with coverage
- `npm run eslint` - Run linter
- `npm run tsc` - Type check

## 🧩 Design System Components

The custom design system includes:

### Layout
- Grid system
- Flexbox utilities
- Responsive containers
- Spacing utilities

### Components
- **Buttons** - Primary, secondary, outline, icon
- **Forms** - Input, select, checkbox, radio, textarea
- **Tables** - Sortable, filterable, paginated
- **Navigation** - Header, sidebar, breadcrumbs, pagination
- **Modals** - Dialog, drawer, popup
- **Feedback** - Alerts, toasts, loading spinners
- **Data Display** - Cards, lists, badges, chips
- **Typography** - Headings, paragraphs, links

### Hooks
- `useHeaderContext` - Header state management
- Custom utility hooks for common patterns

## 🔧 Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **SASS** - CSS preprocessing
- **TypeScript** - Type checking (partial)
- **ESLint** - Code linting

## 📦 Dependencies

### Core
- `react@18.3.1`
- `react-dom@18.3.1`
- `react-router-dom@7.1.5`

### Utilities
- `lodash@4.17.21`
- `date-fns@4.1.0`
- `uuid@13.0.0`
- `tinycolor2@1.6.0`

### UI
- `react-popper@2.3.0`
- `react-colorful@5.6.1`

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run testc

# Run tests once (CI mode)
npm run testOnce
```

Test files are located in:
- `src/design-system/test/` - Design system tests
- `src/design-system-header/test/` - Header tests
- `test/` - Application tests

## 🎨 Styling

The application uses SASS for styling with:
- BEM-like naming conventions
- CSS custom properties for theming
- Responsive design utilities
- Accessibility-first approach

## 🐛 Known Issues

See `tasks.md` for detailed improvements and missing integrations.

## 📖 Related Documentation

- [Design System Documentation](../../../docs/frontend/design-system.md)
- [Header Component Documentation](../../../docs/frontend/design-system-header.md)
- [Frontend Architecture](../../../docs/frontend/frontend.md)
