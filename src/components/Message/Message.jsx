import React, { useState, useEffect } from "react";

const Message = ({ text, type, duration = 3000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (text) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [text, duration]);

  const className = `message ${show ? "show" : ""} ${type}`;

  return <div className={className}>{text}</div>;
};

export default Message;
