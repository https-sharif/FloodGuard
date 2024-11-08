import React, { useState } from "react";
import LocationPicker from "../components/LocationPicker";
import { Users, Package } from "lucide-react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { LocationType } from "../types/location";

interface FormType {
  teamName: string;
  memberCount: string;
  phoneNumber: string;
  aidTypes: string[];
  description: string;
  image: string;
}

const initialForm = {
  teamName: "",
  memberCount: "",
  phoneNumber: "",
  aidTypes: [] as string[],
  description: "",
  image: "",
};

function Volunteer() {
  const [form, setForm] = useState<FormType>(initialForm);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const aidOptions = [
    "Food",
    "Water",
    "Medicine",
    "Clothing",
    "Shelter",
    "Other",
  ];

  const handleAidTypeToggle = (type: string) => {
    setForm((prev) => ({
      ...prev,
      aidTypes: prev.aidTypes.includes(type)
        ? prev.aidTypes.filter((t) => t !== type)
        : [...prev.aidTypes, type],
    }));
  };

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {

    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
    if (imageList.length > 0) {
      setForm((prev) => ({ ...prev, image: imageList[0].data_url }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.image) {
      setMessage("Please upload a team photo.");
      return;
    }

    const formData = new FormData();
    formData.append("teamName", form.teamName);
    formData.append("memberCount", form.memberCount);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("aidTypes", JSON.stringify(form.aidTypes));
    formData.append("description", form.description);
    formData.append("image", form.image);
    if (location) {
      formData.append("location", JSON.stringify(location));
    }

    try {
      const response = await fetch("/submit-volunteer", {
        method: "POST",
        
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit volunteer data");
      }

      const data = await response.json();
      setMessage("Volunteer data stored successfully");
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

  return (
    <div className="min-h-[calc(100vh-4rem)] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Volunteer Registration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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

              <div>Your Location</div>
            <LocationPicker onLocationSelect={setLocation} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Photo (Optional)
              </label>
            </div>

            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={5}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                isDragging,
                dragProps,
              }) => (
                <div>
                  <div className="w-1/2 flex">
                    <button
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Click or Drop here
                    </button>
                  </div>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" onClick={onImageRemoveAll} />
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>

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
