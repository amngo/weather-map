# 🌍 Weather Map

**Weather Map** is a modern, interactive weather visualization app built with [Next.js](https://nextjs.org/), [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/), [Geoapify Boundaries API](https://www.geoapify.com/boundaries-api/), and [React Query](https://tanstack.com/query). It displays dynamic weather data over a map interface with responsive design and smooth UI powered by [ShadCN](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/).

## ✨ Features

- 🌐 Interactive Map using Mapbox
- ☁️ Weather data overlays
- ⚡ Smooth animations with Motion
- 🎯 Global state management with Jotai
- 🧪 Type-safe and linted with TypeScript and ESLint

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 with Turbopack](https://nextjs.org/)
- **Map Engine**: [Mapbox GL JS](https://www.mapbox.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [ShadCN](https://ui.shadcn.com/), [Lucide icons](https://lucide.dev/icons/) [Meteocons](https://github.com/basmilius/weather-icons),
- **State/Data**: [React Query](https://tanstack.com/query/latest), [Jotai](https://jotai.org/)
- **Animations**: [Motion](https://motion.dev/)
- **Utilities**: [Turf.js](https://turfjs.org/)

**APIs:**
- **Weather Data**: [Open-Meteo](https://open-meteo.com/)
- **Weather Alerts**: [National Weather Service](https://www.weather.gov/documentation/services-web-api/)
- **GeoJSON Data**: [Geoapify Boundaries API](https://www.geoapify.com/boundaries-api/)
- **Geocoding**: [Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/amngo/weather-map.git
cd weather-map
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root and add the following variables:

```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
NEXT_PUBLIC_GEOAPIFY_API_KEY=your_geoapify_api_key
```

### 4. Run the dev server

```bash
npm run dev
```

App should now be running at [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🧪 Linting

```bash
npm run lint
```

## 🧾 License

This project is licensed under the [MIT License](LICENSE).
