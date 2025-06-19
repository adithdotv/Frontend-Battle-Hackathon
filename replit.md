# NextGen Digital Services - Full Stack Web Application

## Overview

This is a modern full-stack web application for a digital services company built with React, TypeScript, Express, and PostgreSQL. The application features a professional business landing page with services showcase, portfolio display, testimonials, and contact functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API endpoints
- **Development**: Hot module replacement via Vite integration
- **Session Management**: PostgreSQL session store (connect-pg-simple)

### Database Architecture
- **Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon Database serverless connection
- **Schema Management**: Drizzle Kit for migrations and schema changes
- **Type Safety**: Drizzle-Zod for runtime validation

## Key Components

### Database Schema
The application uses four main tables:
- **services**: Digital services offered (web dev, design, etc.)
- **portfolio_items**: Showcase projects with categories
- **testimonials**: Client feedback with ratings
- **contact_submissions**: Form submissions from potential clients

### API Endpoints
- `GET /api/services` - Retrieve all services
- `GET /api/portfolio` - Fetch portfolio items
- `GET /api/testimonials` - Get client testimonials
- `POST /api/contact` - Submit contact form

### Frontend Pages
- **Home**: Single-page application with multiple sections
  - Hero section with call-to-action
  - Statistics with animated counters
  - Services showcase
  - Portfolio gallery
  - Customer logos
  - Testimonials carousel
  - Contact form
- **404**: Not found page

### UI Features
- Dark/light theme support with system detection
- Responsive design for all screen sizes
- Smooth scrolling navigation
- Loading animations and skeleton states
- Form validation with Zod schemas
- Toast notifications for user feedback

## Data Flow

1. **Page Load**: React app initializes with loading screen
2. **Data Fetching**: TanStack Query fetches data from API endpoints
3. **Rendering**: Components render with loading states, then real data
4. **User Interaction**: Form submissions trigger API calls
5. **State Updates**: Successful operations show toast notifications and update UI

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database queries
- **@tanstack/react-query**: Server state management
- **express**: Web server framework
- **react**: Frontend framework
- **typescript**: Static typing

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **date-fns**: Date manipulation utilities

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production

## Deployment Strategy

### Development
- Uses Vite dev server with HMR
- Express server runs on port 5000
- Database connected via environment variable

### Production Build
1. Frontend: `vite build` creates optimized static assets
2. Backend: `esbuild` bundles server code to `dist/index.js`
3. Static files served from `dist/public`

### Hosting Configuration
- Configured for Replit deployment
- Auto-scaling deployment target
- PostgreSQL 16 module enabled
- Port 5000 mapped to external port 80

## Changelog
- June 19, 2025. Initial setup
- June 19, 2025. Implemented custom 4-bar vertical scaling loader with wave effect animation

## User Preferences

Preferred communication style: Simple, everyday language.