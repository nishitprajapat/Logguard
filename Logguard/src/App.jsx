import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    
      <Navbar/>
      <Manager/>
      <Footer/>
    </>
  )
}

export default App



// code with loading animation

// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import Manager from './components/Manager'
// import './App.css'
// import LogGuardApp from './components/LogGuardApp'

// // Renamed the component to 'App' for standard React structure
// const App = () => {
//     // 1. STATE: Tracks if the loading animation component is rendered
//     const [isLoading, setIsLoading] = useState(true);
//     // 2. STATE: Triggers the CSS exit animation (scale down and fade)
//     const [isExiting, setIsExiting] = useState(false);
    
//     // 3. EFFECT: Timer to manage loading and exit transition
//     useEffect(() => {
//         // Step 1: Start the exit animation (fade and scale down) after 2.5 seconds
//         const startExitTimer = setTimeout(() => {
//             setIsExiting(true);
//         }, 2500); 

//         // Step 2: Hide the splash screen completely after 3 seconds
//         const endLoadTimer = setTimeout(() => {
//             setIsLoading(false);
//         }, 3000); 

//         // Cleanup: Clear both timeouts
//         return () => {
//             clearTimeout(startExitTimer);
//             clearTimeout(endLoadTimer);
//         };
//     }, []); 
    
//     // Inline SVG for Lock Icon (The element that will animate)
//     const LockIcon = (
//         <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             width="64" 
//             height="64" 
//             viewBox="0 0 24 24" 
//             fill="none" 
//             stroke="currentColor" 
//             strokeWidth="1.5" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//             // Apply scale and opacity transition based on isExiting state
//             className={`text-indigo-400 transition-all duration-500 ease-in-out 
//                         ${isExiting ? 'scale-75 opacity-0' : 'scale-100'} 
//                         ${!isExiting ? 'animate-spin-slow' : ''}`}
//         >
//             <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
//             <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//         </svg>
//     );
    
//     // Custom slow spin animation utility for Tailwind
//     const slowSpin = `
//         @keyframes spin-slow {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//             animation: spin-slow 2s linear infinite;
//         }
//     `;

//     // --- Conditional Rendering ---
    
//     if (isLoading) {
//         return (
//             <>
//                 {/* Inject custom animation CSS (necessary since Tailwind doesn't have a 2s spin) */}
//                 <style>{slowSpin}</style>

//                 {/* Main Splash Screen Container - Fades out entirely */}
//                 <div 
//                     className={`min-h-screen bg-gray-900 flex flex-col items-center justify-center 
//                                 transition-opacity duration-500 ease-in-out 
//                                 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
//                 >
//                     {/* Loader Logo Area */}
//                     <div className="flex flex-col items-center space-y-4">
//                         {LockIcon} 
//                         {/* Text follows the same scale and opacity transition */}
//                         <span className={`text-6xl font-black text-indigo-400 tracking-wider cursor-default drop-shadow-xl 
//                                           transition-all duration-500 ease-in-out
//                                           ${isExiting ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`}>
//                             LogGuard
//                         </span>
//                         {/* Loading text fades out */}
//                         <p className={`text-gray-500 text-lg mt-4 animate-pulse transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>Loading the secure vault...</p>
//                     </div>
//                 </div>
//             </>
//         );
//     }
    
//     // If loading is complete, show the main application content
//     return (
//         // The main content should fade in immediately after the splash screen is gone
//        <> 
//       <Navbar/>
//       <Manager/>
//       <Footer/> </>
//     );
// };

// // Renamed export to match common practice
// export default App;
