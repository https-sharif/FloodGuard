import { useEffect, useRef, useMemo } from "react";
declare global {
  interface Window {
    google: typeof google;
  }
}

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const victimLocations = useMemo(
    () => [
      { lat: 23.8103, lng: 90.4125 },
      { lat: 24.3636, lng: 88.6241 },
    ],
    []
  );

  const volunteerLocations = useMemo(
    () => [
      { lat: 22.3569, lng: 91.7832 },
      { lat: 23.2513, lng: 89.5669 },
    ],
    []
  );

  useEffect(() => {
    const initMap = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const map = new window.google.maps.Map(mapRef.current as HTMLElement, {
          zoom: 7,
          center: { lat: latitude, lng: longitude },
        });

        victimLocations.forEach((location) => {
          new window.google.maps.marker.AdvancedMarkerElement({
            position: location,
            map: map,
            title: "Victim Location",
          });
        });

        volunteerLocations.forEach((location) => {
          new window.google.maps.marker.AdvancedMarkerElement({
            position: location,
            map: map,
            title: "Volunteer Location",
          });
        });
      });
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.gomaps.pro/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [victimLocations, volunteerLocations]);

  return (
    <div className="flex items-center justify-center">
      <div ref={mapRef} className="h-[500px] w-4/5" />
    </div>
  );
};

export default Map;
