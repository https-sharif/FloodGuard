import { MoreVertical, Edit2, Trash2 } from "lucide-react";

const PostsList = () => {
  const posts = [
    {
      id: 1,
      caption:
        "Distributed food packages to 50 families in downtown area today. The smiles on their faces made it all worth it! 🙏",
      date: "2024-03-15T14:30:00",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      caption:
        "Set up a medical camp in collaboration with local doctors. Provided free checkups and medicines to over 100 people.",
      date: "2024-03-14T09:15:00",
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Previous Posts</h2>

      <div className="space-y-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border-b border-gray-200 pb-8 last:border-b-0"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 m-10 mb-1">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="relative group">
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block">
                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Post</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-gray-100">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Post</span>
                  </button>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4 mx-10">{post.caption}</p>
            <div className="flex flex-col justify-center items-center">
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-1/2 object-contain rounded-lg"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
