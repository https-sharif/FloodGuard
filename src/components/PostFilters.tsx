import { Filter } from 'lucide-react';
import { PostFilters as FilterType } from '../types/post';

interface PostFiltersProps {
    filters: FilterType;
    onFilterChange: (filters: FilterType) => void;
}

export default function PostFilters({ filters, onFilterChange }: PostFiltersProps) {
    const needTypes = ['Food', 'Medicine', 'Shelter', 'Clothing', 'Transport'];

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center space-x-2 mb-4">
                <Filter className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <select
                        value={filters.status || ''}
                        onChange={(e) => onFilterChange({ ...filters, status: e.target.value as 'active' | 'resolved' | undefined })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Need Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {needTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => {
                                    const currentTypes = filters.needType || [];
                                    const newTypes = currentTypes.includes(type)
                                        ? currentTypes.filter((t) => t !== type)
                                        : [...currentTypes, type];
                                    onFilterChange({ ...filters, needType: newTypes });
                                }}
                                className={`px-3 py-1 rounded-full text-sm ${filters.needType?.includes(type)
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-gray-100 text-gray-800'
                                    } hover:bg-blue-200 transition-colors`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        value={filters.location || ''}
                        onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
                        placeholder="Enter location..."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}