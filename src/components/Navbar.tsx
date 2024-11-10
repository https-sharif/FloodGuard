import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, HeartHandshake, LayoutDashboard } from 'lucide-react';


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: 'Home', icon: <Home className="w-5 h-5" />, path: '/' },
        { name: 'Affected', icon: <Users className="w-5 h-5" />, path: '/affected-page' },
        { name: 'Volunteer', icon: <HeartHandshake className="w-5 h-5" />, path: '/volunteer-page' },
        { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
    ];

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Flood Guard
                        </button>
                    </div>

                    <div className="hidden sm:flex sm:items-center">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`ml-8 inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out ${location.pathname === item.path
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}
                `}
                            >
                                {item.icon}
                                <span className="ml-2">{item.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center sm:hidden">
                        <button
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div id="mobile-menu" className="sm:hidden hidden">
                <div className="pt-2 pb-3 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => {
                                navigate(item.path);
                                document.getElementById('mobile-menu')?.classList.add('hidden');
                            }}
                            className={`
                w-full flex items-center px-4 py-2 text-base font-medium
                transition-colors duration-200 ease-in-out
                ${location.pathname === item.path
                                    ? 'text-blue-600 bg-blue-50'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}
                `}
                        >
                            {item.icon}
                            <span className="ml-3">{item.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;