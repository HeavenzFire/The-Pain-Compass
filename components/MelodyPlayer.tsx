
import React, { useState } from 'react';
import { MelodyNote } from '../types';
import { playMelody } from '../services/audioService';

interface MelodyPlayerProps {
    melody: MelodyNote[];
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MelodyPlayer: React.FC<MelodyPlayerProps> = ({ melody }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        if (melody.length > 0 && !isPlaying) {
            setIsPlaying(true);
            playMelody(melody, () => setIsPlaying(false));
        }
    };

    return (
        <div className="w-full p-4 bg-gray-800/50 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700 flex flex-col justify-between">
            <div>
                <h3 className="text-sm font-semibold text-purple-300 mb-3">7-NOTE MELODY</h3>
                <div className="flex space-x-2 items-center h-8">
                    {melody.map((note, index) => (
                        <div
                            key={index}
                            className="w-full bg-gray-700 rounded-full h-1"
                            style={{ height: `${4 + (note.freq % 200) / 20}px` }}
                        ></div>
                    ))}
                </div>
            </div>
            <button
                onClick={handlePlay}
                disabled={isPlaying}
                className="mt-4 w-full flex items-center justify-center py-2 px-4 text-sm font-semibold text-gray-900 bg-purple-400 rounded-lg shadow-md hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                <PlayIcon />
                <span className="ml-2">{isPlaying ? 'Playing...' : 'Play Melody'}</span>
            </button>
        </div>
    );
};

export default MelodyPlayer;
