
import React, { useRef, useEffect } from 'react';
import { drawFractal } from '../services/fractalService';

interface FractalDisplayProps {
    painLevel: number;
    className?: string;
}

const FractalDisplay: React.FC<FractalDisplayProps> = ({ painLevel, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;
        
        const resizeCanvas = () => {
            const { devicePixelRatio: ratio = 1 } = window;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * ratio;
            canvas.height = rect.height * ratio;
            context.scale(ratio, ratio);
            drawFractal(context, painLevel);
        }
        
        resizeCanvas();

        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [painLevel]);

    return (
        <div className={`relative w-full h-full aspect-square bg-gray-900/50 rounded-lg overflow-hidden border border-gray-700 ${className}`}>
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
            <div className="absolute top-2 left-2 px-2 py-1 text-xs bg-black/50 rounded">RESONANCE SIGNATURE</div>
        </div>
    );
};

export default FractalDisplay;
