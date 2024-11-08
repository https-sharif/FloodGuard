import { useState } from 'react';
import { Post, PostFilters } from '../types/post';
import PostCard from '../components/PostCard';
import PostFiltersComponent from '../components/PostFilters.tsx';

const DEMO_POSTS: Post[] = [
    {
        id: '1',
        author: {
            id: '1',
            name: 'Israt Jahan',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
            role: 'victim'
        },
        content: 'Urgently need assistance for a family of 5. We require food supplies and clean drinking water. Currently staying at temporary shelter.',
        location: 'North Side Shelter',
        peopleCount: 5,
        createdAt: '1h ago',
        needType: ['Food', 'Water'],
        status: 'active',
    },
    {
        id: '2',
        author: {
            id: '2',
            name: 'Ittekhar Mahin Abir',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            role: 'victim'
        },
        content: 'Need medical supplies for elderly parents. Also looking for transportation assistance to medical center.',
        images: ['https://images.unsplash.com/photo-1587854692152-cbe660dbde88'],
        location: 'East Valley Area',
        peopleCount: 3,
        createdAt: '3h ago',
        needType: ['Medicine', 'Transport'],
        status: 'active',
    }
];

export default function VictimPage() {
    const [filters, setFilters] = useState<PostFilters>({});

    const filteredPosts = DEMO_POSTS.filter((post) => {
        if (filters.status && post.status !== filters.status) return false;
        if (filters.needType?.length && !post.needType?.some(type => filters.needType?.includes(type))) return false;
        if (filters.location && !post.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-1">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Help Requests</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Filters */}
                    <div className="md:col-span-1">
                        <PostFiltersComponent
                            filters={filters}
                            onFilterChange={setFilters}
                        />
                    </div>

                    {/* Posts */}
                    <div className="md:col-span-3">
                        <div className="space-y-6">
                            {filteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
