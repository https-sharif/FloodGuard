import { motion } from "framer-motion";
import { VolunteerPostType } from "../types/post";
import { Clock, MapPin, Tag, Users } from "lucide-react";
import dayjs from "dayjs";

export default function VolunteerPost(post: VolunteerPostType) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
            <div className="p-4 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                        <div className="flex items-center">
                            <h3 className="font-semibold text-gray-900 mr-2">
                                {post.author.name}
                            </h3>
                            <h3 className="text-sm text-blue-500 font-bold">
                                ({post.teamName})
                            </h3>
                        </div>
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
                    className={
                        "px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    }
                >
                    Active
                </span>
            </div>

            <div className="px-4 pb-3">
                <p className="text-gray-800 whitespace-pre-line">
                    {post.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                    {post.aidTypes.map((need: string) => (
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
                    {post.memberCount && (
                        <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{post.memberCount} people</span>
                        </div>
                    )}
                </div>
            </div>

            {post.image && post.image.length > 0 && (
                <div className="mt-3">
                    <div className={"grid gap-1 grid-cols-1"}>
                        <img
                            src={post.image}
                            alt={`Post image`}
                            className="w-full h-48 object-cover"
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );
}
