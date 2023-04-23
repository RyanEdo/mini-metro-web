import React from "react";
import "./DevelopLayer.scss";

function DevelopLayer() {
  return (
    <div className="DevelopLayer">
      <div className="grid">
        {new Array(100 * 50).fill(1).map((x, index) => (
          <div className="grid-item">{index}</div>
        ))}
      </div>
    </div>
  );
}

export default DevelopLayer;
