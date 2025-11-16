# Spotify Tracks Table Manager

A high-performance React table management application for exploring and analyzing 30,000+ Spotify tracks with advanced filtering, sorting, search capabilities..

## Live Demo
 [View Live Demo](https://spotify-table-management.vercel.app/)

## Screenshots

### Main Table View
#### Light Mode
<img width="1920" height="960" alt="image" src="https://github.com/user-attachments/assets/9571d12d-6ff8-4d9b-ae16-fecff2dc85a4" />

#### Dark Mode
<img width="1920" height="960" alt="image" src="https://github.com/user-attachments/assets/66108bb8-364f-4396-beaa-c4a2d6008cb7" />

### Search
<img width="1920" height="960" alt="image" src="https://github.com/user-attachments/assets/c283cb68-cdd0-4dc2-88e9-feb7f5b405eb" />

### Advanced Filtering
<img width="1920" height="960" alt="image" src="https://github.com/user-attachments/assets/62e56e7d-df9b-4fcb-b290-ca79913a073a" />

### Pagination
<img width="1920" height="960" alt="image" src="https://github.com/user-attachments/assets/58c60a3d-806c-4ba2-8a56-39882b5b34a3" />

### Responsive
#### Tablet
<img width="1910" height="960" alt="image" src="https://github.com/user-attachments/assets/3c422969-984f-452d-aa13-bfc253830e17" />

#### Mobile
<img width="1910" height="960" alt="image" src="https://github.com/user-attachments/assets/d24f8edd-3311-4df7-ae16-74dfec7cb481" />

## Features Implemented

- Table Rendering - Efficiently displays 30,000+ tracks
- Sorting - All columns sortable with visual indicators (ascending/descending)
- Filtering - 5 filterable columns with multiple filter types:
  - Text filter (Track Name)
  - Dropdown filter (Genre, Artist)
  - Range filter (Popularity 0-100)
  - Number filter (Release Year)
  - All filters work together with AND logic
- Global Search - Searches across all columns with 300ms debouncing
- Pagination - Adjustable page size (25/50/100 rows per page)
- User Experience
  - Loading states with animated skeleton
  - Error handling with retry functionality
  - Empty states with helpful messages
  - Responsive design (desktop, tablet, mobile)
  - Theme - Light & Dark


## Tech Stack

### Core Technologies
- React 18+ - UI library with hooks
- TypeScript 5+ - Type safety and better DX
- Vite - Fast build tool and dev server
### Table Management
- TanStack Table v8 - Headless table library (9KB)
### Styling & UI
- Tailwind CSS - Utility-first CSS framework
- Lucide React - Beautiful icon library
- Shadcn UI - UI Components
### Data Processing
- PapaParse - CSV parsing and handling
### State Management
- React hooks (useState, useMemo, useCallback, useEffect)
- Custom hooks for reusable logic
