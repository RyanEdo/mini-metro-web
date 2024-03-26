import { initData } from "../Data/UserData";
import { Mode } from "../DataStructure/Mode";
import { Cards } from "../Render/Card/Cards";
import {
  DeleteConfirmation,
  showConfirmationInterface,
} from "../Render/Delete/DeleteConfirmation";
import ScaleLayer from "../Render/Layer/ScaleLayer";
import "./App.scss";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [editingMode, setEditingMode] = useState(Mode.normal);
  const [data, setData] = useState(initData);
  const ref = useRef<any>();
  const [showConfirmation, setShowConfirmation] =
    useState<showConfirmationInterface>();
  useEffect(() => {
    setShowConfirmation(() => ref.current?.showConfirmation);
  }, [ref.current?.showConfirmation]);
  return (
    <div className="App">
      <DeleteConfirmation ref={ref} />
      <ScaleLayer
        editingMode={editingMode}
        setEditingMode={setEditingMode}
        data={data}
        setData={setData}
      />
      <Cards
        data={data}
        setData={setData}
        showConfirmation={showConfirmation}
      />
    </div>
  );
}

export default App;
