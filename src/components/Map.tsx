/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const MapComponent = () => {
  const mapRef = useRef(null);

  const victimLocations = [
    { lat: 23.8103, lng: 90.4125 },
    { lat: 24.3636, lng: 88.6241 }  
  ];

  const volunteerLocations = [
    { lat: 22.3569, lng: 91.7832 }, 
    { lat: 23.2513, lng: 89.5669 }  
  ];

  useEffect(() => {
    const initMap = () => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        const map = new (window as any).google.maps.Map(mapRef.current, {
          zoom: 7,
          center: { lat: latitude, lng: longitude }
        });

        
        victimLocations.forEach(location => {
          new (window as any).google.maps.Marker({
            position: location,
            map: map,
            icon: {
              path: (window as any).google.maps.SymbolPath.CIRCLE,
              fillColor: "red",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
              scale: 10
            },
            title: "Victim Location"
          });
        });

        
        volunteerLocations.forEach(location => {
          new window.google.maps.Marker({
            position: location,
            map: map,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: "green",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
              scale: 10
            },
            title: "Volunteer Location"
          });
        });

        
        const openWeatherMapLayer = new (window as any).google.maps.ImageMapType({
          getTileUrl: (coord: any, zoom: any) =>
            `https://tile.openweathermap.org/map/precipitation_new/${zoom}/${coord.x}/${coord.y}.png?appid=5510e55cbbf0fe0a5bdb54fac87c8cd4`,
          tileSize: new window.google.maps.Size(256, 256),
          opacity: 0.6,
          name: "OpenWeatherMap Precipitation"
        });

        map.overlayMapTypes.insertAt(0, openWeatherMapLayer);
      });
    };

    if ((window as any).google) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://maps.gomaps.pro/maps/api/js?key=AlzaSy6A8QOu_N_UDfp3vosT8qwPTxbQ3hH2cpK";
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />
  );
};

export default MapComponent;