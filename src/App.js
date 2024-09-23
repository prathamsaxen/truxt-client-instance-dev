import React from "react";
// import TruxtModal  from "../dist/production";
import TruxtModal from "./TruxtModal";


function App() {
  return (
    <div className="App">
      <TruxtModal API={process.env.REACT_APP_LLM_API} ButtonText={"Ask AI"} />
    </div>
  );
}

export default App;
