import React from 'react';

/**
 * LogGuard Footer Component
 * Provides standard copyright and simple navigation links.
 * Styled using a dark gradient to match the Navbar for a consistent, premium feel.
 */
const Footer = () => {
    
    // Inline SVG for Lock Icon (Symbolizing security)
    const LockIcon = (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-indigo-400"
        >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
    );

    return (
        <footer className="relative bottom-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 mt-12 border-t border-gray-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-white">
                
                {/* Top Section: Logo/Branding - Now centered globally */}
                <div className="flex justify-center">
                    
                    {/* Logo/Branding - Content now centered globally */}
                    <div className="flex flex-col items-center space-y-1">
                        <div className="flex items-center space-x-2">
                            {LockIcon}
                            <span className="text-3xl font-bold text-indigo-400 tracking-wider">
                                LogGuard
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">Your shield against digital threats.</p>
                    </div>

                    {/* Navigation Links were here and are now removed */}
                </div>

                <hr className="my-4 border-gray-700" />
                
                {/* Bottom Section: Copyright */}
                <div className="text-center text-gray-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} LogGuard. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

