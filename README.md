# Module Federation Boilerplate

This boilerplate is set up for Module Federation and is integrated with PW OMNI UI, WebSDK, and AuthSDK.

## Getting Started

### Initialize the Project

1. **Install Dependencies:**

   \`pnpm install\`

2. **Run the Development Server:**

   \`pnpm dev\`

### Environment Variables

- **Common Environment Variables:**

  - `.env`

- **Development Environment Variables:**

  - `.env.dev`

- **Staging Environment Variables:**

  - `.env.staging`

- **Production Environment Variables:**
  - `.env.production`

## Key Features

### Integration

- **AuthSDK:** Authentication & Cohort management.
- **WebSDK:** Core web functionalities.
- **OMNI UI:** Integrated UI components and theming.

### Application Structure

- **`src/Bootstrap.tsx`:** The main entry point where the App component is wrapped with:

  - **Global Providers:** Providing access to all contexts.
  - **Theme Provider:** Exposes the application to OMNI theming.

- **Base Layout:**
  - Contains the side navigation bar and header.
  - Renders remote applications using Module Federation.
