import { MapPin, Clock, Users, Tag } from 'lucide-react';
import { Post } from '../types/post';
import { motion } from 'framer-motion';;

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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
                        <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${post.author.role === 'volunteer'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                {post.author.role.charAt(0).toUpperCase() + post.author.role.slice(1)}
                            </span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{post.createdAt}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${post.status === 'active'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
            </div>

            <div className="px-4 pb-3">
                <p className="text-gray-800 whitespace-pre-line">{post.content}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                    {post.needType?.map((need) => (
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
                        <span>{post.location}</span>
                    </div>
                    {post.peopleCount && (
                        <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{post.peopleCount} people</span>
                        </div>
                    )}
                </div>
            </div>

            {post.images && post.images.length > 0 && (
                <div className="mt-3">
                    <div className={`grid gap-1 ${post.images.length === 1 ? 'grid-cols-1' :
                            post.images.length === 2 ? 'grid-cols-2' :
                                'grid-cols-2 md:grid-cols-3'
                        }`}>
                        {post.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Post image ${index + 1}`}
                                className="w-full h-48 object-cover"
                            />
                        ))}
                    </div>
                </div>
            )}

            
        </motion.div>
    );
}