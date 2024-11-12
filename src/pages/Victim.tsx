import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import LocationPicker from "../components/LocationPicker";
import { LocationType} from "../types/location";
import { CoordinateType, VictimPostType } from "../types/post";

const initialForm: VictimPostType = {
  name: "",
  phone: "",
  peopleCount: 1,
  needs: [],
  description: "",
  createdAt: "",
  location: "",
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  author: {
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    location: "",
  },
};

const emergencyNeeds = [
  "Food",
  "Medicine",
  "Shelter",
  "Clothing", 
  "Transport",
  "Other",
];

const fetchUser = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?inc=name,location');
    const data = await response.json();
    const user = data.results[0];
    const location = `${user.location.street.name}, ${user.location.city}`;
    const coordinates : CoordinateType = {
      latitude: user.location.coordinates.latitude,
      longitude: user.location.coordinates.longitude
    };
    return { coordinates , location };
  } catch (error) {
    console.error(error);
  }
}

function Victim() {
  const [form, setForm] = useState<VictimPostType>(initialForm);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = {
      ...form,
      author: await fetchUser(),
      createdAt: new Date().toISOString(),
      location: location,
    };
    console.log(requestBody);

    try {
      const response = await fetch("/submit-victim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });


      if (!response.ok) {
        await response.json();
        throw new Error("Failed to submit victim data");
      }
      setMessage("Your emergency request has been submitted successfully. Help is on the way!");
      setForm(initialForm);
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  const handleNeedsChange = (need: string) => {
    setForm((prev) => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter((n) => n !== need)
        : [...prev.needs, need],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Emergency Assistance Request
          </h1>
          <p className="text-gray-600">
            Please provide accurate information to help us reach you quickly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 p-1.5"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 border px-2 block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="mt-1 block px-2 border w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>

            <div>
              <label
                htmlFor="peopleCount"
                className="block text-sm font-medium text-gray-700"
              >
                Number of People Needing Assistance
              </label>
              <input
                type="number"
                id="peopleCount"
                min="1"
                required
                className="mt-1 block px-2 w-64 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={form.peopleCount}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    peopleCount: parseInt(e.target.value),
                  }))
                }
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Needs
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {emergencyNeeds.map((need) => (
                  <label
                    key={need}
                    className={`
                      flex items-center justify-center px-4 py-2 rounded-md border cursor-pointer
                      ${
                        form.needs.includes(need)
                          ? "bg-blue-50 border-blue-500 text-blue-700"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={form.needs.includes(need)}
                      onChange={() => handleNeedsChange(need)}
                    />
                    <span>{need}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Situation Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="mt-1 block border px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Please describe your current situation and any specific needs..."
              />
            </div>
            <div>Your Location</div>
            <LocationPicker onLocationSelect={setLocation} />
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  In case of immediate life-threatening emergency, please
                  contact local emergency services directly.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Emergency Request
          </button>
        </form>

        {message && (
          <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-md">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Victim;
