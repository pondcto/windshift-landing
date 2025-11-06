# Windshift Styling Guide for Cursor AI - UPDATED

## 🚨 CRITICAL: THIS IS THE ONLY STYLING APPROACH ALLOWED

### ⌛ NEVER DO THIS:
- Do NOT use inline styles
- Do NOT create new CSS files
- Do NOT use arbitrary color values like `bg-[#ffffff]`
- Do NOT use CSS variables approach (deprecated)
- Do NOT mix approaches - use ONLY what's defined here

### ✅ ALWAYS DO THIS:
- Use the semantic color classes (`bg-light-surface`, `text-dark-text`, etc.)
- Use Tailwind utilities for spacing, flexbox, grid
- Use the pre-defined component classes (.card, .btn, .input)
- Copy the exact patterns shown below

## WHY THIS APPROACH:
We use Tailwind's semantic color system with light/dark variants. This provides automatic dark mode switching when the `dark` class is toggled on the HTML element.

## Setup Instructions

### 1. Tailwind Configuration (tailwind.config.ts)
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors
        windshift: {
          navy: '#000328',
          blue: '#00458e',
          'off-white': '#f4f8fb',
          'light-blue': '#ccdae8',
        },
        // Semantic color system
        primary: {
          50: '#e6f0f9',
          100: '#ccdae8',
          200: '#99b5d1',
          300: '#6690ba',
          400: '#336ba3',
          500: '#00458e',
          600: '#003771',
          700: '#002954',
          800: '#001b37',
          900: '#000328',
        },
        // Light mode colors
        light: {
          background: '#f4f8fb',
          'background-secondary': '#e6f0f9',
          'background-tertiary': '#dae6f2',
          surface: '#ffffff',
          'surface-hover': '#f9fbfd',
          'surface-active': '#f4f8fb',
          border: '#e1e9f1',
          'border-hover': '#ccdae8',
          text: '#000328',
          'text-secondary': '#003771',
          'text-tertiary': '#6690ba',
          'text-muted': '#99b5d1',
        },
        // Dark mode colors
        dark: {
          background: '#030310',
          'background-secondary': '#030508',
          'background-tertiary': '#070a0d',
          surface: '#0b0f12',
          'surface-hover': '#111518',
          'surface-active': '#171b1f',
          border: '#1a1f24',
          'border-hover': '#232930',
          text: '#f4f8fb',
          'text-secondary': '#ccdae8',
          'text-tertiary': '#99b5d1',
          'text-muted': '#6690ba',
        },
        // Status colors
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
      },
      fontFamily: {
        halfre: ['Halfre', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'headline': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'title': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 3, 40, 0.1)',
        'medium': '0 4px 6px -1px rgba(0, 3, 40, 0.1)',
        'strong': '0 10px 15px -3px rgba(0, 3, 40, 0.1)',
        // Dark mode shadows
        'dark-soft': '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
        'dark-medium': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        'dark-strong': '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
```

### 2. Global Styles (app/globals.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Light mode (default) - UNCHANGED */
  :root {
    --color-bg: #f4f8fb;
    --color-bg-secondary: #e6f0f9;
    --color-surface: #ffffff;
    --color-border: #e1e9f1;
    --color-text: #000328;
    --color-text-secondary: #003771;
    --color-text-muted: #99b5d1;
  }

  /* Dark mode - IMPROVED for eye comfort */
  .dark {
    --color-bg: #030310;           /* Subtle blue-black base */
    --color-bg-secondary: #030508; /* Almost black for contrast */
    --color-surface: #0b0f12;      /* Neutral dark surface */
    --color-border: #1a1f24;       /* Cyan-gray border */
    --color-text: #f4f8fb;
    --color-text-secondary: #ccdae8;
    --color-text-muted: #6690ba;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    @apply font-body antialiased;
  }
}

@layer components {
  /* Card component */
  .card {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    @apply rounded-lg p-6 shadow-soft dark:shadow-dark-soft transition-all;
  }
  
  .card-hover:hover {
    @apply shadow-medium dark:shadow-dark-medium;
  }
  
  /* Button components */
  .btn {
    @apply px-4 py-2 rounded-md font-medium transition-all duration-200 inline-flex items-center justify-center;
  }
  
  .btn-primary {
    @apply bg-windshift-blue text-white hover:opacity-90;
  }
  
  .btn-secondary {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    @apply shadow-sm hover:opacity-90;
  }
  
  /* Form inputs */
  .input {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    @apply w-full px-3 py-2 rounded-md transition-all;
  }
  
  .input::placeholder {
    color: var(--color-text-muted);
  }
  
  .input:focus {
    @apply outline-none ring-2 ring-windshift-blue border-transparent;
  }
  
  /* Utility classes */
  .text-secondary {
    color: var(--color-text-secondary);
  }
  
  .text-muted {
    color: var(--color-text-muted);
  }
  
  .bg-surface {
    background-color: var(--color-surface);
  }
  
  .bg-secondary {
    background-color: var(--color-bg-secondary);
  }
  
  .border-default {
    border-color: var(--color-border);
  }
}
```

## COMPONENT PATTERNS - USE EXACTLY

### Main Layout
```jsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
```

### Card Component
```jsx
// ALWAYS use the .card class
<div className="card">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-secondary">Card content goes here</p>
</div>

// Card with hover effect
<div className="card card-hover">
  {content}
</div>
```

### Nested Components (Alternating Contrast Pattern)
```jsx
// Message inside a card - use bg-secondary for contrast
<div className="card">
  <h3 className="text-lg font-semibold mb-4">Chat Messages</h3>
  <div className="rounded-lg bg-secondary border border-default p-3 mb-2">
    <p className="text-sm">This message uses darker background for contrast</p>
  </div>
</div>

// Alternative pattern for multiple nested levels
<div className="card">                              {/* surface color */}
  <div className="bg-secondary p-4 rounded">       {/* darker for contrast */}
    <div className="bg-surface p-3 rounded">       {/* back to surface */}
      {/* Alternating pattern continues */}
    </div>
  </div>
</div>
```

### Buttons
```jsx
// Primary button
<button className="btn btn-primary">
  Primary Action
</button>

// Secondary button  
<button className="btn btn-secondary">
  Secondary Action
</button>

// Icon button
<button className="btn btn-primary">
  <svg className="w-4 h-4 mr-2">...</svg>
  With Icon
</button>
```

### Form Elements
```jsx
// Text input
<input 
  type="text" 
  className="input" 
  placeholder="Enter text..."
/>

// Textarea
<textarea 
  className="input" 
  rows={4}
  placeholder="Enter message..."
/>

// With label
<div>
  <label className="block text-sm font-medium text-secondary mb-1">
    Email Address
  </label>
  <input type="email" className="input" />
</div>
```

### Metric Cards
```jsx
<div className="card">
  <p className="text-sm text-secondary mb-1">Total Revenue</p>
  <p className="text-2xl font-bold mb-2">$35,723</p>
  <p className="text-sm text-status-success">+12.4% from last month</p>
</div>
```

### Navigation
```jsx
// Sidebar navigation
<nav className="w-64 bg-secondary border-r border-default min-h-screen">
  <ul className="p-4 space-y-1">
    <li>
      <a href="#" className="block px-3 py-2 rounded-md text-secondary hover:bg-surface transition-colors">
        Dashboard
      </a>
    </li>
    <li>
      <a href="#" className="block px-3 py-2 rounded-md bg-windshift-blue text-white">
        Analytics
      </a>
    </li>
  </ul>
</nav>
```

### Tables
```jsx
<div className="card overflow-hidden">
  <table className="w-full">
    <thead className="bg-secondary border-b border-default">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
          Name
        </th>
        <th className="px-4 py-3 text-left text-sm font-medium text-secondary">
          Status
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      <tr className="hover:bg-secondary transition-colors">
        <td className="px-4 py-3">Item Name</td>
        <td className="px-4 py-3">
          <span className="px-2 py-1 text-xs rounded-full bg-status-success text-white">
            Active
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Grid Layouts
```jsx
// Dashboard grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  <div className="card">...</div>
  <div className="card">...</div>
  <div className="card">...</div>
</div>

// Two column layout
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2 card">Main content</div>
  <div className="card">Sidebar content</div>
</div>
```

### Dark Mode Toggle
```jsx
// Next.js with next-themes
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="btn btn-secondary"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

// Vanilla React
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  
  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="btn btn-secondary"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
```

## STRICT RULES FOR CURSOR

1. **Component Classes First**: Always check if a component class exists (.card, .btn, .input) before using utilities

2. **No Color Utilities**: Never use `bg-white`, `text-black`, etc. Use component classes that handle dark mode automatically

3. **Status Colors Only**: The only color utilities allowed are status colors (text-status-success, bg-status-error, etc.)

4. **Spacing with Tailwind**: Use Tailwind for spacing (p-4, m-2, gap-6) but NOT for colors

5. **Dark Mode**: Never add dark: prefixes - the CSS variables handle this automatically

6. **Nested Contrast**: Use alternating bg-surface and bg-secondary for nested components, NOT progressively lighter shades

## Common Mistakes to Avoid

```jsx
// ❌ WRONG - Don't use semantic classes that don't exist
<div className="bg-light-surface dark:bg-dark-surface">

// ❌ WRONG - Don't use arbitrary colors
<div className="bg-[#ffffff] dark:bg-[#0a0d2e]">

// ❌ WRONG - Don't use Tailwind color utilities
<div className="bg-white dark:bg-gray-900">

// ❌ WRONG - Progressive lightening for nested elements
<div className="card">
  <div style="background: lighter">
    <div style="background: even-lighter">

// ✅ CORRECT - Use component classes
<div className="card">

// ✅ CORRECT - Alternating contrast for nested elements
<div className="card">
  <div className="bg-secondary">
    <div className="bg-surface">
```

## Quick Reference

### Available Component Classes
- `.card` - Standard card container
- `.card-hover` - Card with hover effect
- `.btn` - Base button
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.input` - Form input
- `.text-secondary` - Secondary text color
- `.text-muted` - Muted text color
- `.bg-surface` - Surface background
- `.bg-secondary` - Secondary background (darker for contrast)
- `.border-default` - Default border

### Available Tailwind Classes
- Layout: `flex`, `grid`, `block`, `hidden`
- Spacing: `p-*`, `m-*`, `gap-*`
- Sizing: `w-*`, `h-*`, `max-w-*`
- Typography: `text-sm`, `font-bold`, `leading-*`
- Borders: `rounded-*`, `border-*` (width only)
- Shadows: `shadow-soft`, `shadow-medium`, `shadow-strong`, `shadow-dark-*`
- Transitions: `transition-*`, `duration-*`

## Dark Mode Color Philosophy

The updated dark mode achieves comfort through:

1. **Neutral Base**: Main background (#030310) has minimal blue tint to reduce eye strain
2. **Cyan-Gray Surfaces**: UI elements use warm grays without purple cast (#0b0f12)
3. **Alternating Contrast**: Nested elements alternate between surface and darker backgrounds
4. **Subtle Borders**: Muted borders (#1a1f24) provide definition without harsh contrast
5. **Brand Accents**: Windshift blue (#00458e) reserved for interactive elements only

## Testing Your Implementation

1. Dark mode should work by toggling the `dark` class on `<html>` or root element
2. All text should remain readable in both modes
3. Nested components should have clear visual separation
4. Extended viewing should be comfortable without eye strain
5. No color utility classes in your code
6. Component classes handle all color theming

Remember: When in doubt, use a component class!