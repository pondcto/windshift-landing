# WindShift Shell – Project Context

## Project Overview
WindShift Shell is a modern Next.js 15 (App Router, TypeScript, Tailwind CSS 4) dashboard application. It features a robust, themeable UI with dark/light mode, a collapsible sidebar, a top navigation ribbon, and a modular, scalable page structure. The project is designed for extensibility and maintainability, using best practices for context, theming, and navigation.

## Current Status (as of this context)
- **UI/UX:**
  - Fully responsive dashboard layout with sidebar, top ribbon, and main content area.
  - Sidebar supports auto-collapse/expand on hover, and is robustly themed using CSS variables.
  - Top ribbon (breadcrumb) and logo box are pixel-perfect and theme-aware.
  - Theme toggle (dark/light) works globally, with all backgrounds and text colors updating as expected.
- **Navigation:**
  - Sidebar navigation is fully functional, using Next.js `<Link>` for client-side routing.
  - All sidebar items (level 2/3) map to real Next.js routes and pages.
  - Active sidebar item is highlighted based on the current route.
- **Pages:**
  - All sidebar leaf routes have a corresponding `page.tsx` file with a placeholder label showing the route slug.
  - The main dashboard page is also scaffolded.
- **Theming:**
  - All major UI areas (sidebar, ribbon, main, logo box) use CSS variables for background and text color, set in `globals.css` for both light and dark mode.
  - Sidebar background is controlled by `--sidebar-bg` for robust, conflict-free theming.
- **Code Structure:**
  - All code is in `src/` using the `@/` alias.
  - Components are modular and context providers are used for theme, navigation, and sidebar state.

## Major Steps Completed
1. **Initial Setup:**
   - Next.js 15, TypeScript, Tailwind CSS 4, shadcn/ui, and all required dependencies installed.
2. **Sidebar Migration:**
   - Sidebar prototype from V0 (shadcn/ui) migrated and refactored for Next.js 15 App Router.
   - Providers (`ThemeProvider`, `NavigationProvider`, `SidebarProvider`) wrapped around the layout.
3. **Dark/Light Mode:**
   - Tailwind config set to `darkMode: "class"`.
   - CSS variables and Tailwind classes used for all backgrounds/text.
   - Theme toggle button added to the ribbon.
4. **Layout Polishing:**
   - Logo box, ribbon, and sidebar aligned pixel-perfectly.
   - Sidebar auto-collapse/expand on hover implemented.
5. **Robust Theming:**
   - Sidebar background set via `--sidebar-bg` variable in `globals.css` for both light and dark mode.
   - All conflicting hardcoded backgrounds removed from sidebar and children.
6. **Navigation & Pages:**
   - Sidebar navigation uses Next.js `<Link>` with `asChild` and Radix `<Slot />` for correct routing.
   - All sidebar leaf routes scaffolded with blank pages labeled by slug.
   - Sidebar highlights active item based on current route.
7. **Debugging:**
   - Sidebar auto-collapse temporarily disabled for inspection, then re-enabled.
   - Confirmed all navigation and theming works as intended.

## How to Continue
- Add real content to each page by editing the corresponding `page.tsx` file under `src/app/...`.
- Add new sidebar items by updating the `platformSections` object and creating the corresponding page.
- Adjust theming by editing CSS variables in `globals.css`.
- For new features, follow the established modular/component pattern.

---

**This file is intended to help onboard a new assistant or developer, or to resume work in a new chat session.** 