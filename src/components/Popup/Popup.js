import React, { useState, useContext } from "react";
import Select from "react-select";
import { BarcodeScannerContext } from "../../context/BarcodeScannerContext";

import './Popup.css'

function Popup(props) {
    const [quantity, setQuantity] = useState(1); // Start with a quantity of 1
    const { options } = useContext(BarcodeScannerContext);

    const increaseQuantity = () => {
      setQuantity((prevQuantity) => prevQuantity + 1); // Increase the quantity by 1
    };
  
    const decreaseQuantity = () => {
        if (quantity > 1) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    return (props.trigger) ? (
        <div className="popup">   
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
                { props.children }
                <h1>Product found!</h1>
                <div className="image-text-container"> 
                    <div className="text-container">
                        <h5 style={{marginBottom: "20px"}}>{props.data.product.product_name}</h5>
                        <p>You have <b>0</b> items of this product in your inventory and <b>1</b> other items of this product category</p>
                    </div>
                    <div className="image-container">
                        <img src={props.data.product.image_front_thumb_url}/>
                    </div>
                </div>
                <div className="settings-container">
                    <b>Quantity</b>
                    <div className="quantity-controls">
                        <button onClick={decreaseQuantity} disabled={quantity <= 1}>
                        -
                        </button>
                        
                        <span>{quantity}</span>
                        
                        <button onClick={increaseQuantity}>
                        +
                        </button>
                    </div>
                </div>
                <div className="settings-container">
                    <b>Product category</b>
                    <div>
                        <Select 
                            options={options} 
                            className="custom-select"
                        />
                    </div>
                </div>
                <div className="action-buttons">
                    <button className="remove-btn">Remove from inventory</button>
                    <button className="add-btn">Add to inventory</button>
                </div>
            </div>
        </div>
    ) : "";
}

export default Popup;