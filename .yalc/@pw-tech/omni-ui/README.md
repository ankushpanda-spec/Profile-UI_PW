<div align="center">
  <img src="./public/images/omni-cover.jpeg" alt="PW Omni UI" width="800" />
  <h2 align="center">
    Streamline UI Development with Pre-built, Design 3.0 Components.
  </h2>
</div>

## Documentation

For full documentation, visit [omni-ui.pw.live](https://omni-ui.pw.live)

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Cloning the Project](#clone)
- [Deployments](#deployments)
- [Contribution](#contribution)
- [Community](#community)
- [Maintainers](#maintainers)
- [License](#license)

## Project Overview <a name="project-overview"></a>

### Purpose

@pw-omni-ui centralizes frontend development for PW applications, aiming to streamline creation and ensure consistency.

### Features

- React and Tailwind CSS Integration
- Theme Overriding
- Comprehensive Documentation
- Strict Type Checking
- Storybook Integration with Variants

### Architecture

Built on React and Tailwind CSS, with Storybook for documentation, ensuring modularity and scalability.

## Tech Stack <a name="tech-stack"></a>

List of all technical stack utilized in the project:

- ReactJS
- TailwindCSS
- Vite+Rollup
- Storybook
- Typescript

## Prerequisites <a name="prerequisites"></a>

Before you begin, ensure you have the following dependencies installed globally in your system:

- [NodeJS (v18 or higher)](https://nodejs.org/en)
- [pnpm (v9 or higher)](https://pnpm.io/)

## Installation <a name="installation"></a>

### Adding @pw-omni-ui in Your App

- **Add Authentication Token:** Before installing the library, you need to add an authentication token. Create a `.npmrc` file in the root directory of your project. If a `.npmrc` file already exists, append the following line to it:

  ```plaintext
  //registry.npmjs.org/:_authToken=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
  ```

Run the following command:

```bash
pnpm install @pw-tech/omni-ui
```

## Usage <a name="usage"></a>

### React Application

Wrap the App/Parent component with the Theme Provider exported from pw-omni-ui:

```javascript
import { ThemeProvider } from "@pw-tech/omni-ui";

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### NextJs Page based router

Wrap the App/Parent component with the Theme Provider exported from pw-omni-ui:

```javascript
import { ThemeProvider } from "@pw-tech/omni-ui";

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

nextjs config - install 'next-transpile-modules' as a dev dependency and make below changes in nextjs config

```javascript
const withTM = require("next-transpile-modules")(["@pw-tech/omni-ui"]); // pass the modules you would like to see transpiled
const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: "loose" },
};

module.exports = withTM(nextConfig);
```

### NextJs App based router

include import "@pw-tech/omni-ui/theme.css" in layout.tsx where global css is imported

```bash
//layout.tsx
import type { Metadata } from "next";
import "@pw-tech/omni-ui/theme.css"
import "./globals.css";

```

- Visit [Storybook](https://omni-ui.pw.live/) to read the documentation and learn how to use the components.

## Cloning the Project<a name="clone"></a>

Follow these steps to set up the project:

Clone the project repository:

```bash
git clone https://gitlab.com/penpencil-services/central-team-fe/pw-omni-ui.git
```

Navigate into the project directory:

```bash
cd pw-omni-ui
```

### Installing Dependencies

Install project dependencies using pnpm:

```bash
pnpm install
```

### Building the Project

Build the project with the following command:

```bash
pnpm run build
```

### Running the Project

To run the project locally, use:

```bash
pnpm run dev
```

**_PORT: 3000_**

### Running Storybook Locally

To run Storybook locally, use:

```bash
pnpm run storybook
```

**_PORT: 6006_**

## Deployments <a name="deployments"></a>

| Environments | Environment URLs        | Jenkins Jobs        | Deployment Instructions                                                                                         |
| ------------ | ----------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Production   | https://omni-ui.pw.live | ProductionDeployJob | Merge code into the main branch for automatic deployment, then check to ensure everything is working correctly. |

## Contribution <a name="contribution"></a>

We welcome contributions from the community to improve @pw-omni-ui. Before contributing, please read our [Contribution Guidelines](CONTRIBUTING.md) to understand how to contribute effectively and adhere to our standards.

## Community <a name="community"></a>

Join our Slack channel dedicated to discussions related to @pw-omni-ui! Here you can ask questions, share ideas, and connect with other members of the community.

[Discuss PW Omni UI on Slack](https://pw-ipa8341.slack.com/archives/C06U7NJBMED)

## Maintainers <a name="maintainers"></a>

- [Lofty Khanna](https://gitlab.com/loftykhanna)
- [Basit Qayoom](https://gitlab.com/basit.qayoom)

## Contributors

For a list of all contributors, please visit [Contributors List](./contributors.md).

## License <a name="license"></a>

This project is licensed under **PW**.
