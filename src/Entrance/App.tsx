import { mapToArr } from "../Common/util";
import {
  CardShowing,
  ChangeSteps,
  InsertInfo,
  LineChanges,
  LineProps,
  RecordType,
  StationProps,
  UserDataType,
  initData,
} from "../Data/UserData";
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
  const [functionMode, setFunctionMode] = useState(FunctionMode.normal);
  const [record, setRecord] = useState<RecordType>([]);
  const [currentRecordIndex, setCurrentRecordIndex] = useState(-1);
  const [insertInfo, setInsertInfo] = useState<InsertInfo>();
  const [data, setDataOriginal] = useState(initData);
  const ref = useRef<any>();
  const menuRef = useRef();
  const [showConfirmation, setShowConfirmation] =
    useState<showConfirmationInterface>();
  // keep latest data if crash happend
  const setLocalStorage = (data: UserDataType) => {
    const last = localStorage.getItem("current");
    const current = localStorage.getItem("current");

    const { stations: stationsMap, lines: linesMap, title } = data;
    const stations = mapToArr(stationsMap);
    const lines = mapToArr(linesMap);
      const latest = JSON.stringify({ stations, lines, title });
      if (latest !== current) {
        if (current) {
          localStorage.setItem("last", current);
        }
        localStorage.setItem("current", latest);
      }
  };
  const setData = (
    data: React.SetStateAction<UserDataType>
  ) => {
    if (typeof data === "function") {
      setDataOriginal((state) => {
        const newState = data(state);
        setLocalStorage(newState);
        return newState;
      });
    } else {
      setLocalStorage(data);
      setDataOriginal(data);
    }
  };
  useEffect(() => {
    setShowConfirmation(() => ref.current?.showConfirmation);
  }, [ref.current?.showConfirmation]);
  const [cardShowing, setCardShowing] = useState(new CardShowing());

  return (
    <div className="App">
      <Menu
        setEditingMode={setEditingMode}
        functionMode={functionMode}
        setFunctionMode={setFunctionMode}
        record={record}
        setRecord={setRecord}
        currentRecordIndex={currentRecordIndex}
        setCurrentRecordIndex={setCurrentRecordIndex}
        data={data}
        setData={setData}
        ref={menuRef}
        insertInfo={insertInfo}
        setInsertInfo={setInsertInfo}
        // title={title}
        // setTitle={setTitle}
      />
      <DeleteConfirmation ref={ref} />
      <ScaleLayer
        editingMode={editingMode}
        setEditingMode={setEditingMode}
        data={data}
        setData={setData}
        functionMode={functionMode}
        setFunctionMode={setFunctionMode}
        record={record}
        setRecord={setRecord}
        currentRecordIndex={currentRecordIndex}
        setCurrentRecordIndex={setCurrentRecordIndex}
        insertInfo={insertInfo}
        setInsertInfo={setInsertInfo}
        cardShowing={cardShowing}
        setCardShowing={setCardShowing}
      />
      <Cards
        functionMode={functionMode}
        setFunctionMode={setFunctionMode}
        data={data}
        setData={setData}
        showConfirmation={showConfirmation}
        menuRef={menuRef}
        insertInfo={insertInfo}
        setInsertInfo={setInsertInfo}
        cardShowing={cardShowing}
        setCardShowing={setCardShowing}
      />
    </div>
  );
}

export default App;
