import React, { useState } from "react";

const WordCounter = ({ maxLength, value, onChange, height }) => {
  const [count, setCount] = useState(value?.length || 0);

  const handleOnChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
      setCount(newValue.length);
    }
  };

  return (
    <>
      <textarea
        type="text"
        value={value}
        onChange={handleOnChange}
        style={{ height: height }}
      />
      <div className="counter">
        {count}/{maxLength} characters
      </div>
    </>
  );
};

export default WordCounter;
