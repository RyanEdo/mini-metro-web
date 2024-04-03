import { ChangeSteps, StationProps, initData } from "../Data/UserData";
import { FunctionMode, Mode } from "../DataStructure/Mode";
import { Cards } from "../Render/Card/Cards";
import {
  DeleteConfirmation,
  showConfirmationInterface,
} from "../Render/Delete/DeleteConfirmation";
import { Menu } from "../Render/Header/Menu";
import ScaleLayer from "../Render/Layer/ScaleLayer";
import "./App.scss";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const [editingMode, setEditingMode] = useState(Mode.normal);
  const [funtionMode, setFuntionMode] = useState(FunctionMode.normal);
  const [record, setRecord] = useState<StationProps[]|ChangeSteps[]>([]);
  const [currentRecordIndex, setCurrentRecordIndex] = useState(-1);
  const [data, setData] = useState(initData);
  const ref = useRef<any>();
  const menuRef = useRef();
  const [showConfirmation, setShowConfirmation] =
    useState<showConfirmationInterface>();
  useEffect(() => {
    setShowConfirmation(() => ref.current?.showConfirmation);
  }, [ref.current?.showConfirmation]);
  return (
    <div className="App">
      <Menu
        setEditingMode={setEditingMode}
        funtionMode={funtionMode}
        setFuntionMode={setFuntionMode}
        record={record}
        setRecord={setRecord}
        currentRecordIndex={currentRecordIndex}
        setCurrentRecordIndex={setCurrentRecordIndex}
        data={data}
        setData={setData}
        ref={menuRef}
      />
      <DeleteConfirmation ref={ref} />
      <ScaleLayer
        editingMode={editingMode}
        setEditingMode={setEditingMode}
        data={data}
        setData={setData}
        funtionMode={funtionMode}
        record={record}
        setRecord={setRecord}
        currentRecordIndex={currentRecordIndex}
        setCurrentRecordIndex={setCurrentRecordIndex}
      />
      <Cards
        data={data}
        setData={setData}
        showConfirmation={showConfirmation}
        menuRef={menuRef}
      />
    </div>
  );
}

export default App;
