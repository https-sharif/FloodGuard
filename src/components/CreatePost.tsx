import React, { useState } from 'react';
import { Image, Send } from 'lucide-react';

const CreatePost = () => {
    const [caption, setCaption] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async () => {
        if (!imagePreview) return;

        try {
            const response = await fetch('/submit-volunteer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imagePreview, caption }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Image uploaded successfully:', data);
                setCaption('');
                setImagePreview(null);
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h2>

            <div className="space-y-4">
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Share your volunteer experience..."
                    className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                        <Image className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-600">Add Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>

                    <button onClick={handleSubmit} className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Send className="w-4 h-4" />
                        <span>Post Update</span>
                    </button>
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
            </div>
        </div>
    );
};

export default CreatePost;