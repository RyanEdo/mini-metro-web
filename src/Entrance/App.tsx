import { Mode } from '../DataStructure/Mode';
import ScaleLayer from '../Render/ScaleLayer';
import './App.scss';
import React, { useState } from 'react';


function App() {
  const [editingMode, setEditingMode] = useState(Mode.NORMAL);
  return (
    <div className="App"
    >
      <ScaleLayer
        editingMode={editingMode}
        setEditingMode={setEditingMode}
      />
    </div>
  );
}

export default App;
