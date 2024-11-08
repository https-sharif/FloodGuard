export interface Post {
    id: string;
    author: {
        id: string;
        name: string;
        avatar: string;
        role: 'volunteer' | 'victim';
    };
    content: string;
    images?: string[];
    location: string;
    createdAt: string;
    needType?: string[];
    peopleCount?: number;
    status: 'active' | 'resolved';
}

export interface PostFilters {
    status?: 'active' | 'resolved';
    needType?: string[];
    location?: string;
}