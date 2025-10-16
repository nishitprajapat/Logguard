import React from 'react';

/**
 * LogGuard Navbar Component - Attractive Design
 * Features: App logo (with Lock Icon) on the left, and a vibrant GitHub link button on the right.
 * Styled using a dark gradient and deep shadows for a premium, secure feel.
 */
const Navbar = () => {
  // Inline SVG for Lock Icon (Copied from Footer for branding consistency)
  const LockIcon = (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" // Increased size slightly for the header
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

  // Inline SVG for GitHub Icon (Kept for compatibility)
  const GitHubIcon = (
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
      className="w-5 h-5"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.2 0 6.4-1.7 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19 3a5 5 0 0 0-1 3.5 1 1 0 0 0 1 .5c.4 0 .7.1.9.3.2.1.3.3.3.6 0 .4-.1.7-.3.9a3.5 3.5 0 0 1-.9.3 5.4 5.4 0 0 0-4.8 4.8c0 5.3-3.2 7-6.4 7a4.8 4.8 0 0 0-1 3.5v4"/>
      <path d="M12 17c-2.7 0-5.2-1.4-6.8-3.5a4.8 4.8 0 0 1-1-3.5"/>
      <path d="M10 7H8v4h2V7z"/>
      <path d="M14 7h-2v4h2V7z"/>
    </svg>
  );

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-2xl sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        
        {/* Logo/App Name (Left Side) - Now includes the Lock Icon */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          {LockIcon} 
          <span className="text-3xl lg:text-2xl font-black text-indigo-400 tracking-wider cursor-default drop-shadow-lg">
            LogGuard
          </span>
        </div>
        
        {/* GitHub Button (Right Side - Now a styled button) */}
        <a 
          href="https://github.com/nishitprajapat" // TODO: Update this link to your actual GitHub repo
          target="_blank" 
          rel="noopener noreferrer"
          title="View on GitHub"
          className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-full 
                      bg-indigo-600 text-white shadow-md shadow-indigo-500/50 
                      transition-all duration-300 ease-in-out 
                      hover:bg-indigo-500 hover:scale-105 
                      focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          {GitHubIcon}
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
