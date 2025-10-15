
import { MelodyNote } from '../types';

// Musical scales represented by semitone intervals from the root note
const scales: { [key: string]: number[] } = {
  ionian: [0, 2, 4, 5, 7, 9, 11, 12],     // Major
  dorian: [0, 2, 3, 5, 7, 9, 10, 12],     // Contemplative
  aeolian: [0, 2, 3, 5, 7, 8, 10, 12],    // Minor
  lydianDominant: [0, 2, 4, 6, 7, 9, 10, 12] // Mystical/Transcendent
};

const getScaleFromPain = (painLevel: number): number[] => {
  if (painLevel <= 3) return scales.ionian;
  if (painLevel <= 7) return scales.dorian;
  if (painLevel <= 10) return scales.aeolian;
  return scales.lydianDominant; // for pain level 11
};

const midiToFreq = (midi: number): number => {
  return Math.pow(2, (midi - 69) / 12) * 440;
};

export const generateMelody = (painLevel: number): MelodyNote[] => {
  const scale = getScaleFromPain(painLevel);
  // Root note shifts higher with pain
  const rootMidi = 57 + Math.floor(painLevel / 2); // A3 to F#4

  const melody: MelodyNote[] = [];
  let currentTime = 0;
  
  // Simple algorithm to generate 7 notes from the scale
  let lastNoteIndex = Math.floor(scale.length / 2);
  for (let i = 0; i < 7; i++) {
    // Move up or down the scale
    const step = Math.random() > 0.5 ? 1 : -1;
    let nextNoteIndex = lastNoteIndex + step;
    if (nextNoteIndex < 0 || nextNoteIndex >= scale.length) {
      nextNoteIndex = lastNoteIndex - step; // reverse if out of bounds
    }
    lastNoteIndex = nextNoteIndex;

    const midiNote = rootMidi + scale[lastNoteIndex];
    const freq = midiToFreq(midiNote);
    const duration = 0.2 + Math.random() * 0.2;

    melody.push({ freq, duration, time: currentTime });
    currentTime += duration + 0.05; // add a small gap
  }

  return melody;
};

export const playMelody = (melody: MelodyNote[], onEnd: () => void) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (!audioContext) return;

  const masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.3, audioContext.currentTime); // Prevent clipping
  masterGain.connect(audioContext.destination);

  melody.forEach(note => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.time);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(1, audioContext.currentTime + note.time);
    // Simple ADSR envelope
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.time + note.duration);

    oscillator.connect(gainNode);
    gainNode.connect(masterGain);
    
    oscillator.start(audioContext.currentTime + note.time);
    oscillator.stop(audioContext.currentTime + note.time + note.duration);
  });

  const totalDuration = melody.length > 0 ? melody[melody.length - 1].time + melody[melody.length - 1].duration : 0;
  setTimeout(() => {
    audioContext.close();
    onEnd();
  }, totalDuration * 1000 + 100);
};
