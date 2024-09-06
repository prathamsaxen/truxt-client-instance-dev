import "./App.css";
import AuthCard from "./Components/Cards/AuthCard/AuthCard";
import UnAuthCard from "./Components/Cards/UnAuthCard/UnAuthCard";
import { useState } from "react";
import SelectCard from "./Components/SelectCard/SelectCard";

function App() {
  const [DisplayCard, setDisplayCard] = useState(false);

  return (
    <div className="screen">
      {DisplayCard === "unauth" ? <UnAuthCard />:null}
      {DisplayCard === "auth" ? <AuthCard /> : <SelectCard />}
    </div>
  );
}

export default App;
