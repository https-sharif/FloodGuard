import { useNavigate } from 'react-router-dom';
import { Users, HeartHandshake, MessageCircle, Package, UserCheck, Clock } from 'lucide-react';
import dayjs from 'dayjs';
import RT from 'dayjs/plugin/relativeTime';
import Footer from '../components/Footer';
import MapComponent from '../components/Map';

dayjs.extend(RT);

const mockData = {
    stats: {
        aidDelivered: 672,
        activeVolunteers: 89,
        pendingRequests: 15,
    },
    updates: [
        { id: 1, message: "Emergency supplies delivered to Downtown area", time: "November 8, 2024 18:13:00" },
        { id: 2, message: "New volunteer team deployed to East Side", time:"November 8, 2024 17:13:00" },
        { id: 3, message: "Medical supplies needed in North District", time: "November 8, 2024 11:23:00" },
    ],
};

function Home() {
    const navigate = useNavigate();

    
    const openForm = () => {
        const form = document.getElementById("myForm");
        if (form) {
            form.style.display = "block";
        }
    }

    return (
        <>
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


            <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Assistance Map</h2>
            </div>

            <div className='bg-white rounded-xl shadow-lg p-6 mb-12'> 
                <MapComponent />
            </div>

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

        <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300" onClick={openForm}>
            <MessageCircle className="h-6 w-6" />
        </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
        <h1 className="text-3xl font-bold mb-4">Record-Breaking Floods Devastate Bangladesh: A Humanitarian Crisis Unfolds</h1>
        <p>
          <b>Kuala Lumpur/Dhaka, 28 June 2022</b> - In June 2022, Bangladesh faced unprecedented flooding that affected an estimated 7.2 million people in the northeastern region. Torrential rains and upstream water submerged around 94% of Sunamganj and 84% of Sylhet districts, bordering the Meghalaya state of India. Parts of Meghalaya experienced the highest rainfall in decades, causing large river systems to overflow and inundate surrounding areas.
          <br /> <br />
          <b>A Humanitarian Response</b>: The Bangladesh Red Crescent Society (BDRCS) has been at the forefront of relief efforts. Secretary General Kazi Shofiqul Azam highlighted the severity of the situation, noting that many people had to take refuge as their homes were submerged. The BDRCS launched a USD 10 million strategy to provide dry foods, cooked food, and safe drinking water to those affected. They also distributed food packages, healthcare services, hygiene kits, and tarpaulins.
          <br /><br />
          <b>International Support</b>: The International Federation of Red Cross and Red Crescent Societies (IFRC) launched an emergency appeal for CHF 7.5 million (USD 7.8 million) to support the BDRCS's localized response and recovery efforts. IFRC Head of Bangladesh Country Delegation Sanjeev Kafley emphasized the urgency of scaling up operations to meet the immediate needs of the affected population.
          <br /><br />
          <b>Recent Floods and Ongoing Challenges</b>: Since late August 2024, severe flash floods and monsoons have affected nearly 6 million people in Bangladesh, declared the worst climate disaster in recent memory. The floods, following Cyclone Remal, have caused widespread destruction in districts like Feni, Cumilla, Laxipur, Chattogram, and Noakhali. The United Nations Children's Fund (UNICEF) reported 71 deaths and significant internal displacement, with 500,000 people in over 3,400 evacuation shelters.
          <br /><br />
          <b>Infrastructure and Health Crisis</b>: Floods have damaged critical infrastructure, impeding relief efforts. Farah Kabir, Country Director of ActionAid Bangladesh, noted the disruption of roads and communication, making it difficult for people to reach safety and essential resources. The collapse of sanitation systems has heightened the public health crisis, with thousands hospitalized due to waterborne diseases. UNICEF has distributed 3.6 million water purification tablets to prevent illness.
          <br /><br />
          <b>Economic Impact</b>: The floods have devastated agriculture, causing a loss of USD 282 million due to crop damage and impacting over 1.3 million farmers. The livestock and fisheries sectors have also suffered, with losses amounting to USD 156 million. This has exacerbated food insecurity, with thousands of families stranded in shelters without food. The World Food Programme (WFP) is delivering fortified biscuits to 60,000 families in the hardest-hit areas.
          <br /><br />
          <b>Economic Impact</b>: The floods underscore the urgent need to address the climate crisis. Bangladesh, one of the world's most climate-sensitive nations, faces annual river flooding affecting millions. Deputy Representative of UNICEF Bangladesh, Emma Brigham, stressed the importance of building resilience to extreme weather events, particularly for children who have lost homes, schools, and loved ones.

          The international community must rally to support Bangladesh in this time of crisis, providing immediate relief and long-term solutions to mitigate the impacts of climate change.
        </p>
      </div>

          <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300">
              <MessageCircle className="h-6 w-6" />
          </button>
        </div>
        <Footer />
        </>
    );
}

export default Home;