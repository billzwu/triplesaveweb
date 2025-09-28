# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TripleSave.AI is a static website for an AI-powered expense tracking and tax optimization service. The site consists of:

- **index.html**: Current "Coming Soon" landing page with minimal content
- **indexv1.html**: Full marketing website with complete sections (features, pricing, how it works)
- **styles.css**: Comprehensive CSS with design system variables and responsive layouts
- **script.js**: JavaScript for interactive features (animations, modals, smooth scrolling)

## Architecture

This is a static website with no backend or build process:

- **Design System**: CSS variables defined in `:root` for consistent theming
- **Interactive Elements**: Vanilla JavaScript with IntersectionObserver for scroll animations
- **Responsive Design**: Mobile-first with breakpoint at 768px
- **Component Patterns**: Reusable card components, consistent button styles, modal system

## Key Features Implementation

- **Animation System**: IntersectionObserver-based scroll animations for cards and sections
- **Modal System**: Custom modal implementation for CTAs and email capture
- **Smooth Scrolling**: Anchored navigation with offset handling for fixed navbar
- **Counter Animations**: Animated statistics display using requestAnimationFrame
- **Mobile Menu**: Hamburger menu implementation ready but currently hidden

## Development Notes

- No build process required - direct file editing
- Font: Inter from Google Fonts
- Color scheme: Primary blue (#2563eb) with purple gradient accents
- Currently showing simplified "Coming Soon" page (index.html)
- Full website available in indexv1.html for future launch

## Common Tasks

To switch from "Coming Soon" to full website:
- Rename current `index.html` to backup
- Rename `indexv1.html` to `index.html`

To test locally:
- Open index.html directly in browser
- Use any local web server (e.g., `python -m http.server`)