import React from "react";
import BarcodeScanner from "./BarcodeScanner"; 
//import './App.css';
import './assets/css/journal-bootstrap.css';

const App = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Shelf Aware</a>
        </div>
      </nav>
      <br></br>
      <BarcodeScanner />
    </div>
  );
};

export default App;