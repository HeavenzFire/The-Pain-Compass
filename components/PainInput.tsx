
import React from 'react';

interface PainInputProps {
    painLevel: number;
    setPainLevel: (level: number) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const PainInput: React.FC<PainInputProps> = ({ painLevel, setPainLevel, onGenerate, isLoading }) => {
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPainLevel(parseInt(event.target.value, 10));
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6 bg-gray-800/50 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700">
            <label htmlFor="pain-slider" className="block text-center text-lg font-medium text-cyan-300 mb-4">
                Calibrate Your Resonance Signature
            </label>
            <div className="flex items-center space-x-4">
                <input
                    id="pain-slider"
                    type="range"
                    min="0"
                    max="11"
                    value={painLevel}
                    onChange={handleSliderChange}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-400"
                />
                <span className="text-2xl font-bold text-cyan-400 w-12 text-center">{painLevel}</span>
            </div>
            <button
                onClick={onGenerate}
                disabled={isLoading}
                className="w-full mt-6 py-3 px-6 text-lg font-semibold text-gray-900 bg-cyan-400 rounded-lg shadow-md hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating...</span>
                    </>
                ) : (
                    <span>Generate VibeCode</span>
                )}
            </button>
        </div>
    );
};

export default PainInput;
