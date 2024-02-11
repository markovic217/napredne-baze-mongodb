import React, { useState } from "react";
import "./App.scss";
import BodyComponent from "./components/BodyComponent/BodyComponent";
import DatePicker from "react-date-picker";

function App() {
  const [date, setDate] = useState<any>(new Date());

  return (
    <div className="App">
      <BodyComponent />
    </div>
  );
}

export default App;
