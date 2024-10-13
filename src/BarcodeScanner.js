import { useState } from 'react';
import { useZxing } from "react-zxing";
import './BarcodeScanner.css';

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
  // Function to fetch data from the API
  const [data, setData] = useState(null);
  const fetchData = (result) => {
      // Log the URL before fetching
      const url = `https://world.openfoodfacts.org/api/v3/product/${result}.json`;
      console.log("Fetching data from:", url);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => setData(data))
        .catch((error) => console.error('Fetch error:', error));
    };
  const { ref } = useZxing({
    onDecodeResult(result) {
      playBleep()
      fetchData(result.getText());
    },
  });

  return (
    <>
      <div className="scanner-container">
        <div className="scanner-line"></div>
        <video ref={ref} className="scanner-video" alt="barcode-scanner"/>
      </div>
      {data ? 
        <div>
          <p>{data.product.product_name}</p>
          <img src={data.product.image_front_thumb_url}/>
        </div>: 
        <p>Scan your item...</p>}
      </>
  );
};

export default BarcodeScanner;