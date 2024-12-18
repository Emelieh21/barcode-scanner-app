import { useState } from 'react';
import { useZxing } from "react-zxing";
import { fetchData } from '../../utils/fetchData'; // Import the server-side fetchData function
import { playBleep } from '../../utils/playBleep';
import Popup from '../Popup/Popup'; 
import './BarcodeScanner.css';

const BarcodeScanner = () => {
  const [data, setData] = useState(null);
  const [timedPopup, setTimedPopup] = useState(false);

  const { ref } = useZxing({
    onDecodeResult: async (result) => { // Make this function async
      playBleep()
      const fetchedData = await fetchData(result.getText()); // Await the fetchData call
      setTimedPopup(true);
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
          <Popup trigger={timedPopup} setTrigger={setTimedPopup} data={data}></Popup>
        </div> : 
        <p>Scan your item...</p>}
      </>
  );
};

export default BarcodeScanner;