import { useState } from 'react';
import { Post, PostFilters } from '../types/post';
import PostCard from '../components/PostCard';
import PostFiltersComponent from '../components/PostFilters.tsx';

const DEMO_POSTS: Post[] = [
    {
        id: '1',
        author: {
            id: '1',
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            role: 'volunteer'
        },
        content: 'Available to help with food and medicine distribution in downtown area. Can accommodate up to 20 families. Available from 9 AM to 5 PM.',
        location: 'Downtown Relief Center',
        createdAt: '2h ago',
        needType: ['Food', 'Medicine'],
        status: 'active',
    },
    {
        id: '2',
        author: {
            id: '2',
            name: 'Michael Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            role: 'volunteer'
        },
        content: 'Our team has set up a temporary shelter with basic amenities. We can provide immediate housing assistance for flood-affected families.',
        images: [
            'https://images.unsplash.com/photo-1527853787696-f7be74f2e39a',
            'https://images.unsplash.com/photo-1601055283742-8b27e81b5553'
        ],
        location: 'Riverside Community Center',
        createdAt: '5h ago',
        needType: ['Shelter', 'Clothing'],
        status: 'active',

    }
];

export default function VolunteerPage() {
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
                    <h1 className="text-2xl font-bold text-gray-900">Volunteer Posts</h1>
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