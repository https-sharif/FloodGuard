import { useState , useEffect } from "react";
import { PostFilters, VictimPostType } from "../types/post.ts";
import PostFiltersComponent from "../components/PostFilters.tsx";
import VictimPost from "../components/VictimPost.tsx";

export default function AffectedPage() {
  const [filters, setFilters] = useState<PostFilters>({});
  const [posts, setPosts] = useState<VictimPostType[]>([]);

  const filteredPosts = posts
    .filter((post) => {
      if (
        filters.needType?.length &&
        !post.needs?.some((type) => filters.needType?.includes(type))
      )
        return false;
      if (
        filters.location &&
        !post.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      )
        return false;
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching victim posts...");
        const response = await fetch("/get-victim");
        const data = await response.json();
        console.log("Fetched victim posts: ", data.data);
        setPosts(data.data);
        console.log(typeof data.data);
      } catch (error) {
        console.error(
          "Error fetching victim posts: ",
          error,
          "Please refresh the page"
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-1">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Help Requests</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <PostFiltersComponent
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          {filteredPosts.length > 0 ? (
            <div className="md:col-span-3">
              <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <VictimPost key={index} {...post} />
                ))}
              </div>
            </div>
          ) : (
            <div className="md:col-span-3 bg-white border border-blue-500 rounded-lg shadow-sm p-4 justify-center items-center flex text-2xl font-bold text-center">
              NO POSTS FOUND
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
