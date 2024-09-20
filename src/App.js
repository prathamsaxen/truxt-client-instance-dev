import React from "react";
import Modal from "./Modal";

function App() {
  return (
    <div className="App">
      <Modal API={process.env.REACT_APP_LLM_API} />
    </div>
  );
}

export default App;
