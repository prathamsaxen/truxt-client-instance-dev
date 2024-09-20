import React, { useState } from "react";
import Button from "./Components/Button/Button";

function Modal({ API, ButtonText }) {
  const [containerDisplay, setContainerDisplay] = useState(false);
  return (
    <div className="Modal">
      <Button ButtonText={ButtonText} setContainerDisplay={setContainerDisplay}/>
    </div>
  );
}

export default Modal;
