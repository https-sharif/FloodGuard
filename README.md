# FloodGuard Aid Network

FloodGuard Aid Network is a web-based application designed to assist flood-affected people by connecting victims with volunteers for aid distribution and real-time updates. The system includes features such as mapping victim and volunteer locations, weather updates, and a dashboard for tracking aid requests and volunteer deployment.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Live Demo](#live-demo)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Victim Registration**: Victims can register to request aid and be located on the map.
- **Volunteer Registration**: Volunteers can sign up to offer assistance and be deployed as needed.
- **Interactive Map**: Displays the locations of victims and volunteers with real-time updates.
- **Weather and Alerts**: Integrates with OpenWeatherMap API to display weather information and flood alerts.
- **Dashboard**: Shows statistics on aid distribution, active volunteers, and pending requests.

## Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS, Leaflet (for maps)
- **APIs**:
  - Google Maps API for location and map markers
  - OpenWeatherMap API for weather and alert data

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/https-sharif/FloodGuard.git
   cd FloodGuard
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a .env file in the root directory and add your API keys (refer to Environment Variables section).

4  **Start the development server**:
   ```bash
   npm run dev
   ```

## Usage

1. **Register as a victim or volunteer**:
   - Victims can register to request help.
   - Volunteers can sign up to assist in relief efforts.

2. **Dashboard**:
   - View real-time updates, aid statistics, and status of requests.
   
3. **Interactive Map**:
   - View locations of victims and volunteers.
   - Overlay of current weather and flood alerts using OpenWeatherMap.

## Environment Variables
   Make sure to set up the following environment variables in your ```.env``` file:

   ```plaintext
   VITE_GOOGLE_MAPS_API_KEY=<Your Google Maps API Key>
   VITE_OPENWEATHER_API_KEY=<Your OpenWeatherMap API Key>
   ```

## Project Structure
   ```plaintext
   FloodGuard_Aid_Network/
   ├── public/             # Public files
   ├── src/                
   │   ├── components/     # UI components (e.g., Map, Dashboard)
   │   ├── pages/          # Main pages (Home, Volunteer, Victim)
   │   ├── styles/         # CSS and styling files
   │   ├── App.tsx         # Root component
   │   └── index.tsx       # Entry point
   ├── .env                # Environment variables
   ├── README.md           # Project documentation
   └── package.json        # Project dependencies and scripts
   ```
## Screenshots
   Here are some screenshots of the application:

   - **Home Page**: Displays an overview and options for victim and volunteer registration.
   - **Live Assistance Map**: Real-time map showing victim and volunteer locations.
   - **Dashboard**: Displays statistics on aid distribution and active volunteers.
     

![Home Page](https://github.com/user-attachments/assets/9efea131-d099-433b-8e01-b193658e2b2f)

![Live Assistance Map](https://github.com/user-attachments/assets/ee682655-1e04-4896-bf55-6d0f6a2b4553)

![Dashboard](https://github.com/user-attachments/assets/769df0a3-9072-47e9-9649-fea28c6d6d33)

## Live Demo
   You can view the live demo of the application here. (https://flood-guard.vercel.app/dashboard)

## Contributing
   Contributions are welcome! Please fork the repository and create a pull request for any changes you’d like to make.

### Contribution Guidelines
   1. **Fork the repository**.
   2. **Create a new feature branch**:
   ```bash
   git checkout -b feature/YourFeature
   ```
   3. **Commit your changes**:
   ```bash
   git commit -m 'Add new feature'
   ```
   4. **Push to the branch**:
   ```bash
   git push origin feature/YourFeature
   ```
   4. **Create a pull request**.

## License
   This project is licensed under the MIT License. See the LICENSE file for details.
