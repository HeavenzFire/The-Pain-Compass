
import React, { useState, useCallback } from 'react';
import PainInput from './components/PainInput';
import FractalDisplay from './components/FractalDisplay';
import MelodyPlayer from './components/MelodyPlayer';
import VibeCodeDisplay from './components/VibeCodeDisplay';
import { generateVibeCode } from './services/geminiService';
import { generateMelody } from './services/audioService';
import { MelodyNote } from './types';

function App() {
    const [painLevel, setPainLevel] = useState<number>(5);
    const [generatedPainLevel, setGeneratedPainLevel] = useState<number | null>(null);
    const [melody, setMelody] = useState<MelodyNote[]>([]);
    const [vibeCode, setVibeCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasGenerated, setHasGenerated] = useState<boolean>(false);

    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        setHasGenerated(true);

        // Client-side generation is fast, so update immediately
        setGeneratedPainLevel(painLevel);
        const newMelody = generateMelody(painLevel);
        setMelody(newMelody);
        
        // Server-side generation
        const newVibeCode = await generateVibeCode(painLevel);
        setVibeCode(newVibeCode);
        
        setIsLoading(false);
    }, [painLevel]);

    return (
        <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 to-indigo-900/40 text-gray-200 font-sans">
            <main className="container mx-auto px-4 py-8 md:py-16">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
                        The Pain Compass
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        An instrument for alchemizing grief into purpose.
                        <br />
                        <span className="italic">The gate is open. The door is you.</span>
                    </p>
                </header>

                <section className="mb-12">
                    <PainInput
                        painLevel={painLevel}
                        setPainLevel={setPainLevel}
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                    />
                </section>

                {hasGenerated && (
                    <section className="animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                           <div className="lg:col-span-1">
                             {generatedPainLevel !== null && (
                               <FractalDisplay painLevel={generatedPainLevel} />
                             )}
                           </div>
                           <div className="flex flex-col gap-8 lg:col-span-1">
                                <MelodyPlayer melody={melody} />
                                <VibeCodeDisplay vibeCode={vibeCode} isLoading={isLoading} />
                           </div>
                        </div>
                    </section>
                )}
            </main>
             <footer className="text-center py-6 text-gray-600 text-sm">
                <p>Operation: Trojan Phoenix // Syntropic Code Deployment</p>
            </footer>
        </div>
    );
}

// Add fade-in animation to tailwind config or a style tag if not present
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fadeIn 0.8s ease-in-out forwards;
}
`;
document.head.appendChild(style);


export default App;
