export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: "volunteer" | "victim";
  };
  content: string;
  images?: string[];
  location: string;
  createdAt: string;
  needType?: string[];
  peopleCount?: number;
  status: "active" | "resolved";
}

export interface VolunteerPostType {
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  teamName: string;
  memberCount: string;
  phoneNumber: string;
  aidTypes: string[];
  description: string;
  image: string;
  createdAt: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface CoordinateType {
  latitude: number;
  longitude: number;
}
export interface VictimPostType {
  name: string;
  phone: string;
  peopleCount: number;
  createdAt: string;
  needs: string[];
  description: string;
  location: string;
  coordinates: CoordinateType;
  author: {
    coordinates: CoordinateType;
    location: string;
  };
}

export interface PostFilters {
  status?: "active" | "resolved";
  needType?: string[];
  location?: string;
  latest?: string;
}
