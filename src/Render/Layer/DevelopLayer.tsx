import React from "react";
import "./DevelopLayer.scss";
import { Point } from "../../DataStructure/Point";
import { Station } from "../../DataStructure/Station";
import { Line } from "../../DataStructure/Line";
import LineRender from "../Component/LineRender";

function DevelopLayer() {
  // test line and station

  const pointA = new Point(200, 200);
  const pointB = new Point(300, 300);
  const pointC = new Point(600, 300);
  const pointD = new Point(800, 300);
  const pointE = new Point(200, 400);
  const pointF = new Point(800, 200);
  const pointG = new Point(500, 500);

  const A = new Station(pointA);
  const B = new Station(pointB);
  B._dev_tag = "B";
  const C = new Station(pointC);
  const D = new Station(pointD);
  const E = new Station(pointE);
  const F = new Station(pointF);
  const G = new Station(pointG);

  const line1 = new Line();
  const line3 = new Line();
  const line8 = new Line();
  const line9 = new Line();

  line1.linkAll([A, B, C, D]);
  line3.linkAll([E, B, C, D, F, E]);
  line3._dev_tag='line3';
  line8.linkAll([E, B, C, D]);
  line9.linkAll([A, E, G,D,F]);

  // console.log(line1, line3, line8);
  // console.log(A, B, C, D, E, F);
  console.log(C);

  const allStationsList = [A, B, C, D, E, F, G];
  const allLinesList = [line1, line3, line8, line9];

  const renderStations = (allStationsList: Station[]) => {
    return (
      <div>
        {allStationsList.map((station, index) => (
          <div
            style={{
              position: "absolute",
              left: station.position.x,
              top: station.position.y,
            }}
          >
            {String.fromCharCode("A".charCodeAt(0) + index)}
          </div>
        ))}
      </div>
    );
  };

  const renderLines = (allLinesList: Line[]) => {
    return (
      <div>
        {allLinesList.map((line) => {
          return <LineRender line={line} />;
        })}
      </div>
    );
  };


  return (
    <div className="DevelopLayer">
      {/* <div className="grid">
        {new Array(100 * 50).fill(1).map((x, index) => (
          <div className="grid-item">{index}</div>
        ))}
      </div> */}
      {renderStations(allStationsList)}
      {renderLines(allLinesList)}

    </div>
  );
}

export default DevelopLayer;
