{mport type { Config } from 'tailwindcss'
  "name": "demo_pre_mvp",
  "version": "0.1.0",= {
  "private": true,s'],
  "scripts": {
    "dev": "next dev",tsx}',
    "build": "next build",,tsx}',
    "start": "next start",
    "lint": "eslint"tsx}',
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.1",
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",ar(--input))',
    "lucide-react": "^0.543.0",',
    "next": "15.5.3",hsl(var(--background))',
    "react": "19.1.0",sl(var(--foreground))',
    "react-dom": "19.1.0",
    "react-hook-form": "^7.62.0",mary))',
    "tailwind-merge": "^3.3.1",--primary-foreground))',
    "zod": "^4.1.5",
    "tailwindcss": "^3.4.0",    secondary: {
    "postcss": "^8.4.0",l(var(--secondary))',
    "autoprefixer": "^10.4.0"r(--secondary-foreground))',
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",r(--destructive))',
    "@tailwindcss/postcss": "^4",(--destructive-foreground))',
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",var(--muted))',
    "eslint": "^9",--muted-foreground))',
    "eslint-config-next": "15.5.3",
    "tailwindcss": "^4",     accent: {
    "tw-animate-css": "^1.3.8",         DEFAULT: 'hsl(var(--accent))',
    "typescript": "^5"          foreground: 'hsl(var(--accent-foreground))',



}  }        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config