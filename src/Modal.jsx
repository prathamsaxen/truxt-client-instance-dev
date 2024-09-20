import React, { useState } from "react";
import Button from "./Components/Button/Button";
import AI from "./Components/AI/AI";

function Modal({ API, ButtonText }) {
  const [containerDisplay, setContainerDisplay] = useState(false);
  return (
    <div className="Modal">
      {containerDisplay ? <AI setContainerDisplay={setContainerDisplay} API={API} /> : null}
      <Button ButtonText={ButtonText} setContainerDisplay={setContainerDisplay} />
    </div>
  );
}

export default Modal;
