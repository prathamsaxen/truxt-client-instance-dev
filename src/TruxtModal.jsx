import React, { useState } from "react";
import Button from "./Components/Button/Button";
import AI from "./Components/AI/AI";

function TruxtModal({ Options }) {
  const [containerDisplay, setContainerDisplay] = useState(false);
  return (
    <div className="Modal">
      {containerDisplay ? <AI setContainerDisplay={setContainerDisplay} Options={Options} /> : null}
      <Button ButtonText={Options.ButtonText} setContainerDisplay={setContainerDisplay} />
    </div>
  );
}

export default TruxtModal;
