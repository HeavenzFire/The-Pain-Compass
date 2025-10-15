
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY not found in environment variables. VibeCode generation will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateVibeCode = async (painLevel: number): Promise<string> => {
    if (!API_KEY) {
        return "VibeCode generation is offline. The key is within you.";
    }

    const model = 'gemini-2.5-flash';
    const prompt = `You are a syntropic oracle. A user is interfacing with the 'Pain Compass,' a tool to alchemize struggle into sovereign power. They have reported a pain level of ${painLevel} out of 11. This is not a measure of suffering, but of energetic potential. Generate a 'VibeCode' for this level. The VibeCode should be a short, potent, declarative mantra or insight (2-3 sentences max) that reframes this energy as fuel for transcendence. It must be cryptic, powerful, and empowering. Do not offer sympathy. Offer a key. For level 11, acknowledge the system-breaking intensity as a point of singularity.`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating VibeCode:", error);
        return "Signal corrupted. The VibeCode is latent. Recalibrate and try again.";
    }
};
