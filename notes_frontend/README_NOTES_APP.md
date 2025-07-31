# Notes Frontend

## Overview

Minimalistic Astro-based notes app with a sidebar, header, and main area. Lets users create, view, edit, and delete notes. Uses mock local state for notes (easy to swap for backend API).

## Layout

- **Header:** App title and "New Note" button.
- **Sidebar:** List of notes with edit/delete.
- **Main panel:** Editor (edit/create) or viewer (selected note).

## Theme

- Light theme, blue (`#1976d2`) as primary, dark gray, and orange (`#ffb300`) for accent.
- Supports dark mode via toggle.

## Mock vs. Real Backend

- All CRUD is in-memory (see `NotesApp.astro`). Replace with real API using env (e.g., `NOTES_BACKEND_URL`) for easy integration.

## Extending

- Prepare to swap mock code for real server once backend available.
- Components in: `/src/components/`:
  - `NotesApp.astro` (main logic/layout)
  - `Sidebar.astro` (note list)
  - `NoteEditor.astro`, `NoteViewer.astro` (edit/view)

## Env Variables

- For backend: set e.g., `VITE_NOTES_BACKEND_URL` (= `astro.config.mjs` recommends using VITE_ prefix for envs).

## Quickstart

```bash
npm install
npm run dev
```

## Features

- Create note
- Edit note
- Delete note
- View list of notes
- View note content
