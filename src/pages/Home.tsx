import { useNavigate } from 'react-router-dom';
import { Users, HeartHandshake, MessageCircle, Package, UserCheck, Clock } from 'lucide-react';
import dayjs from 'dayjs';
import RT from 'dayjs/plugin/relativeTime';
// import MapComponent from '../components/Map';

dayjs.extend(RT);

const mockData = {
    stats: {
        aidDelivered: 1234,
        activeVolunteers: 89,
        pendingRequests: 15,
    },
    updates: [
        { id: 1, message: "Emergency supplies delivered to Downtown area", time: "October 13, 2014 11:13:00" },
        { id: 2, message: "New volunteer team deployed to East Side", time:("November 8, 2024 07:13:00") },
        { id: 3, message: "Medical supplies needed in North District", time: ("October 13, 2054 11:13:00") },
    ],
};

function Home() {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                    Flood Relief Aid Management
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Connecting victims with volunteers for efficient disaster response and recovery
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                <button
                    onClick={() => navigate('/victim')}
                    className="group relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-red-500 rounded-t-2xl" />
                    <Users className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">I Need Help</h2>
                    <p className="text-gray-600">
                        Register as a victim to receive immediate assistance and support from nearby volunteers
                    </p>
                </button>

                <button
                    onClick={() => navigate('/volunteer')}
                    className="group relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-500 rounded-t-2xl" />
                    <HeartHandshake className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">I Want to Help</h2>
                    <p className="text-gray-600">
                        Join as a volunteer to provide assistance and contribute to relief efforts
                    </p>
                </button>
            </div>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Aid Delivered</p>
                            <p className="text-2xl font-bold text-gray-900">{mockData.stats.aidDelivered}</p>
                        </div>
                        <Package className="h-8 w-8 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Volunteers</p>
                            <p className="text-2xl font-bold text-gray-900">{mockData.stats.activeVolunteers}</p>
                        </div>
                        <UserCheck className="h-8 w-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                            <p className="text-2xl font-bold text-gray-900">{mockData.stats.pendingRequests}</p>
                        </div>
                        <Clock className="h-8 w-8 text-red-500" />
                    </div>
                </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Assistance Map</h2>
                {/* <MapComponent
                    center={[40.7128, -74.0060]}
                    zoom={12}
                    markers={[...mockData.volunteers, ...mockData.victims] as Array<{ position: [number, number]; type: 'victim' | 'volunteer' }>}
                /> */}

            </div>

            {/* Status Updates */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Real-time Updates</h2>
                <div className="space-y-4">
                    {mockData.updates.map(update => (
                        <div key={update.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0">
                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-900">{update.message}</p>
                                <p>{dayjs(update.time).fromNow()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}


            <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300">
                <MessageCircle className="h-6 w-6" />
            </button>
        </div>
    );
}

export default Home;