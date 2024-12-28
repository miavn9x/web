import React, { useState } from "react";
import { PiMinusBold } from "react-icons/pi";
import { TfiPlus } from "react-icons/tfi";

const QuantityBox = () => {
  const [inputVal, setInputVal] = useState(1);

  const minus = () => {
    if (inputVal > 1) {
      setInputVal(inputVal - 1);
    }
  };

  const plus = () => {
     if (inputVal < 99) {
       setInputVal(inputVal + 1);
     }
  };

  const numberprocessing = (e) => {
    const value = e.target.value;

    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setInputVal(Math.max(1, Math.min(99, value)));
    }
  };

  return (
    <div className="quantityDrop d-flex align-items-center">
      <button className="btn-minus" onClick={minus}>
        <PiMinusBold />
      </button>
      <input
        type="text"
        value={inputVal}
        className="quantity-input"
        onChange={numberprocessing}
      />
      <button className="btn-plus" onClick={plus}>
        <TfiPlus />
      </button>
    </div>
  );
};

export default QuantityBox;
