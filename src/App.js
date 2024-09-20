import React from "react";
import Modal from "./Modal";

function App() {
  return (
    <div className="App">
      <Modal API={process.env.REACT_APP_LLM_API} ButtonText={"Ask AI"} />
    </div>
  );
}

export default App;
