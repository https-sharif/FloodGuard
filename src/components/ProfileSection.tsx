import { useState } from "react";
import { Edit2, Users, Package } from "lucide-react";

const ProfileSection = () => {
  const [form, setForm] = useState({
    teamName: "Hope Helpers",
    members: 5,
    aidTypes: ["Food", "Medicine", "Clothing", "Shelter"],
  });

  const [prevForm, setPrevForm] = useState(form);

  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    if (form.teamName.trim() === "" || form.members <= 0) {
      // alert("Please enter a valid team name and number of members.");
      return;
    }
    setEditing(!editing);
    setPrevForm(form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleCancel = () => {
    setForm(prevForm);
    setEditing(false);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Team Profile</h2>
       
        {!editing ? (
          <button
          onClick={handleEdit}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
        ) : (
          <button
          onClick={handleCancel}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          <span>Cancel</span>
        </button>
        )}
      </div>

      {editing ? (
        <form>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <label className="text-sm text-gray-500">Team Name</label>
                  <input
                    type="text"
                    name="teamName"
                    maxLength={30}
                    required
                    defaultValue={form.teamName}
                    onChange={handleChange}
                    className="mt-1 block border px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-blue-600" />
                <div>
                  <label className="text-sm text-gray-500">Team Members</label>
                  <input
                    name="members"
                    type="number"
                    min={1}
                    max={10}
                    required
                    defaultValue={form.members}
                    onChange={handleChange}
                    className="mt-1 block w-full border px-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleEdit}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Team Name</p>
                <p className="font-semibold text-gray-800">
                  {form.teamName}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Team Members</p>
                <p className="font-semibold text-gray-800">
                  {form.members} members
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
