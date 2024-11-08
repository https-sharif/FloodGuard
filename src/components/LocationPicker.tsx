import {useState,useEffect} from 'react';
import { MapPin } from 'lucide-react';
import { LocationPickerProps } from '../types/location';

function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
      return;
    }

    setStatus('Locating...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus('Location found');
        onLocationSelect({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setStatus('Unable to retrieve your location');
      }
    );
  }, [onLocationSelect]);

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <MapPin className="h-5 w-5" />
      <span>{status}</span>
    </div>
  );
}

export default LocationPicker;
