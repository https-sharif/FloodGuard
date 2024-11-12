import { motion } from "framer-motion";
import { VictimPostType } from "../types/post";
import { Clock, MapPin, Tag, Users } from "lucide-react";
import dayjs from "dayjs";

export default function VictimPost(post: VictimPostType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="font-semibold text-gray-900">{post.name}</h3>
            <div className="flex items-center text-sm text-gray-500 space-x-2">
              <span
                className={
                  "px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                }
              >
                Volunter
              </span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{dayjs(post.createdAt).fromNow()}</span>
              </div>
            </div>
          </div>
        </div>
        <span
          className={"px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"}
        >
          Active
        </span>
      </div>

      <div className="px-4 pb-3">
        <p className="text-gray-800 whitespace-pre-line">{post.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {post.needs.map((need: string) => (
            <span
              key={need}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              <Tag className="h-3 w-3 mr-1" />
              {need}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{post.author.location}</span>
          </div>
          {post.peopleCount && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{post.peopleCount} people</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
