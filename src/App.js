import React from "react";
import TruxtModal from "./TruxtModal";

const ConfigurationAIClient = {
  API: process.env.REACT_APP_LLM_API,
  ButtonText: "ASK AI",
  Disclaimer: `This is a custom LLM for answering questions about Docker.Answers are based on the
                contents of the documentation. This feature is experimental - rate the answers to
                let us know what you think!`,
};

function App() {
  return (
    <div className="App">
      <TruxtModal Options={ConfigurationAIClient} />
    </div>
  );
}

export default App;
