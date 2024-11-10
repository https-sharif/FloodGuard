import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import LocationPicker from "../components/LocationPicker";
import { LocationType } from "../types/location";

interface VictimForm {
  name: string;
  phone: string;
  peopleCount: number;
  needs: string[];
  description: string;
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

const initialForm: VictimForm = {
  name: "",
  phone: "",
  peopleCount: 1,
  needs: [],
  description: "",
  location: null,
};

const emergencyNeeds = [
  "Water",
  "Food",
  "Medical Aid",
  "Shelter",
  "Evacuation",
  "Clothing",
];

function Victim() {
  const [form, setForm] = useState<VictimForm>(initialForm);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("peopleCount", form.peopleCount.toString());
    formData.append("needs", form.needs.join(","));
    formData.append("description", form.description);
    if (location) {
      formData.append("location", JSON.stringify(location));
    }

    try {
      const response = await fetch("/submit-victim", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit your request");
      }

      const data = await response.json();
      setMessage(
        "Your request has been submitted. Please wait for the rescue team to reach out to you."
      );
      console.log(data);
      setForm(initialForm);
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Error: " + error.message);
      } else {
        setMessage("An unknown error occurred");
      }
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
                className="mt-1 block w-64 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
