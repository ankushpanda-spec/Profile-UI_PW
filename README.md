# Module Federation Boilerplate

This boilerplate is set up for Module Federation and is integrated with PW OMNI UI, WebSDK, and AuthSDK.

## Getting Started

### Initialize the Project

1. **Install Dependencies:**

   `pnpm install`

2. **Run the Development Server:**

   `pnpm dev`

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

---

# Flow of the App

The `App.tsx` file renders Remote Apps. The App renders under the base layout which has 3 main sections:

1. **Header**
2. **Side Navbar**
3. **Children rendering the App component**

### Header

The header consists of two parts:

- **Left Action**
- **Right Action**

#### Left Action

- Menu button that appears on mobile screens to open the side navbar.
- Two sections toggled between:
  1. **Cohort button** for cohort selection.
  2. **Back button**. These buttons will be shown once, based on some pathname condition.

#### Right Action

- **Download App** button.
- **Profile Avatar** with a Name Dropdown.

---

## Data Fetching

The `selectedCohort` and the `userFirstName` are fetched using PW WebSDK calls which can be found in the `src/api/` directory.
