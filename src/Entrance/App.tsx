import { ErrorBoundary } from "react-error-boundary";
import {
  browserInfo,
  mapToArr,
  mediateMap,
  setLocalStorage,
} from "../Common/util";
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
  setDataFromJson,
} from "../Data/UserData";
import { FunctionMode, Mode } from "../DataStructure/Mode";
import { Cards } from "../Render/Card/Cards";
import {
  DeleteConfirmation,
  showConfirmationInterface,
} from "../Render/Delete/DeleteConfirmation";
import { Menu } from "../Render/Header/Menu";
import ScaleLayer from "../Render/Layer/ScaleLayer";
import { WelcomeTour } from "../WelcomeTour/WelcomeTour";
import "./App.scss";
import "driver.js/dist/driver.css";
import React, { useEffect, useRef, useState } from "react";
import { ErrorFallback } from "../Render/ErrorFallback/ErrorFallback";
import { Recovery } from "../Render/Recovery/Recovery";
function App() {
  const [editingMode, setEditingMode] = useState(Mode.normal);
  const [functionMode, setFunctionMode] = useState(FunctionMode.normal);
  const [record, setRecord] = useState<RecordType>([]);
  const [currentRecordIndex, setCurrentRecordIndex] = useState(-1);
  const [insertInfo, setInsertInfo] = useState<InsertInfo>();
  const [data, setDataOriginal] = useState(initData);
  const [showName, setShowName] = useState(true);
  const [autoHiddenName, setAutoHiddenName] = useState(true);
  const [drawing, setDrawing] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [page, setPage] = useState("title");
  const [scale, setScale] = useState(1);
  const ref = useRef<any>();
  const menuRef = useRef();
  const [saved, setSaved] = useState(true);
  const [showTour, setShowTour] = useState(() => {
    return  window.innerWidth>=710 && !localStorage.getItem("skip-tour-viewed");
  });
  const [recoveredFromError, setRecoveredFromError] = useState(false);
  const [showConfirmation, setShowConfirmation] =
    useState<showConfirmationInterface>();
  // keep latest data if crash happend
  const setData = (data: React.SetStateAction<UserDataType>) => {
    if (typeof data === "function") {
      setDataOriginal((state) => {
        const newState = data(state);
        setLocalStorage(newState, () => setSaved(false));
        return newState;
      });
    } else {
      setLocalStorage(data, () => setSaved(false));
      setDataOriginal(data);
    }
  };
  useEffect(() => {
    setShowConfirmation(() => ref.current?.showConfirmation);
  }, [ref.current?.showConfirmation]);
  const [cardShowing, setCardShowing] = useState(new CardShowing());
  const transfromTools = {
    scale,
    setScale,
    translateX,
    translateY,
    setTranslateX,
    setTranslateY,
  };
  return (
    <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      const last = localStorage.getItem("last");
      if (last) {
        const data = setDataFromJson(setData, last);
        mediateMap(data, transfromTools);
      }
      setRecoveredFromError(true);
    }}
  >
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
        showName={showName}
        setShowName={setShowName}
        autoHiddenName={autoHiddenName}
        setAutoHiddenName={setAutoHiddenName}
        drawing={drawing}
        setDrawing={setDrawing}
        cardShowing={cardShowing}
        setCardShowing={setCardShowing}
        translateX={translateX}
        translateY={translateY}
        scale={scale}
        setTranslateX={setTranslateX}
        setTranslateY={setTranslateY}
        setScale={setScale}
        saved={saved}
        setSaved={setSaved}
        showTour={showTour}
        setShowTour={setShowTour}
        page={page}
        setPage={setPage}
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
        showName={showName}
        setShowName={setShowName}
        autoHiddenName={autoHiddenName}
        setAutoHiddenName={setAutoHiddenName}
        drawing={drawing}
        setDrawing={setDrawing}
        translateX={translateX}
        translateY={translateY}
        scale={scale}
        setTranslateX={setTranslateX}
        setTranslateY={setTranslateY}
        setScale={setScale}
        page={page}
        setPage={setPage}
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
      <WelcomeTour showTour={showTour} setShowTour={setShowTour} />
      <Recovery         
        data={data}
        setData={setData}
        recoveredFromError={recoveredFromError}
        setRecoveredFromError={setRecoveredFromError}
        transfromTools={transfromTools}
        />
    </div>
    </ErrorBoundary>
  );
}

export default App;
