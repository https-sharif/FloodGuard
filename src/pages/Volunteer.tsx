import React, { useState } from "react";
import LocationPicker from "../components/LocationPicker";
import { Users, Package, Image } from "lucide-react";
import { LocationType } from "../types/location";
import { VolunteerPostType } from "../types/post";

const initialForm = {
  author: {
    name: "",
    avatar: "",
    location: "",
  },
  teamName: "",
  memberCount: "",
  phoneNumber: "",
  aidTypes: [] as string[],
  description: "",
  image: "",
  createdAt: "",
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
};

const aidOptions = [
  "Food",
  "Medicine",
  "Shelter",
  "Clothing",
  "Transport",
  "Other",
];

const fetchUser = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?inc=name,picture,location");
    const data = await response.json();
    const user = data.results[0];
    const avatar = user.picture.thumbnail;
    const name = `${user.name.first} ${user.name.last}`;
    const location = `${user.location.street.name}, ${user.location.city}`;
    const coordinates = {
      latitude: user.location.coordinates.latitude,
      longitude: user.location.coordinates.longitude,
    };
    return { avatar, name, location, coordinates };
  } catch (error) {
    console.error(error);
  }
};

function Volunteer() {
  const [form, setForm] = useState<VolunteerPostType>(initialForm);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleAidTypeToggle = (type: string) => {
    setForm((prev) => ({
      ...prev,
      aidTypes: prev.aidTypes.includes(type)
        ? prev.aidTypes.filter((t) => t !== type)
        : [...prev.aidTypes, type],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.image) {
      setMessage("Please upload a team photo.");
      return;
    }
    const requestBody = {
      ...form,
      author: await fetchUser(),
      createdAt: new Date().toISOString(),
      location: location,
    };

    try {
      const response = await fetch("/submit-volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit volunteer data");
      }
      setMessage("Volunteer data stored successfully");
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setMessage("An unknown error occurred");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Volunteer Registration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text- text-gray-700 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={form.teamName}
                onChange={(e) => setForm({ ...form, teamName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-bold text- text-gray-700 mb-2">
                  Number of Team Members
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={form.memberCount}
                    onChange={(e) =>
                      setForm({ ...form, memberCount: e.target.value })
                    }
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-bold text- text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, phoneNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text- text-gray-700 mb-2">
                Types of Aid Carrying
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {aidOptions.map((aid) => (
                  <button
                    key={aid}
                    type="button"
                    onClick={() => handleAidTypeToggle(aid)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                      form.aidTypes.includes(aid)
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <Package className="h-4 w-4" />
                    <span>{aid}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text- text-gray-700 mb-2">
                Team Description & Resources
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Describe your team's capabilities and available resources..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text- text-gray-700 mb-2">
                Your Location
              </label>
            </div>
            <LocationPicker onLocationSelect={setLocation} />

            <div>
              <label className="block text-sm font-bold text- text-gray-700 mb-2">
                Photo
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Image className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-64 rounded-lg object-cover"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register as Volunteer
            </button>
          </form>

          {message && (
            <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-md">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Volunteer;


// We are currently stranded due to heavy flooding in our area. Water levels have risen, and access to essential supplies is completely cut off. One member of the group has a medical condition that requires immediate attention. We also need dry clothes and safe drinking water. A diabetic member in the group needs insulin. Please prioritize medical supplies for this.
// Our team is ready to assist with immediate relief efforts in areas affected by the recent flood. We have a doctor and a paramedic in our group, along with food packets, water bottles, and warm clothing for distribution.