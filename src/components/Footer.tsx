function Footer() {
    return (
        <footer className="bg-blue-600 text-white py-6  w-full h-100vh">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <p>&copy; 2023 Flood Guard Aid Network. All rights reserved.</p>
                    <div className="space-x-4">
                        <a href="/" className="hover:underline">About Us</a>
                        <a href="/" className="hover:underline">Contact</a>
                        <a href="/" className="hover:underline">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;