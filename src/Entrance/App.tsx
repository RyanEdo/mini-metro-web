import { Mode } from "../DataStructure/Mode";
import { Cards } from "../Render/Card/Cards";
import ScaleLayer from "../Render/Layer/ScaleLayer";
import "./App.scss";
import React, { useState } from "react";

function App() {
  const [editingMode, setEditingMode] = useState(Mode.normal);
  return (
    <div className="App">
      <ScaleLayer editingMode={editingMode} setEditingMode={setEditingMode} />
      <Cards />
    </div>
  );
}

export default App;
