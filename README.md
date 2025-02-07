# MF Common
MF Common is a microfrontend application utilizing Module Federation to share common features and functions with the `study-main-mf` shell app. It includes shared modules, components, and utilities for features like, making them reusable across different parts of the application.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
5. [Deployments](#deployments)
6. [Contributors](#contributors)
7. [License](#license)

## Project Overview

MF Common acts as a shared library for the `study-main-mf` microfrontend, offering essential components and modules. This promotes reusability and consistency across various parts of the application.

### Features

The application includes the following features:

- **Profile Page** : This module manages and shares the `profile` page functionality and component.
- **PDF Viewer** : It provides a standardized `/notes` route used to render PDF files, ensuring a consistent approach to viewing and interacting with PDFs within the application.
### Architecture

- This application follows a Microfrontend Architecture.
- RsBuild is used as the bundler, and Module Federation facilitates efficient sharing of dependencies.
- It adheres to clean architecture principles, ensuring separation of concerns, clear responsibilities, and enhanced maintainability and scalability.

## Tech Stack

- **React**: Frontend framework
- **TypeScript**: Programming language
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **CSS Modules**: Scoped and modular CSS to avoid global namespace conflicts.
- **Rsbuild**:  Fast and efficient build tool for Rust-based projects.
- **Module Federation**: Webpack feature for sharing code between different applications at runtime, enabling micro-frontend architecture.

## Prerequisites

Before starting, ensure you have the following dependencies installed:

- **Node.js** (version 20.x or later)
- **pnpm** (version 8.x or later)

## Getting Started

Follow these steps to set up the project:

### Cloning the Project

Clone the project repository:

```bash
git clone https://gitlab.com/penpencil-services/central-team-fe/mf-common.git
```
Navigate into the project directory:
```bash
cd mf-common
```
### Installing Dependencies

Install project dependencies using pnpm:

```bash
pnpm install
```

### Initialization

As this is a frontend application, no specific database setup or migration is required.

## Running the Project
To start the development server, run:

| **Environments** | **Run Command**                                                       | **Description**                                                       |
|-----------------|---------------------------------------------------------------------------|------------------------------------------------------------------------|
| Staging      | ```pnpm dev:staging ```  | Runs the application in the staging environment.   |
| Production      |```pnpm dev:prod``` |Runs the application in the production environment.  |
| System      | ```pnpm dev```| Starts the development server for local development.    |
| Demo      | ```pnpm dev:demo``` | Runs the application in the pre-production environment, used for final testing before deployment.|

Visit [http://localhost:3000/study-v2](http://localhost:3000/study-v2) to access the application.

### Building the Project

Build the project with the following command:
| **Environments** | **Build Command**                                                       | **Description**                                                       |
|-----------------|---------------------------------------------------------------------------|------------------------------------------------------------------------|
| Development      | ```pnpm build:development ```  | Builds the application for the development environment, optimized for debugging and local testing.    |
| Staging      | ```pnpm build:staging ```  | Builds the application for the staging environment, simulating a production-like setup for testing.  |
| Production      |```pnpm build:production``` |Builds the application for the production environment with full optimizations for end users.|
| System      | ```pnpm build:system```| Builds the application for internal system testing or specific internal configurations.    |
| Demo      | ```pnpm build:demo``` | Builds the application for the pre-production environment, used for final testing before deployment.|



The output will be in the \`dist/\` directory, ready for deployment.
## Deployments


| Environments | Environment URLs        | Jenkins Jobs        | Deployment Instructions                                                                                         |
| ------------ | ----------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Development   | [https://common-mf-dev.physicswallah.live](https://common-mf-dev.physicswallah.live) | [Dev Jenkins Job](https://jenkins.penpencil.co/job/Development/job/pw-common-mf/) | Use the \`development\` branch. Merges require review and approval from senior developers. |
| Staging    | [https://common-mf-stage.physicswallah.live](https://common-mf-stage.physicswallah.live/) | [https://jenkins.penpencil.co/job/Staging/job/pw-common-mf/](https://jenkins.penpencil.co/job/Staging/job/pw-common-mf/) | Use the \`staging\` branch. Merges require review and approval from senior developers. |


## Contributors

A big thanks to the entire PW Central FE Team for their invaluable contributions and efforts in developing this project. Your dedication and hard work are greatly appreciated!

- [Lofty Khanna](https://gitlab.com/loftykhanna)
- [Basit Qayoom](https://gitlab.com/basit.qayoom)
- [Seema Kumari](https://gitlab.com/Seema_06)

## License

This project is licensed under PW.