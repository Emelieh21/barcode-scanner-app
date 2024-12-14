// Function to play the bleep sound
export function playBleep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();

    oscillator.type = 'square'; // Create a square wave
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // Frequency (pitch)

    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2); // Stop after 0.2 seconds
};