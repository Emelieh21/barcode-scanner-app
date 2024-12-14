import { useState } from 'react';
import { useZxing } from "react-zxing";
import { fetchData } from './utils/fetchData'; // Import the server-side fetchData function
import { playBleep } from './utils/playBleep'; 
import './BarcodeScanner.css';

const BarcodeScanner = () => {
  const [data, setData] = useState(null);
  const { ref } = useZxing({
    onDecodeResult: async (result) => { // Make this function async
      playBleep()
      const fetchedData = await fetchData(result.getText()); // Await the fetchData call
      setData(fetchedData); // Set the fetched data
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