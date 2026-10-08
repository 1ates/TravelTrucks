# TravelTrucks - Camper Rental Web Application

TravelTrucks is a modern web application for a camper rental company in Ukraine. Users can explore a catalog of travel trucks/campers, filter them by equipment, vehicle type, and location, view detailed specifications and customer reviews, save favorite campers, and book reservations.

## 🚀 Live Demo & Deployment
- **Live Site**: [https://travel-trucks-ashy-six.vercel.app](https://travel-trucks-ashy-six.vercel.app)
- **Platform**: Vercel / Netlify
- **SPA Routing**: Configured with `vercel.json` and `public/_redirects` for client-side routing.

## 📋 Features

### 1. Home Page (`/`)
- Hero banner with CTA button navigating to the Catalog page.
- Header with branding and active link states.

### 2. Catalog Page (`/catalog`)
- **Filter Panel**:
  - Location input with icon.
  - Vehicle equipment checkboxes (AC, Automatic, Kitchen, TV, Bathroom).
  - Vehicle type radio buttons (Van / Panel Truck, Fully Integrated, Alcove).
  - Engine and Transmission filters.
  - Search and Clear filter functionality.
- **Camper Cards**:
  - Thumbnail image, vehicle title, rating, and location.
  - Price display formatted in Euros (€8000.00 format).
  - Favorite toggle (heart icon) persisted in Redux and `localStorage`.
  - Feature badges (transmission, engine, AC, kitchen, etc.).
  - "Show more" button opening the camper details in a new tab (`target="_blank"`).
- **Pagination & States**:
  - Load More pagination (displays 4 items at a time).
  - Integrated loading modal with backdrop and spinner overlay.
  - Custom empty state illustration with action buttons when no search results match.

### 3. Camper Detail Page (`/catalog/:id`)
- **Interactive Photo Gallery**: Main preview image with thumbnail selection.
- **Camper Details & Features**: Detailed specifications, dimensions, consumption, and feature badges.
- **Reviews Section**: Customer reviews with star ratings and user avatars.
- **Reservation Form**:
  - Input validation for required fields (Name, Email, Booking Date).
  - Interactive success toast notification upon submission.
- **Error Handling**: Graceful 404 error state card when an invalid camper ID is requested.

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite
- **State Management**: Redux Toolkit (Slices: `campers`, `filters`, `favorites` with `localStorage` sync)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS Modules with CSS Variables design tokens (`src/styles/variables.css`)
- **Mock API**: [MockAPI.io](https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers)

## 📁 Project Structure

```
src/
├── assets/         # Design images, logos, and empty state illustrations
├── components/     # Reusable UI components (Header, CamperCard, FilterPanel, etc.)
│   └── ui/         # Base UI components (Button, Checkbox, Input, Radio, Badge, Rating)
├── pages/          # Page views (HomePage, CatalogPage, CamperDetailPage)
├── redux/          # Redux Toolkit store and slices (campersSlice, filtersSlice, favoritesSlice)
├── services/       # API endpoints and mapping helpers
├── styles/         # Global styles and CSS design tokens
└── App.jsx         # Router layout & top-level provider structure
```

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/traveltrucks.git
   cd traveltrucks
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run Linter:
   ```bash
   npm run lint
   ```
