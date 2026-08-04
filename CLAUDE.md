# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static personal portfolio website for Vatsal Thakkar, deployed via GitHub Pages. No build step — the site is plain HTML/CSS/JS.

## Development

Open `index.html` directly in a browser, or use VS Code Live Server (configured on port 5501 via `.vscode/settings.json`).

**Linting** (via [Trunk](https://trunk.io)):
```bash
trunk check        # lint all files
trunk fmt          # auto-format
trunk check --all  # check all files, not just changed ones
```

Trunk runs: `prettier` (HTML/CSS/JS formatting), `gitleaks` (secrets detection), `svgo` (SVG optimization), `oxipng` (PNG optimization), `git-diff-check` (merge conflict markers).

## Architecture

Everything lives in three files:
- `index.html` — all page content
- `style.css` — all styles
- `script.js` — all interactivity

### Single-page navigation

All five pages (About, Resume, Portfolio, Blog, Contact) are `<article>` elements with `data-page` attributes, rendered simultaneously in the DOM. `script.js` shows the active page by toggling the `.active` CSS class. Nav buttons use `data-nav-link` and are matched to pages by comparing `innerHTML.toLowerCase()` against `dataset.page`.

### Project filtering

Portfolio items use `data-filter-item` and `data-category` attributes. `filterFunc` in `script.js` shows/hides items by comparing the selected category string against each item's `data-category`. There are two filter UIs wired to the same function: desktop buttons (`data-filter-btn`) and a mobile custom select (`data-select` / `data-select-item`).

### Sidebar contact toggle

On mobile, the sidebar contacts section is hidden behind a "Show Contacts" button (`data-sidebar-btn`) which toggles `.active` on the `[data-sidebar]` element.

### Skills display

Skills are rendered as [shields.io](https://shields.io) badge `<img>` tags, not progress bars. The old progress-bar markup is commented out in `index.html`.

### Commented-out sections

Several sections exist in `index.html` but are commented out: Testimonials list, Clients, and skill progress bars. The testimonials modal structure (for the modal popup UI) remains active even though the triggering list items are commented out.

### External dependencies

- Fonts: Google Fonts (Poppins)
- Icons: Ionicons (`<ion-icon>` web component, loaded via CDN `<script>` at bottom of `<body>`)
- Skill badges: shields.io image URLs
