export interface LocationType {
    latitude: number;
    longitude: number;
  }


export interface LocationPickerProps {
    onLocationSelect: ({
        latitude,
        longitude,
    } : LocationType) => void;
  }