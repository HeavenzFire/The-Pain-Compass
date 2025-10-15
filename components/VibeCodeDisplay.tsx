
import React from 'react';

interface VibeCodeDisplayProps {
    vibeCode: string;
    isLoading: boolean;
}

const VibeCodeDisplay: React.FC<VibeCodeDisplayProps> = ({ vibeCode, isLoading }) => {
    return (
        <div className="w-full p-4 bg-gray-800/50 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700 flex flex-col min-h-[140px]">
            <h3 className="text-sm font-semibold text-green-300 mb-3">VIBECODE</h3>
            <div className="flex-grow flex items-center justify-center">
                {isLoading ? (
                     <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                ) : (
                    <p className="text-green-200 text-center font-mono italic">"{vibeCode}"</p>
                )}
            </div>
        </div>
    );
};

export default VibeCodeDisplay;
