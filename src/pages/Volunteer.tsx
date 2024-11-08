import React, { useState } from 'react';
import LocationPicker from '../components/LocationPicker';
import ImageUpload from '../components/PhotoUpload';
import { Users, Package } from 'lucide-react';
import PhotoUpload from '../components/PhotoUpload';


interface Location {
  latitude: number;
  longitude: number;
}

function VolunteerPage() {
  const [formData, setFormData] = useState({
    teamName: '',
    memberCount: '',
    phoneNumber: '',
    aidTypes: [] as string[],
    description: '',
  });
  const [location, setLocation] = useState<Location | null>(null);
  const [imagePreview, setImagePreview] = useState<File | null>(null);

  const aidOptions = ['Food', 'Water', 'Medicine', 'Clothing', 'Shelter', 'Other'];

  const handleAidTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      aidTypes: prev.aidTypes.includes(type)
        ? prev.aidTypes.filter(t => t !== type)
        : [...prev.aidTypes, type],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically send the data to an API
    console.log({ ...formData, location, imagePreview });
  };

  const handleImageSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Volunteer Registration</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Team Members
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.memberCount}
                    onChange={(e) => setFormData({ ...formData, memberCount: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Types of Aid Carrying
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {aidOptions.map((aid) => (
                  <button
                    key={aid}
                    type="button"
                    onClick={() => handleAidTypeToggle(aid)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                      formData.aidTypes.includes(aid)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    <Package className="h-4 w-4" />
                    <span>{aid}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Description & Resources
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Describe your team's capabilities and available resources..."
                required
              />
            </div>

            <LocationPicker onLocationSelect={setLocation} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Photo (Optional)
              </label>
              <PhotoUpload onImageSelect={handleImageSelect} previewUrl={imagePreview} />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register as Volunteer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VolunteerPage;
