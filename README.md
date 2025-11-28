# Eat Easy

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

## Overview

Eat Easy is a small single-page application built with Vite, React, and TypeScript that helps users discover and recommend dishes and nearby locations. It includes responsive layouts, theme switching, basic authentication flows, and animated UI components.

The project is organized under `src/` and includes components for onboarding, recommendations, views for individual dishes, and layout components (header, footer, sidebar).

## Features

- **Recommendations:**: Personalized dish recommendations and a `Recommend` component.
- **Responsive UI:**: Desktop and mobile optimized views with `useIsDesktop` hook and separate signup components.
- **Authentication:**: Signup flows with separate mobile/desktop components present in `src/components/auth/`.
- **Theme support:**: Light/dark theme toggling via `ThemeContext` and `ThemeSwitchButton`.
- **Animated UI:**: Motion/animation helpers under `src/components/animations`.
- **Location-aware:**: Components for showing locations and recommended places.

## Installation

- **Requirements:**: Node.js (14+ recommended) and npm or yarn.
- **Clone the repo:**

```bash
git clone https://github.com/ShinobiKoda/eat-easy.git
cd eat-easy
```

- **Install dependencies:**

```bash
npm install
# or
pnpm install
```

## Usage

- **Run dev server:**

```bash
npm run dev
```

- **Build for production:**

```bash
npm run build
```

- **Preview production build locally:**

```bash
npm run preview
```

Open the app in your browser (Vite typically serves at `http://localhost:5173`).

## Screenshots

<!-- Add screenshots here -->

## Contributing

Contributions are welcome. If you'd like to contribute:

- Fork the repository.
- Create a feature branch: `git checkout -b feature/your-feature`.
- Open a PR with a clear description of changes.

Please follow existing code style and add small focused commits.

## Roadmap

Planned features and improvements:

- Improve recommendations with user preferences and persistence.
- Add unit and integration tests.
- Add backend integration for authentication and data persistence.
- Expand accessibility and internationalization support.

## License

## Contact
