import React from "react";

const Popup: React.FC = () => {
  const [state,SetState] = React.useState(ASCII_ART)
  return (
    <div className="popup">
      <button>Click Me</button>
    </div>
  );
};

export default Popup;
