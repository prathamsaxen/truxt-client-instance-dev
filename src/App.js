import "./App.css";
import AuthCard from "./Components/Cards/AuthCard/AuthCard";
import UnAuthCard from "./Components/Cards/UnAuthCard/UnAuthCard";
import { useState } from "react";
import SelectCard from "./Components/SelectCard/SelectCard";

function App() {
  const [DisplayCard, setDisplayCard] = useState(false);

  return (
    <div className="screen">
      {DisplayCard === "unauth" ? <UnAuthCard setDisplayCard={setDisplayCard} /> : null}
      {DisplayCard === "auth" ? (
        <AuthCard setDisplayCard={setDisplayCard} />
      ) : null}
      {
        DisplayCard ?null:<SelectCard setDisplayCard={setDisplayCard} DisplayCard={DisplayCard}/>
      }
    </div>
  );
}

export default App;
