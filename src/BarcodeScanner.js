import { useState } from "react";
import { useZxing } from "react-zxing";

const BarcodeScanner = () => {
  // Function to play the bleep sound
  const playBleep = () => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
  
      oscillator.type = 'square'; // Create a square wave
      oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // Frequency (pitch)
  
      oscillator.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2); // Stop after 0.2 seconds
    };
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      playBleep()
      setResult(result.getText());
    },
  });

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};

export default BarcodeScanner;