import { initData } from "../Data/UserData";
import { Mode } from "../DataStructure/Mode";
import { Cards } from "../Render/Card/Cards";
import ScaleLayer from "../Render/Layer/ScaleLayer";
import "./App.scss";
import React, { useState } from "react";

function App() {
  const [editingMode, setEditingMode] = useState(Mode.normal);
  const [data, setData] = useState(initData);

  return (
    <div className="App">
      <ScaleLayer editingMode={editingMode} setEditingMode={setEditingMode} />
      <Cards data={data} setData={setData}/>
    </div>
  );
}

export default App;
